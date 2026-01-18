<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FundController extends Controller
{
    /**
     * Lay danh sach tat ca cac quy
     */
    public function index()
    {
        $funds = DB::table('funds')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($funds);
    }

    /**
     * Tao quy moi (Weekly 10k)
     */
    public function createWeekly()
    {
        $now = Carbon::now();
        $weekNumber = $now->weekOfYear;
        $title = "Quỹ tuần " . $weekNumber . " (Tháng " . $now->format('m/Y') . ")";
        
        // Kiem tra xem tuan nay da tao chua
        $exists = DB::table('funds')
            ->where('title', $title)
            ->first();
            
        if ($exists) {
            return response()->json([
                'message' => 'Quỹ tuần này đã được tạo trước đó.',
                'fund' => $exists
            ], 400);
        }

        $fundId = DB::table('funds')->insertGetId([
            'title' => $title,
            'amount' => 10000,
            'deadline' => $now->endOfWeek()->toDateTimeString(),
            'description' => 'Thu quỹ cố định hàng tuần 10k/sinh viên.',
            'type' => 'weekly',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $fund = DB::table('funds')->where('id', $fundId)->first();

        return response()->json([
            'message' => 'Đã tạo quỹ tuần mới thành công!',
            'fund' => $fund
        ]);
    }

    /**
     * Xem chi tiet quy va danh sach dong tien
     */
    public function show($id)
    {
        $fund = DB::table('funds')->where('id', $id)->first();
        if (!$fund) {
            return response()->json(['message' => 'Quỹ không tồn tại!'], 404);
        }

        $students = DB::table('users')->where('role', '!=', 'admin')->get();

        $contributions = DB::table('fund_contributions')
            ->where('fund_id', $id)
            ->get()
            ->keyBy('user_id');

        // Tron du lieu sinh vien voi trang thai dong tien
        $data = $students->map(function($student) use ($contributions) {
            $contribution = $contributions->get($student->id);
            return [
                'id' => $student->id,
                'name' => $student->name,
                'student_code' => $student->student_code,
                'paid' => $contribution ? ($contribution->status === 'paid') : false,
                'amount_paid' => $contribution ? $contribution->amount : 0,
                'paid_at' => $contribution ? $contribution->updated_at : null
            ];
        });

        return response()->json([
            'fund' => $fund,
            'students' => $data
        ]);
    }

    /**
     * Lay danh sach sinh vien va trang thai cho cong khai (khong can login)
     */
    public function getPublicStudents($id)
    {
        return $this->show($id);
    }

    /**
     * Bat/Tat trang thai dong tiền cho sinh vien (Tu dong cap nhat so du)
     */
    public function togglePayment(Request $request, $fundId, $userId)
    {
        $fund = DB::table('funds')->where('id', $fundId)->first();
        if (!$fund) {
            return response()->json(['message' => 'Quỹ không tồn tại!'], 404);
        }

        $user = DB::table('users')->where('id', $userId)->first();
        $targetStatus = $request->input('status', 'paid'); // 'paid' hoặc 'unpaid'
        
        // Ma giao dich duy nhat cho cap (quy, user) de de tim kiem va xoa nêú can
        $transactionCode = "FUND_{$fundId}_USER_{$userId}";

        DB::beginTransaction();
        try {
            if ($targetStatus === 'paid') {
                // MARK AS PAID
                DB::table('fund_contributions')->updateOrInsert(
                    ['fund_id' => $fundId, 'user_id' => $userId],
                    [
                        'amount' => $fund->amount,
                        'status' => 'paid',
                        'paid_at' => now(),
                        'updated_at' => now()
                    ]
                );

                // Them giao dich neu chua co
                $existsTx = DB::table('bank_transactions')->where('transaction_code', $transactionCode)->first();
                if (!$existsTx) {
                    DB::table('bank_transactions')->insert([
                        'transaction_code' => $transactionCode,
                        'amount' => $fund->amount,
                        'description' => 'Thu quỹ: ' . $fund->title . ' - SV: ' . ($user ? $user->name : $userId),
                        'transaction_date' => now(),
                        'user_id' => $userId,
                        'status' => 'processed',
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
                $msg = "Đã xác nhận đóng tiền thành công!";
            } else {
                // MARK AS UNPAID
                DB::table('fund_contributions')
                    ->where('fund_id', $fundId)
                    ->where('user_id', $userId)
                    ->update([
                        'status' => 'unpaid',
                        'paid_at' => null,
                        'updated_at' => now()
                    ]);

                // Xoa giao dich khoi so du
                DB::table('bank_transactions')->where('transaction_code', $transactionCode)->delete();
                $msg = "Đã hủy trạng thái đóng tiền.";
            }

            DB::commit();
            return response()->json(['message' => $msg]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }
}

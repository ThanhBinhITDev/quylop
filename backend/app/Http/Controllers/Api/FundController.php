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
     * Xac nhan dong tiền cho sinh vien (Tu dong cong tien vao quy)
     */
    public function contribute(Request $request, $fundId, $userId)
    {
        $fund = DB::table('funds')->where('id', $fundId)->first();
        if (!$fund) {
            return response()->json(['message' => 'Quỹ không tồn tại!'], 404);
        }

        $user = DB::table('users')->where('id', $userId)->first();

        DB::beginTransaction();
        try {
            $exists = DB::table('fund_contributions')
                ->where('fund_id', $fundId)
                ->where('user_id', $userId)
                ->first();

            if ($exists) {
                DB::table('fund_contributions')
                    ->where('id', $exists->id)
                    ->update([
                        'status' => 'paid',
                        'amount' => $fund->amount,
                        'updated_at' => now()
                    ]);
            } else {
                DB::table('fund_contributions')->insert([
                    'fund_id' => $fundId,
                    'user_id' => $userId,
                    'amount' => $fund->amount,
                    'status' => 'paid',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            // TU DONG TAO GIAO DICH NGAN HANG (De cong vao so du tong)
            DB::table('bank_transactions')->insert([
                'transaction_code' => 'THUQUY_' . $fundId . '_' . $userId . '_' . time(),
                'amount' => $fund->amount,
                'description' => 'Thu quỹ: ' . $fund->title . ' - SV: ' . ($user ? $user->name : $userId),
                'transaction_date' => now(),
                'user_id' => $userId,
                'status' => 'processed',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::commit();
            return response()->json(['message' => 'Đã xác nhận đóng tiền và cập nhật số dư thành công!']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    /**
     * Lay danh sach tat ca cac khoan chi
     */
    public function index()
    {
        $expenses = DB::table('expenses')
            ->join('users', 'expenses.created_by', '=', 'users.id')
            ->select('expenses.*', 'users.name as creator_name')
            ->orderBy('expense_date', 'desc')
            ->get();
        return response()->json($expenses);
    }

    /**
     * Tao khoan chi moi (Tu dong tru vao quy)
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1',
            'expense_date' => 'required|date',
            'description' => 'nullable|string',
            'proof_image' => 'nullable|string', // Tam thoi nhan link anh hoac base64
        ]);

        $userId = Auth::id();

        DB::beginTransaction();
        try {
            // 1. Luu vao bang expenses
            $expenseId = DB::table('expenses')->insertGetId([
                'title' => $request->title,
                'amount' => $request->amount,
                'description' => $request->description,
                'expense_date' => $request->expense_date,
                'proof_image' => $request->proof_image,
                'created_by' => $userId,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // 2. TU DONG TAO GIAO DICH NGAN HANG (So am de tru tien)
            DB::table('bank_transactions')->insert([
                'transaction_code' => 'CHIQUY_' . $expenseId . '_' . time(),
                'amount' => -abs($request->amount), // Luon la so am
                'description' => 'Chi quỹ: ' . $request->title,
                'transaction_date' => $request->expense_date,
                'user_id' => $userId,
                'status' => 'processed',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::commit();
            return response()->json(['message' => 'Đã tạo khoản chi và cập nhật số dư thành công!']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Xoa khoan chi (Co the phai hoan tac giao dich - tam thoi chi xoa)
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            // Xoa cac giao dich ngan hang lien quan
            DB::table('bank_transactions')->where('transaction_code', 'LIKE', 'CHIQUY_' . $id . '_%')->delete();
            
            // Xoa khoan chi
            DB::table('expenses')->where('id', $id)->delete();

            DB::commit();
            return response()->json(['message' => 'Đã xóa khoản chi thành công!']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi hệ thống khi xóa.'], 500);
        }
    }
}

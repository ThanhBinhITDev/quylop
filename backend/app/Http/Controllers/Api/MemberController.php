<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{
    /**
     * Lay danh sach tat ca thanh vien
     */
    public function index()
    {
        $members = DB::table('users')
            ->select('id', 'name', 'student_code', 'phone', 'email', 'role', 'created_at')
            ->orderBy('name', 'asc')
            ->get();
        return response()->json($members);
    }

    /**
     * Them thanh vien moi
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'student_code' => 'required|string|unique:users,student_code',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:admin,student',
        ]);

        try {
            DB::table('users')->insert([
                'name' => $request->name,
                'student_code' => $request->student_code,
                'email' => $request->email,
                'phone' => $request->phone,
                'role' => $request->role,
                'password' => Hash::make($request->student_code), // Mat khau mac dinh la ma sinh vien
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Thêm thành viên thành công! Mật khẩu mặc định là Mã SV.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Cap nhat thong tin thanh vien
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'student_code' => 'required|string|unique:users,student_code,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:admin,student',
        ]);

        try {
            DB::table('users')->where('id', $id)->update([
                'name' => $request->name,
                'student_code' => $request->student_code,
                'email' => $request->email,
                'phone' => $request->phone,
                'role' => $request->role,
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Cập nhật thành viên thành công!']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Xoa thanh vien
     */
    public function destroy($id)
    {
        // Khong cho phep xoa chinh minh (neu dang la admin)
        // Trong thuc te can check Auth::id()
        
        try {
            DB::table('users')->where('id', $id)->delete();
            return response()->json(['message' => 'Xóa thành viên thành công!']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không thể xóa thành viên này (có thể do ràng buộc dữ liệu).'], 500);
        }
    }
}

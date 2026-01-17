<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Hien thi form dang nhap
    public function login()
    {
        return view('auth.login');
    }

    // Xu ly dang nhap
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'student_code' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'student_code' => 'Mã sinh viên hoặc mật khẩu không chính xác.',
        ]);
    }

    // Dang xuat
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}

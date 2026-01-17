<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Tinh Tong Thu (Tu Bank Transactions + Tien mat)
        // Tam thoi lay tong cot amount cua bang bank_transactions (da xu ly)
        $totalIncome = DB::table('bank_transactions')->where('status', 'processed')->sum('amount');

        // 2. Tinh Tong Chi
        $totalExpense = DB::table('expenses')->sum('amount');

        // 3. So du hien tai
        $currentBalance = $totalIncome - $totalExpense;

        // 4. Lay danh sach quy dang mo
        $activeFunds = DB::table('funds')->where('deadline', '>=', now())->get();

        // 5. Lay danh sach 5 giao dich moi nhat
        $recentTransactions = DB::table('bank_transactions')
            ->orderBy('transaction_date', 'desc')
            ->limit(5)
            ->get();

        return view('admin.dashboard', compact('totalIncome', 'totalExpense', 'currentBalance', 'activeFunds', 'recentTransactions'));
    }
}

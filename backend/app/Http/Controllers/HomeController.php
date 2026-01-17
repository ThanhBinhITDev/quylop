<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Tinh Tong Thu 
        $totalIncome = DB::table('bank_transactions')->where('status', 'processed')->sum('amount');

        // 2. Tinh Tong Chi
        $totalExpense = DB::table('expenses')->sum('amount');

        // 3. So du
        $currentBalance = $totalIncome - $totalExpense;

        // 4. Lay danh sach quy
        $activeFunds = DB::table('funds')->where('deadline', '>=', now())->get();

        // 5. Giao dich gan day (Cong khai cho moi nguoi xem)
        $recentTransactions = DB::table('bank_transactions')
            ->orderBy('transaction_date', 'desc')
            ->limit(10)
            ->get();

        // 6. Danh sach chi tieu gan day
        $recentExpenses = DB::table('expenses')
            ->join('users', 'expenses.created_by', '=', 'users.id')
            ->select('expenses.*', 'users.name as creator_name')
            ->orderBy('expense_date', 'desc')
            ->limit(5)
            ->get();

        return view('welcome', compact('totalIncome', 'totalExpense', 'currentBalance', 'activeFunds', 'recentTransactions', 'recentExpenses'));
    }
}

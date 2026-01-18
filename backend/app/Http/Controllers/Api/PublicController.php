<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicController extends Controller
{
    public function getDashboardData()
    {
        // 1. Tinh Tong Thu (Chi lay cac giao dich so duong)
        $totalIncome = DB::table('bank_transactions')
            ->where('status', 'processed')
            ->where('amount', '>', 0)
            ->sum('amount') ?? 0;

        // 2. Tinh Tong Chi (Lay tu bang expenses)
        $totalExpense = DB::table('expenses')->sum('amount') ?? 0;

        // 3. So du thuc te (Thu - Chi)
        $currentBalance = $totalIncome - $totalExpense;

        // 4. Lay danh sach quy dang mo
        $activeFunds = DB::table('funds')
            ->where('deadline', '>=', now())
            ->orderBy('created_at', 'desc')
            ->get();

        // 5. Giao dich gan day
        $recentTransactions = DB::table('bank_transactions')
            ->where('status', 'processed')
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

        return response()->json([
            'totalIncome' => (float)$totalIncome,
            'totalExpense' => (float)$totalExpense,
            'currentBalance' => (float)$currentBalance,
            'activeFunds' => $activeFunds,
            'recentTransactions' => $recentTransactions,
            'recentExpenses' => $recentExpenses,
            'lastUpdate' => now()->toDateTimeString()
        ]);
    }
}

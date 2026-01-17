@extends('layouts.admin')

@section('content')
    <div class="mb-6 flex justify-between items-end">
        <div>
            <h2 class="text-2xl font-bold text-gray-800">Tổng quan</h2>
            <p class="text-gray-500 text-sm mt-1">Xin chào, đây là bảng điều khiển dành cho Ban cán sự.</p>
        </div>
        <a href="{{ route('admin.funds.create') }}"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> Tạo khoản thu mới
        </a>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card 1 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-green-100 text-green-600 p-3 rounded-lg">
                    <i class="fa-solid fa-wallet text-xl"></i>
                </div>
                <!-- <span class="text-xs font-semibold bg-green-50 text-green-600 px-2 py-1 rounded">+12%</span> -->
            </div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Số dư hiện tại</h3>
            <p class="text-2xl font-bold text-gray-800 mt-1">{{ number_format($currentBalance) }} đ</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <i class="fa-solid fa-arrow-down text-xl"></i>
                </div>
            </div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Tổng thu</h3>
            <p class="text-2xl font-bold text-gray-800 mt-1">{{ number_format($totalIncome) }} đ</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-red-100 text-red-600 p-3 rounded-lg">
                    <i class="fa-solid fa-arrow-up text-xl"></i>
                </div>
            </div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Tổng chi</h3>
            <p class="text-2xl font-bold text-gray-800 mt-1">{{ number_format($totalExpense) }} đ</p>
        </div>
    </div>

    <!-- Recent Transactions & Chart Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Recent Transactions -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-gray-800">Giao dịch ngân hàng gần đây</h3>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Xem tất cả</a>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-50 text-gray-400 uppercase font-medium text-xs">
                        <tr>
                            <th class="px-6 py-3">Thời gian</th>
                            <th class="px-6 py-3">Nội dung (Bank)</th>
                            <th class="px-6 py-3 text-right">Số tiền</th>
                            <th class="px-6 py-3 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @forelse($recentTransactions as $transaction)
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    {{ \Carbon\Carbon::parse($transaction->transaction_date)->format('H:i d/m') }}</td>
                                <td class="px-6 py-4 font-medium text-gray-800 truncate max-w-xs"
                                    title="{{ $transaction->description }}">
                                    {{ $transaction->description }}
                                </td>
                                <td class="px-6 py-4 text-right font-semibold text-green-600">
                                    +{{ number_format($transaction->amount) }}</td>
                                <td class="px-6 py-4 text-center">
                                    @if($transaction->status == 'processed')
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Đã
                                            khớp</span>
                                    @else
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Chờ
                                            xử lý</span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="px-6 py-8 text-center text-gray-400">Chưa có giao dịch nào.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Right: Active Funds -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-bold text-gray-800 mb-4">Quỹ đang thu</h3>
            <div class="space-y-4">
                @forelse($activeFunds as $fund)
                    <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-semibold text-gray-800">{{ $fund->title }}</h4>
                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Đang mở</span>
                        </div>
                        <p class="text-sm text-gray-500 mb-3">{{ number_format($fund->amount) }} đ / người</p>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                            <div class="bg-blue-600 h-1.5 rounded-full" style="width: 45%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-400">
                            <span>Đã thu: 15/35</span> <!-- Cho nay se code logic dem sau -->
                            <span>Hạn: {{ \Carbon\Carbon::parse($fund->deadline)->format('d/m/Y') }}</span>
                        </div>
                    </div>
                @empty
                    <div class="text-center text-gray-400 py-4">Không có đợt thu nào đang mở.</div>
                @endforelse

                <a href="{{ route('admin.funds.create') }}"
                    class="w-full mt-2 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-plus"></i> Tạo đợt thu mới
                </a>
            </div>
        </div>
    </div>
@endsection
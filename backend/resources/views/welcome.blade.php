<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Công Khai Tài Chính - Quỹ Lớp</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Be Vietnam Pro', sans-serif; background-color: #f8fafc; }
        .glass-header {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body class="text-gray-800">

    <!-- Header -->
    <header class="glass-header fixed w-full top-0 z-50 border-b border-gray-200 shadow-sm">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                <span class="font-bold text-xl text-blue-800">Quỹ Lớp Công Khai</span>
            </div>
            
            @auth
                <a href="{{ route('admin.dashboard') }}" class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition shadow">
                    <i class="fa-solid fa-gauge-high mr-1"></i> Trang Quản trị
                </a>
            @else
                <a href="{{ route('login') }}" class="text-sm font-medium text-gray-500 hover:text-blue-600">
                    <i class="fa-solid fa-lock mr-1"></i> Đăng nhập Admin
                </a>
            @endauth
        </div>
    </header>

    <main class="container mx-auto px-4 pt-24 pb-12">
        
        <!-- Hero Section -->
        <div class="text-center mb-12">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Minh Bạch Tài Chính Lớp</h1>
            <p class="text-gray-500">Cập nhật theo thời gian thực. Tất cả khoản thu/chi đều được công khai tại đây.</p>
        </div>

        <!-- Big Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <!-- Balance -->
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="bg-white/20 p-3 rounded-xl">
                        <i class="fa-solid fa-wallet text-2xl"></i>
                    </div>
                    <span class="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Hiện có</span>
                </div>
                <p class="text-green-100 text-sm font-medium">Số dư khả dụng</p>
                <h3 class="text-3xl font-bold mt-1">{{ number_format($currentBalance) }} VNĐ</h3>
            </div>

            <!-- Income -->
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div class="flex items-center gap-4 mb-2">
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <i class="fa-solid fa-arrow-down"></i>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs font-bold uppercase">Tổng Thu</p>
                        <h3 class="text-xl font-bold text-gray-800">{{ number_format($totalIncome) }} đ</h3>
                    </div>
                </div>
            </div>

            <!-- Expense -->
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div class="flex items-center gap-4 mb-2">
                    <div class="p-3 bg-red-50 text-red-600 rounded-xl">
                        <i class="fa-solid fa-arrow-up"></i>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs font-bold uppercase">Tổng Chi</p>
                        <h3 class="text-xl font-bold text-gray-800">{{ number_format($totalExpense) }} đ</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left: Funds & QR Code -->
            <div class="space-y-8">
                <!-- Active Funds -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-bullhorn text-yellow-500"></i> Các khoản đang thu
                    </h3>
                    
                    <div class="space-y-4">
                        @forelse($activeFunds as $fund)
                            <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-bold text-blue-900">{{ $fund->title }}</h4>
                                        <p class="text-sm text-blue-700 mt-1">{{ $fund->description ?? 'Vui lòng đóng đúng hạn.' }}</p>
                                    </div>
                                    <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        {{ number_format($fund->amount) }} đ
                                    </span>
                                </div>
                                <div class="mt-3 flex items-center gap-2 text-xs text-blue-600">
                                    <i class="fa-regular fa-clock"></i> Hạn chót: {{ \Carbon\Carbon::parse($fund->deadline)->format('d/m/Y') }}
                                </div>
                            </div>
                        @empty
                            <p class="text-gray-500 text-center py-4">Hiện không có khoản thu nào đang mở.</p>
                        @endforelse
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 class="font-bold text-lg text-gray-800 mb-4">Hoạt động mới nhất</h3>
                    <div class="flow-root">
                        <ul role="list" class="-mb-8">
                            @foreach($recentTransactions as $transaction)
                                <li>
                                    <div class="relative pb-8">
                                        @if(!$loop->last)
                                            <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                        @endif
                                        <div class="relative flex space-x-3">
                                            <div>
                                                <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                    <i class="fa-solid fa-check text-white text-xs"></i>
                                                </span>
                                            </div>
                                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div>
                                                    <p class="text-sm text-gray-500">
                                                        Nhận chuyển khoản <span class="font-medium text-gray-900">{{ number_format($transaction->amount) }} đ</span>
                                                    </p>
                                                    <p class="text-xs text-gray-400 truncate max-w-[200px]" title="{{ $transaction->description }}">
                                                        {{ $transaction->description }}
                                                    </p>
                                                </div>
                                                <div class="text-right text-sm whitespace-nowrap text-gray-50">
                                                    <time datetime="{{ $transaction->transaction_date }}">{{ \Carbon\Carbon::parse($transaction->transaction_date)->format('H:i d/m') }}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Right: Expenses History -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-file-invoice-dollar text-red-500"></i> Báo cáo chi tiêu
                </h3>

                <div class="space-y-6">
                    @forelse($recentExpenses as $expense)
                        <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition">
                            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 text-red-500">
                                <i class="fa-solid fa-shop"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800">{{ $expense->title }}</h4>
                                <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ $expense->description }}</p>

                                <div class="flex items-center gap-4 mt-2">
                                    <span class="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        <i class="fa-solid fa-user mr-1"></i> {{ $expense->creator_name }}
                                    </span>
                                    <span class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($expense->expense_date)->format('d/m/Y') }}</span>
                                </div>

                                @if($expense->proof_image)
                                    <div class="mt-3">
                                        <a href="#" class="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                            <i class="fa-solid fa-image"></i> Xem hóa đơn
                                        </a>
                                    </div>
                                @endif
                            </div>
                            <div class="text-right">
                                <span class="block font-bold text-red-600">-{{ number_format($expense->amount) }}</span>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-8">
                            <div class="inline-block p-4 bg-gray-50 rounded-full mb-3 text-gray-300">
                                <i class="fa-solid fa-receipt text-3xl"></i>
                            </div>
                            <p class="text-gray-500">Chưa có khoản chi tiêu nào.</p>
                        </div>
                    @endforelse
                </div>
            </div>

        </div>
    </main>

    <footer class="bg-white border-t border-gray-200 py-8 mt-12">
        <div class="container mx-auto px-4 text-center">
            <p class="text-gray-500 text-sm">Hệ thống Minh bạch Tài chính Quỹ lớp &copy; 2026</p>
        </div>
    </footer>

</body>
</html>

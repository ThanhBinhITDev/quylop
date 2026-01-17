<aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <span class="text-xl font-bold text-blue-600"><i class="fa-solid fa-graduation-cap mr-2"></i>Quỹ Lớp</span>
    </div>

    <nav class="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <a href="{{ route('admin.dashboard') }}"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg {{ request()->routeIs('admin.dashboard') ? 'bg-blue-50 text-blue-700 font-medium' : '' }}">
            <i class="fa-solid fa-chart-pie w-6"></i>
            Tổng quan
        </a>

        <div class="pt-4 pb-2">
            <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tài chính</p>
        </div>

        <a href="{{ route('admin.funds.index') }}"
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg {{ request()->routeIs('admin.funds.*') ? 'bg-blue-50 text-blue-700 font-medium' : '' }}">
            <i class="fa-solid fa-piggy-bank w-6"></i>
            Quản lý Quỹ thu
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <i class="fa-solid fa-money-bill-transfer w-6"></i>
            Chi tiêu & Hóa đơn
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <i class="fa-solid fa-building-columns w-6"></i>
            Lịch sử Ngân hàng
        </a>

        <div class="pt-4 pb-2">
            <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Lớp học</p>
        </div>

        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <i class="fa-solid fa-users w-6"></i>
            Danh sách Thành viên
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <i class="fa-solid fa-list-check w-6"></i>
            Công việc (Todo)
        </a>
    </nav>

    <div class="p-4 border-t border-gray-200">
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <i class="fa-solid fa-right-from-bracket w-6"></i>
                Đăng xuất
            </button>
        </form>
    </div>
</aside>
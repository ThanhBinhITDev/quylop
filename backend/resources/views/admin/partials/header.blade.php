<header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
    <button class="md:hidden text-gray-500 hover:text-gray-700">
        <i class="fa-solid fa-bars text-xl"></i>
    </button>

    <div class="flex items-center gap-4">
        <a href="{{ route('home') }}" target="_blank"
            class="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <i class="fa-solid fa-external-link-alt mr-1"></i> Xem trang công khai
        </a>
        <div
            class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
            {{ substr(Auth::user()->name ?? 'A', 0, 1) }}
        </div>
    </div>
</header>
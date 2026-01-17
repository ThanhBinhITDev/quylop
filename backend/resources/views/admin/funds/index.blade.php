@extends('layouts.admin')

@section('content')
    <div class="mb-6 flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-800">Quản lý Quỹ</h2>
            <p class="text-gray-500 text-sm mt-1">Danh sách các đợt thu quỹ của lớp.</p>
        </div>
        <a href="{{ route('admin.funds.create') }}"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> Tạo khoản thu mới
        </a>
    </div>

    @if(session('success'))
        <div class="mb-4 bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200">
            <i class="fa-solid fa-check-circle mr-2"></i> {{ session('success') }}
        </div>
    @endif

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-600">
                <thead class="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
                    <tr>
                        <th class="px-6 py-3">Tên khoản thu</th>
                        <th class="px-6 py-3 text-center">Loại</th>
                        <th class="px-6 py-3 text-right">Số tiền</th>
                        <th class="px-6 py-3 text-center">Hạn chót</th>
                        <th class="px-6 py-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($funds as $fund)
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-800">{{ $fund->title }}</td>
                            <td class="px-6 py-4 text-center">
                                @if($fund->type == 'weekly')
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Hàng
                                        tuần</span>
                                @elseif($fund->type == 'monthly')
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Hàng
                                        tháng</span>
                                @else
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Một
                                        lần</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 text-right font-bold text-blue-600">{{ number_format($fund->amount) }} đ</td>
                            <td class="px-6 py-4 text-center">
                                @if(\Carbon\Carbon::parse($fund->deadline)->isPast())
                                    <span class="text-red-500 font-semibold">Đã hêt hạn</span>
                                @else
                                    <span class="text-gray-600">{{ \Carbon\Carbon::parse($fund->deadline)->format('d/m/Y') }}</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 text-center">
                                <a href="#" class="text-blue-600 hover:text-blue-800 mr-3" title="Xem chi tiết"><i
                                        class="fa-solid fa-eye"></i></a>
                                <a href="#" class="text-gray-500 hover:text-gray-700" title="Chỉnh sửa"><i
                                        class="fa-solid fa-pen-to-square"></i></a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                                <i class="fa-solid fa-folder-open text-4xl mb-3 block opacity-50"></i>
                                Chưa có khoản thu nào. Hãy tạo mới ngay!
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
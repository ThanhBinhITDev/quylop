@extends('layouts.admin')

@section('content')
    <div class="mb-6">
        <a href="{{ route('admin.funds.index') }}" class="text-gray-500 hover:text-blue-600 text-sm mb-2 inline-block">
            <i class="fa-solid fa-arrow-left"></i> Quay lại danh sách
        </a>
        <h2 class="text-2xl font-bold text-gray-800">Tạo khoản thu mới</h2>
        <p class="text-gray-500 text-sm mt-1">Điền thông tin chi tiết cho khoản thu quỹ mới.</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
        <form action="{{ route('admin.funds.store') }}" method="POST">
            @csrf

            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Tên khoản thu <span
                        class="text-red-500">*</span></label>
                <input type="text" id="title" name="title" required placeholder="Ví dụ: Quỹ tháng 2, Áo lớp..."
                    class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm p-2 bg-gray-50 border">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Số tiền (VNĐ) <span
                            class="text-red-500">*</span></label>
                    <input type="number" id="amount" name="amount" required min="0" step="1000" placeholder="0"
                        class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm p-2 bg-gray-50 border">
                </div>

                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Loại thu <span
                            class="text-red-500">*</span></label>
                    <select id="type" name="type" required
                        class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm p-2 bg-gray-50 border">
                        <option value="monthly">Theo tháng (Hàng tháng)</option>
                        <option value="weekly">Theo tuần (Tiền phạt/tuần)</option>
                        <option value="one_time">Một lần (Áo lớp, sự kiện)</option>
                    </select>
                </div>
            </div>

            <div class="mb-4">
                <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">Hạn chót nộp <span
                        class="text-red-500">*</span></label>
                <input type="date" id="deadline" name="deadline" required
                    class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm p-2 bg-gray-50 border">
            </div>

            <div class="mb-6">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả thêm</label>
                <textarea id="description" name="description" rows="3" placeholder="Ghi chú thêm về khoản thu này..."
                    class="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm p-2 bg-gray-50 border"></textarea>
            </div>

            <div class="flex justify-end gap-3">
                <a href="{{ route('admin.funds.index') }}"
                    class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition">
                    Hủy bỏ
                </a>
                <button type="submit"
                    class="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow transition flex items-center gap-2">
                    <i class="fa-solid fa-save"></i> Lưu khoản thu
                </button>
            </div>

        </form>
    </div>
@endsection
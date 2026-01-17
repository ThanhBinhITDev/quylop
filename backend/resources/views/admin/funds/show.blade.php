@extends('layouts.admin')

@section('content')
    <div class="mb-6">
        <a href="{{ route('admin.funds.index') }}" class="text-gray-500 hover:text-blue-600 text-sm mb-2 inline-block">
            <i class="fa-solid fa-arrow-left"></i> Quay lại danh sách
        </a>

        <div class="flex justify-between items-start mt-2">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">{{ $fund->title }}</h2>
                <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span class="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {{ number_format($fund->amount) }} đ
                    </span>
                    <span><i class="fa-regular fa-clock mr-1"></i> Hạn chót:
                        {{ \Carbon\Carbon::parse($fund->deadline)->format('d/m/Y') }}</span>
                </div>
                @if($fund->description)
                    <p class="text-gray-500 text-sm mt-3 bg-white p-3 rounded-lg border border-gray-100 inline-block">
                        {{ $fund->description }}
                    </p>
                @endif
            </div>

            <div class="text-right">
                <div class="text-sm text-gray-500 mb-1">Tiến độ thu</div>
                <div class="text-2xl font-bold text-blue-600">
                    {{ count($contributions) }} / {{ count($students) }}
                </div>
                <div class="text-xs text-gray-400">Đã đóng</div>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-gray-700">Danh sách đóng tiền</h3>
            <input type="text" placeholder="Tìm tên sinh viên..."
                class="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-1.5 w-64 shadow-sm">
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-600">
                <thead class="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
                    <tr>
                        <th class="px-6 py-3 w-16 text-center">STT</th>
                        <th class="px-6 py-3">Mã SV</th>
                        <th class="px-6 py-3">Họ và Tên</th>
                        <th class="px-6 py-3 text-center">Trạng thái</th>
                        <th class="px-6 py-3 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @foreach($students as $index => $student)
                        @php
                            $contribution = $contributions[$student->id] ?? null;
                            $isPaid = $contribution && $contribution->status == 'paid';
                        @endphp
                        <tr class="hover:bg-gray-50 transition-colors {{ $isPaid ? 'bg-green-50/30' : '' }}">
                            <td class="px-6 py-4 text-center text-gray-400">{{ $index + 1 }}</td>
                            <td class="px-6 py-4 font-mono text-xs">{{ $student->student_code }}</td>
                            <td class="px-6 py-4 font-medium text-gray-800">{{ $student->name }}</td>
                            <td class="px-6 py-4 text-center">
                                @if($isPaid)
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                        <i class="fa-solid fa-check mr-1"></i> Đã đóng
                                    </span>
                                @else
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                        <i class="fa-solid fa-xmark mr-1"></i> Chưa đóng
                                    </span>
                                @endif
                            </td>
                            <td class="px-6 py-4 text-right">
                                @if(!$isPaid)
                                    <form
                                        action="{{ route('admin.funds.contribute', ['fund' => $fund->id, 'user' => $student->id]) }}"
                                        method="POST" class="flex items-center gap-2 justify-end">
                                        @csrf
                                        <input type="number" name="amount" value="{{ $fund->amount }}" min="0" step="1000"
                                            class="w-24 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-1 px-2 text-right"
                                            placeholder="Tiền đóng">
                                        <button type="submit"
                                            class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none transition whitespace-nowrap">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                    </form>
                                @else
                                    <div class="flex items-center justify-end gap-2">
                                        <span
                                            class="text-xs font-bold text-gray-700 border border-gray-200 bg-gray-50 px-2 py-1 rounded">
                                            @php
                                                // Lay amount tu contribution object
                                                $paidAmount = $contribution->amount ?? $fund->amount;
                                            @endphp
                                            {{ number_format($paidAmount) }} đ
                                        </span>
                                        <button disabled
                                            class="text-green-600 bg-green-50 font-medium rounded-lg text-xs px-3 py-1.5 cursor-not-allowed border border-green-100">
                                            Đã đóng
                                        </button>
                                    </div>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
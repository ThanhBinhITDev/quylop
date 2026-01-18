// File lưu trữ toàn bộ bố cục (Components Library)
window.CLASS_FUND_COMPONENTS = {
    header: `
        <nav class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                        <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-xl font-bold text-gray-800">Quỹ Lớp</span>
                </div>
                <a href="pages/login.html" class="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 shadow-lg shadow-blue-200">
                    Đăng nhập Admin
                </a>
            </div>
        </nav>
    `,

    hero: `
        <section class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20 px-4">
            <div class="container mx-auto text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Minh Bạch Tài Chính Lớp Học</h1>
                <p class="text-xl text-blue-100 mb-8 animate-fade-in-up delay-200">Hệ thống quản lý hiện đại, công khai và chuyên nghiệp</p>
            </div>
        </section>
    `,

    stats: `
        <section class="container mx-auto px-4 -mt-10">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in-up delay-300">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white card-hover shadow-lg shadow-green-100">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-green-500 bg-white bg-opacity-90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Số dư thực tế</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div class="text-3xl font-bold" id="currentBalance">0 đ</div>
                    </div>
                    <div class="bg-white border-2 border-blue-50 rounded-xl p-6 card-hover shadow-sm">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 text-xs font-bold uppercase">Tổng đã thu</span>
                            <div class="p-2 bg-blue-50 rounded-lg text-blue-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg></div>
                        </div>
                        <div class="text-3xl font-bold text-blue-600" id="totalIncome">0 đ</div>
                    </div>
                    <div class="bg-white border-2 border-red-50 rounded-xl p-6 card-hover shadow-sm">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 text-xs font-bold uppercase">Tổng đã chi</span>
                            <div class="p-2 bg-red-50 rounded-lg text-red-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"></path></svg></div>
                        </div>
                        <div class="text-3xl font-bold text-red-600" id="totalExpense">0 đ</div>
                    </div>
                </div>
            </div>
        </section>
    `,

    fundsList: `
        <section class="container mx-auto px-4 mb-8">
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up delay-400">
                <div class="flex items-center justify-between mb-6 border-b pb-4">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <span class="mr-2">📋</span> Các khoản đang thu
                    </h2>
                    <span class="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">Cập nhật: <span id="lastUpdate">-</span></span>
                </div>
                <div id="activeFunds" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Skeleton -->
                    <div class="animate-pulse bg-gray-100 h-32 rounded-xl"></div>
                    <div class="animate-pulse bg-gray-100 h-32 rounded-xl"></div>
                </div>
            </div>
        </section>
    `,

    activity: `
        <section class="container mx-auto px-4 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up delay-500 border-t-4 border-green-500">
                    <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                        <span>💰 Giao dịch vừa nhận</span>
                        <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">Thời gian thực</span>
                    </h2>
                    <div id="recentTransactions" class="space-y-4">
                        <!-- Skeleton -->
                        <div class="animate-pulse bg-gray-50 h-16 rounded-lg"></div>
                        <div class="animate-pulse bg-gray-50 h-16 rounded-lg"></div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up delay-600 border-t-4 border-red-500">
                    <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                        <span>💳 Báo cáo chi tiêu mới</span>
                        <span class="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">Minh bạch</span>
                    </h2>
                    <div id="recentExpenses" class="space-y-4">
                        <!-- Skeleton -->
                        <div class="animate-pulse bg-gray-50 h-16 rounded-lg"></div>
                        <div class="animate-pulse bg-gray-50 h-16 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </section>
    `,

    modalPayment: `
        <div id="paymentModal" class="fixed inset-0 bg-black bg-opacity-60 z-[60] hidden flex items-center justify-center p-4 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col scale-95 transition-all duration-300" id="modalContainer">
                <div class="p-6 border-b flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 id="modalFundTitle" class="text-xl font-bold text-gray-800">Tên Quỹ</h3>
                        <p id="modalFundDesc" class="text-sm text-gray-500 italic mt-1">Mô tả quỹ</p>
                    </div>
                    <button onclick="closeModal()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                <div class="flex-1 overflow-y-auto p-6 bg-white">
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-5 mb-8 rounded-r-xl shadow-sm">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div class="ml-4 flex-1">
                                <h4 class="text-sm font-bold text-blue-800 uppercase tracking-wider">Hướng dẫn đóng tiền Online</h4>
                                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="bg-white p-4 rounded-xl border border-blue-100 space-y-3 shadow-sm">
                                        <div class="flex justify-between border-b pb-2 text-xs"><span class="text-gray-400 italic">Ngân hàng</span><strong class="text-gray-700">MB Bank</strong></div>
                                        <div class="flex justify-between border-b pb-2 text-xs"><span class="text-gray-400 italic">Số TK</span><strong class="text-gray-700">0345 678 999</strong></div>
                                        <div class="flex justify-between border-b pb-2 text-xs"><span class="text-gray-400 italic">Số tiền</span><strong id="modalAmountText" class="text-red-500">0 đ</strong></div>
                                        <div class="flex justify-between text-xs"><span class="text-gray-400 italic">Nội dung</span><strong id="modalContentText" class="text-blue-600 font-mono">DONGQUY</strong></div>
                                    </div>
                                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center shadow-sm">
                                        <img id="vietQrImg" src="" alt="VietQR" class="w-32 h-32 object-contain border p-2 rounded-lg mb-2">
                                        <span class="text-[9px] text-gray-400 italic">Quét mã VietQR để thanh toán tự động</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mb-6">
                        <h4 class="font-bold text-gray-700 flex items-center">
                             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                             Danh sách đóng tiền
                        </h4>
                        <div class="text-[10px] font-bold text-primary bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Tiến độ: <span id="modalProgressText">0/0</span></div>
                    </div>

                    <div class="overflow-x-auto rounded-xl border border-gray-100 overflow-hidden">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr class="text-[10px] font-bold text-gray-400 uppercase border-b">
                                    <th class="p-4">Sinh viên</th>
                                    <th class="p-4">Mã số SV</th>
                                    <th class="p-4">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody id="modalStudentList" class="divide-y divide-gray-50">
                                <!-- JS load -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="p-4 border-t bg-gray-50 text-right">
                    <button onclick="closeModal()" class="px-8 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition font-bold text-sm shadow-sm">Đóng</button>
                </div>
            </div>
        </div>
    `,

    footer: `
        <div class="container mx-auto px-4 text-center">
            <div class="flex items-center justify-center space-x-3 mb-4 opacity-70">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path></svg>
                <span class="text-lg font-bold">Quỹ Lớp v1.0</span>
            </div>
            <p class="text-gray-400 text-sm italic">&copy; 2026 Admin Panel - Hệ thống quản lý tài chính sinh viên</p>
            <p class="text-gray-500 text-[10px] mt-2 uppercase tracking-widest">Thiết kế cho sự minh bạch tối đa</p>
        </div>
    `
};

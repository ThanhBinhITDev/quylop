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
        <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 px-4 overflow-hidden">
            <!-- Decorative circles -->
            <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            
            <div class="container mx-auto text-center relative z-10">
                <div class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-blue-100 mb-6 border border-white/10 animate-fade-in-up">
                    Hệ thống quản lý tài chính 4.0
                </div>
                <h1 class="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up tracking-tight leading-tight">Minh Bạch Tài Chính <br class="hidden md:block"><span class="text-blue-300">Lớp Học</span></h1>
                <p class="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">Nền tảng giúp lớp trưởng quản lý quỹ lớp chuyên nghiệp, tự động hóa mã QR và báo cáo chi tiêu thời gian thực.</p>
                <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-300">
                    <a href="#funds-root" class="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition shadow-xl shadow-blue-900/20">🛒 Xem các khoản đóng</a>
                    <a href="pages/login.html" class="w-full sm:w-auto px-8 py-4 bg-blue-500/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition">🛠 Cổng Admin</a>
                </div>
            </div>
        </section>
    `,

    stats: `
        <section class="container mx-auto px-4 -mt-12 mb-12 relative z-20">
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/10 p-4 md:p-8 animate-fade-in-up delay-400 border border-white/50">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <!-- Card 1 -->
                    <div class="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-200/50 card-hover group cursor-pointer">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Số dư thực tế</span>
                            <div class="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                        </div>
                        <h3 class="text-3xl font-black tracking-tight" id="currentBalance">0 đ</h3>
                    </div>
                    <!-- Card 2 -->
                    <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover group cursor-pointer hover:border-blue-200 transition">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Đã thu (Học kỳ)</span>
                            <div class="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg></div>
                        </div>
                        <h3 class="text-3xl font-black tracking-tight text-slate-800" id="totalIncome">0 đ</h3>
                    </div>
                    <!-- Card 3 -->
                    <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover group cursor-pointer hover:border-red-200 transition">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Đã chi (Học kỳ)</span>
                            <div class="p-2 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg></div>
                        </div>
                        <h3 class="text-3xl font-black tracking-tight text-slate-800" id="totalExpense">0 đ</h3>
                    </div>
                </div>
            </div>
        </section>
    `,

    fundsList: `
        <section class="container mx-auto px-4 mb-12" id="funds-root-target">
            <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 animate-fade-in-up delay-500">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Danh sách các khoản thu</h2>
                        <p class="text-slate-500 mt-1">Vui lòng chọn một khoản để xem chi tiết và đóng tiền</p>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-2xl flex items-center space-x-2">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Cập nhật: <span id="lastUpdate">-</span></span>
                    </div>
                </div>
                <div id="activeFunds" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- JS load -->
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
                    <!-- Placeholder khi chưa chọn sinh viên -->
                    <div id="paymentPlaceholder" class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center mb-8 animate-pulse">
                        <div class="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <h4 class="text-lg font-bold text-gray-700">Vui lòng chọn tên của bạn</h4>
                        <p class="text-sm text-gray-500 mt-2">Tìm và bấm vào tên bạn trong danh sách bên dưới để lấy mã QR và thông tin chuyển khoản cá nhân.</p>
                    </div>

                    <!-- Khu vực thanh toán (Mặc định ẩn) -->
                    <div id="paymentInstructions" class="hidden bg-blue-50 border-l-4 border-blue-500 p-5 mb-8 rounded-r-xl shadow-sm animate-fade-in">
                        <div class="flex flex-col md:flex-row gap-6 sticky top-0">
                            <div class="flex-1">
                                <h4 class="text-sm font-bold text-blue-800 uppercase tracking-widest mb-4 flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Thông tin chuyển khoản của bạn
                                </h4>
                                <div class="space-y-4">
                                    <!-- Chủ tài khoản -->
                                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex justify-between items-center group">
                                        <div>
                                            <p class="text-[10px] text-gray-400 uppercase font-bold">Chủ tài khoản</p>
                                            <p id="modalAccountName" class="font-bold text-gray-700">NGUYEN THANH BINH</p>
                                        </div>
                                        <button onclick="copyText('modalAccountName', 'Tên chủ TK')" class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition opacity-0 group-hover:opacity-100">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                                        </button>
                                    </div>
                                    <!-- Số tài khoản -->
                                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex justify-between items-center group">
                                        <div>
                                            <p class="text-[10px] text-gray-400 uppercase font-bold">Số TK - MB Bank</p>
                                            <p id="modalAccountNo" class="font-bold text-gray-700">0345 678 999</p>
                                        </div>
                                        <button onclick="copyText('modalAccountNo', 'Số tài khoản')" class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition opacity-0 group-hover:opacity-100">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                                        </button>
                                    </div>
                                    <!-- Số tiền -->
                                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex justify-between items-center group">
                                        <div>
                                            <p class="text-[10px] text-gray-400 uppercase font-bold">Số tiền cần đóng</p>
                                            <p id="modalAmountValue" class="font-bold text-red-500 text-lg">0 đ</p>
                                        </div>
                                        <button onclick="copyText('modalAmountValue', 'Số tiền')" class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition opacity-0 group-hover:opacity-100">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                                        </button>
                                    </div>
                                    <!-- Nội dung -->
                                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex justify-between items-center group border-2 border-dashed border-blue-300">
                                        <div>
                                            <p class="text-[10px] text-blue-500 uppercase font-bold">Nội dung chuyển khoản (Bắt buộc)</p>
                                            <p id="modalContentValue" class="font-bold text-blue-600 font-mono tracking-wider">DONGQUY</p>
                                        </div>
                                        <button onclick="copyText('modalContentValue', 'Nội dung')" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition shadow-md">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 p-3 bg-white rounded-lg border border-blue-100 flex items-center space-x-2 animate-pulse">
                                    <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                                    <p class="text-[10px] text-gray-500 italic">Chọn tên bạn bên dưới để nhận mã QR cá nhân hóa!</p>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center shadow-lg w-full md:w-64">
                                <img id="vietQrImg" src="" alt="VietQR" class="w-48 h-48 object-contain mb-3 hover:scale-105 transition duration-300">
                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quét mã để đóng quỹ</span>
                                <div id="personalTag" class="mt-2 hidden px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">QR Cá nhân của: <span id="personalName"></span></div>
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
    `,

    adminSidebar: `
        <aside id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col">
            <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="p-2 bg-blue-500 rounded-lg">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                            <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <span class="text-xl font-bold tracking-tight">Quỹ Lớp <span class="text-blue-500">Pro</span></span>
                </div>
                <button onclick="toggleSidebar()" class="md:hidden text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <nav class="flex-1 px-4 py-6 space-y-1">
                <a href="dashboard.html" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl transition group" data-page="dashboard">
                    <svg class="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    <span class="font-medium">Tổng quan</span>
                </a>
                <a href="funds.html" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl transition group" data-page="funds">
                    <svg class="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span class="font-medium">Quản lý Quỹ thu</span>
                </a>
                <a href="expenses.html" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl transition group" data-page="expenses">
                    <svg class="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span class="font-medium">Chi tiêu & Hóa đơn</span>
                </a>
                <a href="members.html" class="nav-link flex items-center space-x-3 px-4 py-3 rounded-xl transition group" data-page="members">
                    <svg class="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span class="font-medium">Danh sách lớp</span>
                </a>
            </nav>

            <div class="p-6 mt-auto border-t border-slate-800">
                <button onclick="handleLogout()" class="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span class="font-bold">Đăng xuất</span>
                </button>
            </div>
        </aside>
    `,

    adminHeader: `
        <header class="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300">
            <div class="flex items-center">
                <button onclick="toggleSidebar()" class="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 transition">
                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <div id="breadcrumb" class="hidden sm:flex items-center text-sm text-gray-500">
                    <span class="hover:text-primary cursor-pointer">Admin</span>
                    <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span id="currentPageTitle" class="text-slate-900 font-bold">Bảng điều khiển</span>
                </div>
            </div>
            
            <div class="flex items-center space-x-2 md:space-x-4">
                <div class="hidden md:flex flex-col text-right">
                    <span class="text-sm font-bold text-slate-800" id="adminDisplayName">Admin</span>
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lớp trưởng</span>
                </div>
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 ring-2 ring-white">
                    A
                </div>
            </div>
        </header>
    `
};

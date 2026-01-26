// Main JavaScript for homepage

// This function will be called by layout-loader.js after components are loaded
async function initPage() {
    console.log('Initializing page components...');
    await loadDashboardData();
    updateLastUpdateTime();

    // Refresh every 30 seconds
    if (window.dashboardInterval) clearInterval(window.dashboardInterval);
    window.dashboardInterval = setInterval(loadDashboardData, 30000);
}

async function loadDashboardData() {
    try {
        // Call real API
        const data = await api.get('/dashboard');

        updateBalance(data);
        updateActiveFunds(data.activeFunds);
        updateRecentTransactions(data.recentTransactions);
        updateRecentExpenses(data.recentExpenses);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateBalance(data) {
    const currentBalance = document.getElementById('currentBalance');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpense = document.getElementById('totalExpense');

    if (currentBalance) currentBalance.textContent = formatCurrency(data.currentBalance);
    if (totalIncome) totalIncome.textContent = formatCurrency(data.totalIncome);
    if (totalExpense) totalExpense.textContent = formatCurrency(data.totalExpense);
}

function updateActiveFunds(funds) {
    const container = document.getElementById('activeFunds');
    if (!container) return;

    if (!funds || funds.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4 col-span-2">Hiện không có khoản thu nào</p>';
        return;
    }

    container.innerHTML = funds.map(fund => `
        <div onclick="openPaymentModal(${fund.id})" class="bg-gray-50 rounded-lg p-4 card-hover cursor-pointer border-2 border-transparent hover:border-blue-500 animate-fade-in-up">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">${fund.title}</h3>
                    <p class="text-sm text-gray-600 mt-1">${fund.description || ''}</p>
                    <div class="flex items-center space-x-4 mt-2">
                        <span class="text-sm text-gray-500">Số tiền: <strong class="text-primary">${formatCurrency(fund.amount)}</strong></span>
                        <span class="text-sm text-gray-500">Hạn: ${formatDate(fund.deadline)}</span>
                    </div>
                </div>
                <div class="flex flex-col items-end space-y-2">
                    <span class="px-3 py-1 text-xs font-semibold rounded-full ${fund.type === 'weekly' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}">
                        ${fund.type === 'weekly' ? 'Hàng tuần' : fund.type === 'monthly' ? 'Hàng tháng' : 'Một lần'}
                    </span>
                    <button class="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-blue-600 transition">Xem danh sách</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Store current fund data globally for easy access by personal QR logic
let currentFundData = null;

async function openPaymentModal(fundId) {
    const modal = document.getElementById('paymentModal');
    const modalContainer = document.getElementById('modalContainer');
    if (!modal) return;

    modal.classList.remove('hidden');
    setTimeout(() => {
        if (modalContainer) modalContainer.classList.remove('scale-95');
    }, 10);

    document.body.style.overflow = 'hidden';

    // Reset UI state
    const placeholder = document.getElementById('paymentPlaceholder');
    const instructions = document.getElementById('paymentInstructions');
    if (placeholder) placeholder.classList.remove('hidden');
    if (instructions) instructions.classList.add('hidden');

    const personalTag = document.getElementById('personalTag');
    if (personalTag) personalTag.classList.add('hidden');

    try {
        const data = await api.get(`/public/funds/${fundId}`);
        currentFundData = data;
        const fund = data.fund;
        const students = data.students;

        // Fill data
        document.getElementById('modalFundTitle').textContent = fund.title;
        document.getElementById('modalFundDesc').textContent = fund.description || 'Thu quỹ lớp định kỳ';

        // Detailed info area
        document.getElementById('modalAmountValue').textContent = formatCurrency(fund.amount);
        const description = `DONGQUY MSV ${fund.id}`;
        document.getElementById('modalContentValue').textContent = description;

        // Generate General VietQR
        generateVietQR(fund.amount, description);

        const paidCount = students.filter(s => s.paid).length;
        document.getElementById('modalProgressText').textContent = `${paidCount}/${students.length}`;

        const listEl = document.getElementById('modalStudentList');
        listEl.innerHTML = students.map(s => `
            <tr class="hover:bg-blue-50 cursor-pointer transition group" onclick="selectStudentForPayment('${s.student_code}', '${s.name}')">
                <td class="p-3">
                    <div class="flex items-center space-x-2">
                        <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition">
                            ${s.name.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">${s.name}</span>
                    </div>
                </td>
                <td class="p-3 text-sm text-gray-500 font-mono">${s.student_code}</td>
                <td class="p-3">
                    ${s.paid ?
                '<span class="px-2 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">Đã đóng</span>' :
                '<span class="px-2 py-1 text-[10px] font-bold bg-red-100 text-red-700 rounded-full">Chưa đóng</span>'
            }
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error loading fund details:', error);
    }
}

function selectStudentForPayment(studentCode, studentName) {
    if (!currentFundData) return;

    // Toggle UI visibility
    const placeholder = document.getElementById('paymentPlaceholder');
    const instructions = document.getElementById('paymentInstructions');
    if (placeholder) placeholder.classList.add('hidden');
    if (instructions) instructions.classList.remove('hidden');

    // Update content and QR for specific student
    const description = `DONGQUY ${studentCode} ${currentFundData.fund.id}`;
    document.getElementById('modalContentValue').textContent = description;

    // Show personal tag
    const personalTag = document.getElementById('personalTag');
    const personalName = document.getElementById('personalName');
    if (personalTag && personalName) {
        personalTag.classList.remove('hidden');
        personalName.textContent = studentName;
    }

    // Refresh QR
    generateVietQR(currentFundData.fund.amount, description);

    // Highlight the content box
    const contentBox = document.getElementById('modalContentValue').parentElement.parentElement;
    contentBox.classList.add('ring-2', 'ring-blue-400');
    setTimeout(() => contentBox.classList.remove('ring-2', 'ring-blue-400'), 1000);
}

function generateVietQR(amount, description) {
    const bankId = 'MB';
    const accountNo = '0345678999';
    const accountName = 'NGUYEN THANH BINH';
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
    document.getElementById('vietQrImg').src = qrUrl;
}

function copyText(elementId, label) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Show a small organic toast or feedback
        const btn = event.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 1500);
    });
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) modalContainer.classList.add('scale-95');

    setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 200);
}

function updateRecentTransactions(transactions) {
    const container = document.getElementById('recentTransactions');
    if (!container) return;

    if (!transactions || transactions.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Chưa có giao dịch nào</p>';
        return;
    }

    container.innerHTML = transactions.map(tx => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-fade-in-up">
            <div>
                <p class="font-medium text-gray-800">${tx.description || 'Chuyển khoản'}</p>
                <p class="text-xs text-gray-500">${formatDateTime(tx.transaction_date)}</p>
            </div>
            <span class="font-semibold text-green-600">+${formatCurrency(tx.amount)}</span>
        </div>
    `).join('');
}

function updateRecentExpenses(expenses) {
    const container = document.getElementById('recentExpenses');
    if (!container) return;

    if (!expenses || expenses.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Chưa có khoản chi nào</p>';
        return;
    }

    container.innerHTML = expenses.map(expense => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-fade-in-up">
            <div class="flex-1">
                <p class="font-medium text-gray-800">${expense.title}</p>
                <p class="text-xs text-gray-500">${formatDate(expense.expense_date)}</p>
            </div>
            <span class="font-semibold text-red-600">-${formatCurrency(expense.amount)}</span>
        </div>
    `).join('');
}

function updateLastUpdateTime() {
    const el = document.getElementById('lastUpdate');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

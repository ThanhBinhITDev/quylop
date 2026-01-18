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
        // Silent error for automated polling, but alert on manual load if needed
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
                    <span class="px-3 py-1 text-xs font-semibold rounded-full ${fund.type === 'weekly' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}">
                        ${fund.type === 'weekly' ? 'Hàng tuần' : fund.type === 'monthly' ? 'Hàng tháng' : 'Một lần'}
                    </span>
                    <button class="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-blue-600 transition">Xem danh sách</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function openPaymentModal(fundId) {
    const modal = document.getElementById('paymentModal');
    const modalContainer = document.getElementById('modalContainer');
    if (!modal) return;

    modal.classList.remove('hidden');
    // Animation for scale
    setTimeout(() => {
        if (modalContainer) modalContainer.classList.remove('scale-95');
    }, 10);

    document.body.style.overflow = 'hidden';

    try {
        const data = await api.get(`/public/funds/${fundId}`);
        const fund = data.fund;
        const students = data.students;

        // Fill data
        document.getElementById('modalFundTitle').textContent = fund.title;
        document.getElementById('modalFundDesc').textContent = fund.description || 'Thu quỹ lớp định kỳ';
        document.getElementById('modalAmountText').textContent = formatCurrency(fund.amount);

        const description = `DONGQUY MSV ${fund.id}`;
        document.getElementById('modalContentText').textContent = description;

        // Generate VietQR
        const bankId = 'MB';
        const accountNo = '0345678999';
        const accountName = 'NGUYEN THANH BINH';
        const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${fund.amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
        document.getElementById('vietQrImg').src = qrUrl;

        const paidCount = students.filter(s => s.paid).length;
        document.getElementById('modalProgressText').textContent = `${paidCount}/${students.length}`;

        const listEl = document.getElementById('modalStudentList');
        listEl.innerHTML = students.map(s => `
            <tr class="hover:bg-gray-50">
                <td class="p-3 text-sm font-medium text-gray-800">${s.name}</td>
                <td class="p-3 text-sm text-gray-500">${s.student_code}</td>
                <td class="p-3">
                    ${s.paid ?
                '<span class="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">Đã đóng</span>' :
                '<span class="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">Chưa đóng</span>'
            }
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error loading fund details:', error);
        alert('Lỗi khi tải thông tin chi tiết quỹ.');
    }
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

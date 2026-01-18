// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check Authentication
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Load User Info
    loadUserInfo();

    // 3. Load Dashboard Data
    await loadAdminDashboardData();
});

function loadUserInfo() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRole').textContent = user.role === 'admin' ? 'Quản trị viên' : 'Thành viên';
    }
}

async function loadAdminDashboardData() {
    try {
        const data = await api.get('/dashboard');

        // Update Stats
        document.getElementById('statBalance').textContent = formatCurrency(data.currentBalance);
        document.getElementById('statIncome').textContent = formatCurrency(data.totalIncome);
        document.getElementById('statExpense').textContent = formatCurrency(data.totalExpense);

        // Update Funds
        updateAdminFunds(data.activeFunds);

        // Update Activity
        updateAdminActivity(data.recentTransactions);

    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        if (error.message.includes('401')) {
            handleLogout();
        }
    }
}

function updateAdminFunds(funds) {
    const container = document.getElementById('adminFunds');
    if (!funds || funds.length === 0) {
        container.innerHTML = '<p class="text-gray-500 py-4">Chưa có quỹ nào được tạo.</p>';
        return;
    }

    container.innerHTML = funds.map(fund => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
                <h4 class="font-semibold text-gray-800">${fund.title}</h4>
                <p class="text-xs text-gray-500">${formatDate(fund.deadline)}</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-primary">${formatCurrency(fund.amount)}</p>
                <a href="#" class="text-xs text-blue-600 hover:underline">Chi tiết</a>
            </div>
        </div>
    `).join('');
}

function updateAdminActivity(transactions) {
    const container = document.getElementById('adminActivity');
    if (!transactions || transactions.length === 0) {
        container.innerHTML = '<p class="text-gray-500 py-4">Chưa có hoạt động nào.</p>';
        return;
    }

    container.innerHTML = transactions.map(tx => `
        <div class="flex items-center space-x-4">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <div class="flex-1">
                <p class="text-sm text-gray-800">
                    <span class="font-semibold">${tx.description || 'Chuyển khoản'}</span>
                </p>
                <p class="text-xs text-gray-500">${formatDateTime(tx.transaction_date)}</p>
            </div>
            <span class="text-sm font-bold text-green-600">+${formatCurrency(tx.amount)}</span>
        </div>
    `).join('');
}

async function handleLogout() {
    try {
        await api.post('/logout');
    } catch (e) {
        console.error('Logout error:', e);
    }
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

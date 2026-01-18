// Funds Management JS
let currentFundId = null;

document.addEventListener('DOMContentLoaded', async () => {
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    await loadFundHistory();
});

async function loadFundHistory() {
    try {
        const funds = await api.get('/funds');
        const container = document.getElementById('fundList');

        if (funds.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Chưa có dữ liệu thu quỹ.</p>';
            return;
        }

        container.innerHTML = funds.map(fund => `
            <div onclick="selectFund(${fund.id})" class="p-4 rounded-lg cursor-pointer transition ${currentFundId === fund.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}">
                <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm ${currentFundId === fund.id ? 'text-blue-700' : 'text-gray-700'}">${fund.title}</span>
                    <span class="text-xs font-bold text-blue-600">${formatCurrency(fund.amount)}</span>
                </div>
                <div class="mt-1 text-xs text-gray-500 flex justify-between">
                    <span>${formatDate(fund.created_at)}</span>
                    <span class="capitalize">${fund.type === 'weekly' ? 'Hàng tuần' : fund.type}</span>
                </div>
            </div>
        `).join('');

        // Auto select first fund if none selected
        if (!currentFundId && funds.length > 0) {
            selectFund(funds[0].id);
        }
    } catch (e) {
        console.error('Error loading funds:', e);
    }
}

async function selectFund(fundId) {
    currentFundId = fundId;

    // Refresh fund list UI to show active state
    loadFundHistory();

    try {
        const data = await api.get(`/funds/${fundId}`);
        const fund = data.fund;
        const students = data.students;

        // Update UI
        document.getElementById('selectedFundTitle').innerHTML = `
            <h3 class="font-bold text-gray-800 text-lg">${fund.title}</h3>
            <p class="text-sm text-gray-500">Mức đóng: <strong class="text-primary">${formatCurrency(fund.amount)}</strong> | Hạn: ${formatDate(fund.deadline)}</p>
        `;

        // Update Stats
        const paidCount = students.filter(s => s.paid).length;
        const totalCount = students.length;
        const progress = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;

        const statsEl = document.getElementById('fundStats');
        statsEl.classList.remove('hidden');
        document.getElementById('progressText').textContent = `${progress}% (${paidCount}/${totalCount})`;
        document.getElementById('progressBar').style.width = `${progress}%`;

        // Update Student List
        const listEl = document.getElementById('studentList');
        if (students.length === 0) {
            listEl.innerHTML = '<tr><td colspan="4" class="py-10 text-center text-gray-500">Chưa có sinh viên nào trong hệ thống.</td></tr>';
            return;
        }

        listEl.innerHTML = students.map(s => `
            <tr class="hover:bg-gray-50">
                <td class="py-4">
                    <div class="font-medium text-gray-800">${s.name}</div>
                </td>
                <td class="py-4 text-sm text-gray-500">${s.student_code}</td>
                <td class="py-4">
                    ${s.paid ?
                '<span class="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">Đã đóng</span>' :
                '<span class="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">Chưa đóng</span>'
            }
                </td>
                <td class="py-4 text-right">
                    ${!s.paid ?
                `<button onclick="confirmPayment(${fund.id}, ${s.id})" class="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Xác nhận</button>` :
                '<span class="text-xs text-gray-400">Hoàn tất</span>'
            }
                </td>
            </tr>
        `).join('');
    } catch (e) {
        console.error('Error selecting fund:', e);
    }
}

async function createWeeklyFund() {
    if (!confirm('Bạn muốn tạo quỹ mới cho tuần này (10,000 đ)?')) return;

    try {
        const response = await api.post('/funds/weekly');
        alert(response.message);
        currentFundId = response.fund.id;
        await loadFundHistory();
    } catch (e) {
        alert(e.message || 'Lỗi khi tạo quỹ tuần mới.');
    }
}

async function confirmPayment(fundId, userId) {
    if (!confirm('Xác nhận sinh viên đã đóng tiền?')) return;

    try {
        const response = await api.post(`/funds/${fundId}/contribute/${userId}`);
        // Refresh Current Fund
        await selectFund(fundId);
    } catch (e) {
        alert(e.message || 'Lỗi khi xác nhận đóng tiền.');
    }
}

function handleLogout() {
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Funds Management JS
let currentFundId = null;

document.addEventListener('DOMContentLoaded', async () => {
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    await loadFundHistory();

    // Handle Form Submit
    const fundForm = document.getElementById('fundForm');
    if (fundForm) {
        fundForm.addEventListener('submit', handleFundSubmit);
    }
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
                    <label class="switch">
                        <input type="checkbox" ${s.paid ? 'checked' : ''} onchange="togglePayment(${fund.id}, ${s.id}, this)">
                        <span class="slider round"></span>
                    </label>
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

async function handleFundSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Fix empty deadline
    if (!data.deadline) delete data.deadline;
    if (!data.description) delete data.description;

    try {
        console.log('Creating fund:', data);
        const response = await api.post('/funds', data);

        alert(response.message || 'Tạo quỹ thành công!');
        closeFundModal();
        e.target.reset();

        currentFundId = response.fund.id;
        await loadFundHistory();

        // Auto select new fund
        selectFund(currentFundId);
    } catch (error) {
        console.error('Create fund error:', error);
        alert(error.message || 'Lỗi khi tạo quỹ.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Lưu đợt thu';
        }
    }
}

async function togglePayment(fundId, userId, checkbox) {
    const isPaid = checkbox.checked;
    checkbox.disabled = true;

    try {
        await api.post(`/funds/${fundId}/toggle/${userId}`, {
            status: isPaid ? 'paid' : 'unpaid'
        });

        // Refresh stats
        const data = await api.get(`/funds/${fundId}`);
        const students = data.students;
        const paidCount = students.filter(s => s.paid).length;
        const totalCount = students.length;
        const progress = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;

        document.getElementById('progressText').textContent = `${progress}% (${paidCount}/${totalCount})`;
        document.getElementById('progressBar').style.width = `${progress}%`;

        // Update label
        const row = checkbox.closest('tr');
        const statusCell = row.cells[2];
        statusCell.innerHTML = isPaid
            ? '<span class="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">Đã đóng</span>'
            : '<span class="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">Chưa đóng</span>';

    } catch (e) {
        alert(e.message || 'Lỗi trạng thái.');
        checkbox.checked = !isPaid;
    } finally {
        checkbox.disabled = false;
    }
}

function handleLogout() {
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('vi-VN');
}

// Modal Functions - Cleaned and Unique
function openFundModal() {
    console.log('Opening Fund Modal (Fixed)...');

    const modal = document.getElementById('fundModal');
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }

    // Reset Form
    const fundForm = document.getElementById('fundForm');
    if (fundForm) fundForm.reset();

    // Set Title
    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = 'Tạo đợt thu mới';

    // Clear ID for new creation
    const idInput = document.querySelector('input[name="id"]');
    if (idInput) idInput.value = '';

    modal.classList.remove('hidden');
}

function closeFundModal() {
    const modal = document.getElementById('fundModal');
    if (modal) modal.classList.add('hidden');
}

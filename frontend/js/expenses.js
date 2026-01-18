// Expenses Management JS

document.addEventListener('DOMContentLoaded', async () => {
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Set default date to today
    const dateInput = document.querySelector('input[name="expense_date"]');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    await loadExpenses();

    // Handle Form Submit
    document.getElementById('expenseForm').addEventListener('submit', handleAddExpense);
});

async function loadExpenses() {
    try {
        const expenses = await api.get('/expenses');
        const container = document.getElementById('expenseList');

        let totalAmount = 0;

        if (expenses.length === 0) {
            container.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-gray-500 italic">Chưa có khoản chi nào được ghi nhận.</td></tr>';
            document.getElementById('totalExpanseText').textContent = '0 đ';
            return;
        }

        container.innerHTML = expenses.map(ex => {
            totalAmount += parseFloat(ex.amount);
            return `
                <tr class="hover:bg-gray-50 transition">
                    <td class="p-4 text-sm text-gray-600">${formatDate(ex.expense_date)}</td>
                    <td class="p-4">
                        <div class="font-semibold text-gray-800">${ex.title}</div>
                        ${ex.description ? `<p class="text-xs text-gray-500 mt-1">${ex.description}</p>` : ''}
                    </td>
                    <td class="p-4 font-bold text-red-600">-${formatCurrency(ex.amount)}</td>
                    <td class="p-4 text-sm text-gray-600">${ex.creator_name}</td>
                    <td class="p-4">
                        ${ex.proof_image ?
                    `<button onclick="viewImage('${ex.proof_image}')" class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span class="text-xs">Xem ảnh</span>
                            </button>` :
                    '<span class="text-xs text-gray-400">Không có</span>'
                }
                    </td>
                    <td class="p-4 text-right">
                        <button onclick="deleteExpense(${ex.id})" class="p-2 text-gray-400 hover:text-red-600 transition">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        document.getElementById('totalExpanseText').textContent = formatCurrency(totalAmount);

    } catch (e) {
        console.error('Error loading expenses:', e);
    }
}

async function handleAddExpense(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Disable button
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Đang lưu...';

    try {
        await api.post('/expenses', data);
        closeExpenseModal();
        e.target.reset();
        await loadExpenses();
    } catch (error) {
        alert(error.message || 'Lỗi khi lưu khoản chi.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Lưu khoản chi';
    }
}

async function deleteExpense(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa khoản chi này? Số dư quỹ sẽ được hoàn lại.')) return;

    try {
        await api.delete(`/expenses/${id}`);
        await loadExpenses();
    } catch (e) {
        alert('Lỗi hệ thống khi xóa.');
    }
}

// Modal UI Functions
function openExpenseModal() {
    document.getElementById('expenseModal').classList.remove('hidden');
}

function closeExpenseModal() {
    document.getElementById('expenseModal').classList.add('hidden');
}

function viewImage(url) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImg');
    img.src = url;
    modal.classList.remove('hidden');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.add('hidden');
}

function handleLogout() {
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

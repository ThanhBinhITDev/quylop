// Member Management JS

document.addEventListener('DOMContentLoaded', async () => {
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    await loadMembers();

    // Handle Form Submit
    document.getElementById('memberForm').addEventListener('submit', handleMemberSubmit);
});

async function loadMembers() {
    try {
        const members = await api.get('/members');
        const container = document.getElementById('memberList');

        document.getElementById('memberCountText').textContent = members.length;

        if (members.length === 0) {
            container.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-gray-500 italic">Hiện lớp chưa có thành viên nào.</td></tr>';
            return;
        }

        container.innerHTML = members.map(m => `
            <tr class="hover:bg-gray-50 transition border-b">
                <td class="p-4 cursor-pointer" onclick="openMemberQr(${JSON.stringify(m).replace(/"/g, '&quot;')})">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            ${m.name.charAt(0).toUpperCase()}
                        </div>
                        <span class="font-semibold text-gray-800 hover:text-primary transition">${m.name}</span>
                    </div>
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${m.student_code}</td>
                <td class="p-4 text-sm text-gray-600">${m.phone || '-'}</td>
                <td class="p-4 text-sm text-gray-600">${m.email}</td>
                <td class="p-4 text-sm">
                    <span class="px-2 py-1 rounded-full text-xs font-bold ${m.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}">
                        ${m.role === 'admin' ? 'Admin' : 'Sinh viên'}
                    </span>
                </td>
                <td class="p-4 text-right flex items-center justify-end space-x-1">
                    <button onclick="openMemberQr(${JSON.stringify(m).replace(/"/g, '&quot;')})" class="p-2 text-secondary hover:text-green-600 transition" title="Xem mã QR">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 0h2M4 16h12m4 0h2M4 20h12m4 0h2"></path></svg>
                    </button>
                    <button onclick="viewMemberHistory(${m.id}, '${m.name}')" class="p-2 text-primary hover:text-blue-600 transition" title="Lịch sử đóng tiền">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h1v1H9v-1zm0 4h1v1H9v-1z"></path></svg>
                    </button>
                    <button onclick="editMember(${JSON.stringify(m).replace(/"/g, '&quot;')})" class="p-2 text-blue-400 hover:text-blue-600 transition" title="Sửa">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="deleteMember(${m.id})" class="p-2 text-gray-400 hover:text-red-500 transition" title="Xóa">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        console.error('Error loading members:', e);
    }
}

async function handleMemberSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const id = data.id;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Đang lưu...';

    try {
        if (id) {
            await api.put(`/members/${id}`, data);
        } else {
            await api.post('/members', data);
        }
        closeMemberModal();
        e.target.reset();
        await loadMembers();
    } catch (error) {
        alert(error.message || 'Lỗi khi lưu thông tin.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Lưu thông tin';
    }
}

function openMemberModal() {
    document.getElementById('modalTitle').textContent = 'Thêm thành viên mới';
    document.getElementById('memberForm').reset();
    document.querySelector('input[name="id"]').value = '';
    document.getElementById('memberModal').classList.remove('hidden');
}

function editMember(m) {
    document.getElementById('modalTitle').textContent = 'Sửa thông tin thành viên';
    document.getElementById('memberModal').classList.remove('hidden');

    // Fill data
    const form = document.getElementById('memberForm');
    form.elements['id'].value = m.id;
    form.elements['name'].value = m.name;
    form.elements['student_code'].value = m.student_code;
    form.elements['phone'].value = m.phone || '';
    form.elements['email'].value = m.email;
    form.elements['role'].value = m.role;
}

function closeMemberModal() {
    document.getElementById('memberModal').classList.add('hidden');
}

async function deleteMember(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa thành viên này? Dữ liệu đóng tiền của họ có thể bị ảnh hưởng.')) return;

    try {
        await api.delete(`/members/${id}`);
        await loadMembers();
    } catch (e) {
        alert('Lỗi hệ thống khi xóa.');
    }
}

// Payment History Logic
async function viewMemberHistory(userId, userName) {
    document.getElementById('historyMemberName').textContent = userName;
    document.getElementById('historyModal').classList.remove('hidden');
    document.getElementById('historyList').innerHTML = '<tr><td colspan="4" class="p-4 text-center">Đang tải...</td></tr>';

    try {
        const history = await api.get(`/members/${userId}/payments`);
        const container = document.getElementById('historyList');

        if (history.length === 0) {
            container.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500 italic">Chưa có đợt thu quỹ nào được tạo.</td></tr>';
            return;
        }

        container.innerHTML = history.map(h => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">
                    <div class="font-medium text-gray-800">${h.title}</div>
                    <div class="text-[10px] text-gray-400">Hạn: ${h.deadline ? new Date(h.deadline).toLocaleDateString('vi-VN') : '-'}</div>
                </td>
                <td class="p-3 text-sm text-gray-600">${h.required_amount.toLocaleString()}đ</td>
                <td class="p-3">
                    <span id="status-label-${userId}-${h.fund_id}" class="px-2 py-0.5 rounded-full ${h.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold">
                        ${h.status === 'paid' ? 'Đã đóng' : 'Chưa đóng'}
                    </span>
                </td>
                <td class="p-3 text-right">
                    <label class="switch">
                        <input type="checkbox" ${h.status === 'paid' ? 'checked' : ''} onchange="toggleQuickPay(${h.fund_id}, ${userId}, '${userName}', this)">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        alert('Lỗi khi tải lịch sử đóng tiền.');
    }
}

function closeHistoryModal() {
    document.getElementById('historyModal').classList.add('hidden');
}

async function toggleQuickPay(fundId, userId, userName, checkbox) {
    const isPaid = checkbox.checked;
    checkbox.disabled = true;

    try {
        await api.post(`/funds/${fundId}/toggle/${userId}`, {
            status: isPaid ? 'paid' : 'unpaid'
        });

        // Update label in modal
        const label = document.getElementById(`status-label-${userId}-${fundId}`);
        if (isPaid) {
            label.textContent = 'Đã đóng';
            label.className = 'px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold';
        } else {
            label.textContent = 'Chưa đóng';
            label.className = 'px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold';
        }

    } catch (e) {
        alert(e.message || 'Lỗi khi cập nhật trạng thái.');
        checkbox.checked = !isPaid;
    } finally {
        checkbox.disabled = false;
    }
}

function openMemberQr(m) {
    document.getElementById('qrMemberName').textContent = m.name;
    document.getElementById('qrMemberCode').textContent = m.student_code;

    // Generate VietQR for this member (general pay without specific amount)
    const bankId = 'MB';
    const accountNo = '0345678999';
    const accountName = 'NGUYEN THANH BINH';
    const description = `DONGQUY ${m.student_code}`;
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    document.getElementById('memberQrImg').src = qrUrl;
    document.getElementById('qrModal').classList.remove('hidden');
}

function closeQrModal() {
    document.getElementById('qrModal').classList.add('hidden');
}

function printQr() {
    const name = document.getElementById('qrMemberName').textContent;
    const code = document.getElementById('qrMemberCode').textContent;
    const qrSrc = document.getElementById('memberQrImg').src;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>In mã QR - ${name}</title>
                <style>
                    body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { border: 2px solid #333; padding: 40px; border-radius: 20px; text-align: center; }
                    img { width: 300px; height: 300px; }
                    h1 { margin: 20px 0 10px 0; }
                    p { font-size: 20px; color: #666; }
                </style>
            </head>
            <body>
                <div class="card">
                    <img src="${qrSrc}">
                    <h1>${name}</h1>
                    <p>${code}</p>
                    <p style="font-size: 14px; margin-top: 30px; border-top: 1px dashed #ccc; padding-top: 10px;">QUÉT ĐỂ ĐÓNG QUỸ LỚP</p>
                </div>
                <script>
                    window.onload = () => { window.print(); window.close(); }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

function handleLogout() {
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

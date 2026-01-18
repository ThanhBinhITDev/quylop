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
                <td class="p-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            ${m.name.charAt(0).toUpperCase()}
                        </div>
                        <span class="font-semibold text-gray-800">${m.name}</span>
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
                <td class="p-4 text-right space-x-2">
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

function handleLogout() {
    api.clearToken();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

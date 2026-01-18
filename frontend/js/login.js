// Login page JavaScript

async function handleLogin(event) {
    event.preventDefault();

    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Get form data
    const studentCode = document.getElementById('student_code').value;
    const password = document.getElementById('password').value;

    // Show loading state
    loginButton.disabled = true;
    loginButton.textContent = 'Đang đăng nhập...';
    errorMessage.classList.add('hidden');

    try {
        // Call Laravel API for login
        const response = await api.post('/login', {
            student_code: studentCode,
            password: password
        });

        // Save token and user info
        api.setToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        // Show error
        errorText.textContent = 'Mã sinh viên hoặc mật khẩu không đúng.';
        errorMessage.classList.remove('hidden');

        // Reset button
        loginButton.disabled = false;
        loginButton.textContent = 'Đăng nhập';
    }
}

// Check if already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (api.isAuthenticated()) {
        // Redirect to dashboard if already has token
        window.location.href = 'dashboard.html';
    }
});

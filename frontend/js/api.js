// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
const API_TIMEOUT = 10000; // 10 seconds

// API Service
class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('auth_token');
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    }

    // Remove auth token
    clearToken() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    // Check if authenticated
    isAuthenticated() {
        return !!this.token;
    }
}

// Create API instance
const api = new APIService(API_BASE_URL);

// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { api, formatCurrency, formatDate, formatDateTime };
}

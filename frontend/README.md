# 📱 Frontend - Quỹ Lớp

## Cấu trúc Frontend

```
frontend/
├── index.html          → Trang chủ công khai
├── css/
│   └── style.css      → Custom CSS styles
├── js/
│   ├── api.js         → API service layer
│   ├── main.js        → Main homepage logic
│   └── login.js       → Login page logic
└── pages/
    ├── login.html     → Trang đăng nhập
    └── dashboard.html → Admin dashboard (đang phát triển)
```

## Công nghệ sử dụng

- **HTML5** - Cấu trúc semantic
- **Tailwind CSS** (CDN) - Styling framework
- **Vanilla JavaScript** - Logic và API calls

## Chạy Frontend

### Cách 1: Dùng script (Khuyến nghị)
```powershell
.\scripts\start-frontend.bat
```

### Cách 2: Dùng Python HTTP Server
```powershell
cd frontend
python -m http.server 3000
```
Truy cập: http://localhost:3000

### Cách 3: Mở file trực tiếp
```powershell
start frontend\index.html
```

## Tính năng

### ✅ Đã hoàn thành
- Trang chủ công khai với thông tin tài chính
- Trang đăng nhập
- API service layer
- Responsive design

### 🚧 Đang phát triển
- Admin Dashboard
- Quản lý Quỹ Thu
- Quản lý Chi Tiêu
- Kết nối API thực tế với Laravel

## Kết nối với Backend

Frontend này thiết kế để kết nối với Laravel backend qua REST API.

**API Base URL:** `http://localhost:8000/api`

Xem file `js/api.js` để biết thêm chi tiết về API service.

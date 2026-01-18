# 📁 Cấu Trúc Thư Mục Dự Án

## Tổng quan cấu trúc

```
quylop/
├── backend/              → Laravel application (code chính)
├── frontend/             → Giao diện người dùng tách biệt
├── database/             → Database backups và seeds
│   └── backups/         → File SQL backup
├── docs/                 → Tài liệu dự án
├── scripts/              → Batch scripts tiện ích
├── composer.phar         → Composer tool (local)
├── .gitignore           → Git ignore rules
└── README.md             → Tài liệu chính
```

---

## Chi tiết từng thư mục

### 📂 `backend/`
Thư mục chính chứa toàn bộ mã nguồn Laravel:

```
backend/
├── app/                  → Models, Controllers, Middleware
│   ├── Http/
│   │   └── Controllers/ → AuthController, DashboardController, FundController...
│   └── Models/          → User.php
├── config/              → Configuration files
├── database/            → Migrations, seeders, factories
│   ├── migrations/      → Database schema
│   └── seeders/        → Data seeders
├── public/              → Public assets (CSS, JS, images)
├── resources/           → Views, raw CSS/JS
│   └── views/          → Blade templates
├── routes/              → Route definitions
│   └── web.php         → Web routes
├── storage/             → Logs, cache, uploads
├── .env                → Environment configuration
└── artisan             → Laravel CLI tool
```

### 📂 `frontend/`
Giao diện người dùng tách biệt:

```
frontend/
├── index.html           → Trang chủ công khai (Public Landing Page)
├── pages/               → Các trang chức năng (Login, Dashboard, Funds, Expenses, Members)
├── js/                  → Logic xử lý API và UI (main.js, api.js, dashboard.js...)
├── css/                 → Styles tùy chỉnh (style.css)
└── README.md            → Hướng dẫn cài đặt frontend
```

### 📂 `database/`
Chứa database backups và file SQL:

```
database/
├── backups/             → Thư mục lưu file backup
│   └── *.sql           → File SQL backups
└── README.md            → Hướng dẫn backup/restore
```

**Quy tắc:**
- File backup tự động có tên: `quylop_backup_YYYY-MM-DD_HHMM.sql`
- Luôn giữ ít nhất 1 file backup gần nhất
- File backup **KHÔNG** được commit vào git

### 📂 `docs/`
Tài liệu dự án tập trung:

```
docs/
├── README.md            → Copy từ README gốc
├── DEVELOPMENT_LOG.md   → Nhật ký phát triển
├── STRUCTURE.md         → File này - giải thích cấu trúc
├── DATABASE_SCHEMA.md   → Tài liệu chi tiết các bảng SQL
└── HANDOVER.md          → Tài liệu bàn giao dự án
```

### 📂 `scripts/`
Batch scripts tiện ích:

```
scripts/
├── start-server.bat        → Khởi động Laravel dev server
├── start-frontend.bat      → Khởi động live server cho frontend
├── start-all.bat           → Khởi động đầy đủ (XAMPP + Laravel)
├── backup-database.bat     → Backup database với timestamp
├── restore-database.bat    → Restore database từ file
└── view-database.bat       → Mở phpMyAdmin
```

**Cách sử dụng:**
```powershell
# Từ thư mục gốc
.\scripts\start-server.bat

# Hoặc vào thư mục scripts
cd scripts
.\start-server.bat
```

---

## Quy tắc tổ chức

### File đặt tên
- **Batch scripts:** `kebab-case.bat` (VD: `start-server.bat`)
- **PHP files:** `PascalCase.php` cho classes (VD: `UserController.php`)
- **JS files:** `kebab-case.js` (VD: `api.js`)
- **Blade views:** `kebab-case.blade.php` (VD: `admin-dashboard.blade.php`)

### Thư mục không commit vào Git
Đã được định nghĩa trong `.gitignore`:
- `backend/vendor/` → Composer packages
- `backend/node_modules/` → NPM packages 
- `backend/.env` → Environment config (có secrets)
- `backend/storage/` → Logs, cache, uploads
- `database/backups/*.sql` → Database backups

### Các file quan trọng

| File | Mục đích |
|------|----------|
| `README.md` | Tài liệu chính cho GitHub |
| `backend/.env` | Cấu hình database, app key |
| `backend/routes/api.php` | Định nghĩa endpoints API |
| `frontend/js/api.js` | Lớp giao tiếp API cho Frontend |

---

## Workflow phát triển

### 1. Khởi động dự án
```powershell
# Bước 1: Start MySQL trong XAMPP
# Bước 2: Chạy server
.\scripts\start-all.bat
```

### 2. Làm việc với database
```powershell
# Backup trước khi thay đổi
.\scripts\backup-database.bat

# Xem database
.\scripts\view-database.bat

# Restore nếu có sự cố
.\scripts\restore-database.bat
```

---

Cấu trúc này giúp dự án gọn gàng, dễ bảo trì và mở rộng! 🎯

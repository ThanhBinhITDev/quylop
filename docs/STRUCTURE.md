# 📁 Cấu Trúc Thư Mục Dự Án

## Tổng quan cấu trúc

```
quylop/
├── backend/              → Laravel application (code chính)
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
└── STRUCTURE.md         → File này - giải thích cấu trúc
```

### 📂 `scripts/`
Batch scripts tiện ích:

```
scripts/
├── start-server.bat        → Khởi động Laravel dev server
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
| `backend/routes/web.php` | Định nghĩa routes |
| `backend/composer.json` | PHP dependencies |
| `backend/package.json` | JavaScript dependencies |

---

## Workflow phát triển

### 1. Khởi động dự án
```powershell
# Bước 1: Start MySQL trong XAMPP
# Bước 2: Chạy server
.\scripts\start-server.bat
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

### 3. Code mới
```
backend/app/Http/Controllers/  → Tạo controller mới
backend/resources/views/       → Tạo view mới
backend/routes/web.php         → Thêm route
```

### 4. Commit code
```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

---

Cấu trúc này giúp dự án gọn gàng, dễ bảo trì và mở rộng! 🎯

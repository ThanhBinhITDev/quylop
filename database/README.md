# 📁 Database Backups

## Thư mục này chứa gì?

Thư mục này lưu trữ các file backup của database `quylop`.

---

## 🔧 Cách sử dụng Scripts

### Backup Database
```powershell
cd scripts
.\backup-database.bat
```

File backup sẽ được tạo với tên: `quylop_backup_YYYY-MM-DD_HHMM.sql`

### Restore Database  
```powershell
cd scripts
.\restore-database.bat
```

Script sẽ hiển thị danh sách file backup và cho phép bạn chọn.

---

## 📋 Danh sách Backups

File mặc định:
- `du_lieu_quylop.sql` - Backup ban đầu với user mẫu

---

## ⚠️ Lưu ý

- File backup **KHÔNG** được commit vào Git (đã có trong .gitignore)
- Nên backup thường xuyên trước khi thay đổi database
- Giữ ít nhất 2-3 file backup gần nhất
- File backup cũ có thể xóa để tiết kiệm dung lượng

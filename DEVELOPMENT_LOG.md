# 📔 Nhật Ký Phát Triển & Hướng Dẫn Bàn Giao (Development Log & Handover)

File này được tạo ra theo yêu cầu của bạn để ghi lại toàn bộ quá trình phát triển, hướng dẫn cài đặt và trạng thái hiện tại của dự án "Quỹ Lớp". Mục đích là để bất kỳ ai (kể cả người không chuyên kỹ thuật) tiếp nhận dự án cũng có thể hiểu và làm tiếp được ngay.

> **Lưu ý:** File này sẽ được cập nhật liên tục sau mỗi phiên làm việc quan trọng.

---

## 🚀 Trạng Thái Hiện Tại (Current Status)
**Cập nhật lần cuối:** 17/01/2026
- **Giai đoạn:** Thiết kế Cơ sở dữ liệu (Database).
- **Mã nguồn:** Đã khởi tạo Backend Laravel & Tạo cấu trúc DB.
- **Database:** Đã tạo đầy đủ các bảng chính cho hệ thống (Users, Funds, Banking...).
- **Công nghệ chính:** PHP (Laravel 8), SQL.

---

## 🛠 Hướng Dẫn Dành Cho Người Tiếp Nhận (Handover Guide)

### 1. Chuẩn bị môi trường (Windows + XAMPP)
Máy tính cần cài đặt các công cụ sau:
- **XAMPP**: [Tải tại apachefriends.org](https://www.apachefriends.org/index.html).
  - Khi cài đặt, chọn ít nhất: *Apache*, *MySQL*, *PHP*.
  - Sau khi cài, mở **XAMPP Control Panel** và bấm `Start` cho module Apache và MySQL.
- **Composer**: [Tải tại getcomposer.org](https://getcomposer.org/download/).
- **Visual Studio Code**: Để xem code.

### 2. Cách khởi động dự án (Dễ nhất)
1.  Bật **XAMPP** -> Start Apache & MySQL.
2.  Ra ngoài thư mục dự án, tìm file **`CHAY_WEB_NGAY.bat`**.
3.  Click đúp vào nó. Một cửa sổ đen sẽ hiện lên báo server đang chạy.
4.  Mở trình duyệt vào: `http://localhost:8000`.

### 3. Cấu trúc Database (Mới cập nhật)
Dự án hiện tại đã có các bảng sau:
- `users`: Lưu thông tin thành viên (Mã SV, SĐT, Role...).
- `bank_accounts`: Cấu hình tài khoản ngân hàng nhận tiền.
- `bank_transactions`: Lưu lịch sử tiền banking vào.
- `funds`: Các khoản thu (Hỗ trợ tạo theo Tuần/Tháng).
- `fund_contributions`: Theo dõi ai đã đóng tiền quỹ nào.
- `expenses`: Quản lý chi tiêu (Có ảnh minh chứng).
- `todos`: Quản lý công việc lớp.

---

## 📝 Lịch Sử Thay Đổi (Change Log)

### 📅 Phiên làm việc: 17/01/2026
**Người thực hiện:** AI Assistant
**Mục tiêu:** Thiết lập quy trình làm việc và tài liệu hóa dự án.

**Chi tiết công việc:**
1.  **Khởi tạo tài liệu & Môi trường:**
    - Tạo `DEVELOPMENT_LOG.md` và `CHAY_WEB_NGAY.bat`.
    - Cài đặt Laravel 8 và kết nối MySQL thành công.
2.  **Thiết kế Database (V2):**
    - Đã tạo Migration `create_structure_tables`.
    - Thêm bảng `bank_accounts` và `bank_transactions` hỗ trợ thanh toán tự động qua VietQR.
    - Cập nhật bảng `users` thêm Mã SV, SĐT.
    - Tạo bảng `funds` hỗ trợ loại quỹ theo Tuần.
    - Chạy Migration thành công -> Database đã sẵn sàng sử dụng.

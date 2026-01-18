# 📄 TÀI LIỆU BÀN GIAO DỰ ÁN (PROJECT HANDOVER)
**Dự án:** Quỹ Lớp - Hệ thống quản lý tài chính và công việc lớp học
**Ngày cập nhật:** 18/01/2026
**Trạng thái:** Hoàn thiện bộ khung (Scaffold), API Core và Frontend cơ bản.

---

## 1. TỔNG QUAN DỰ ÁN
Dự án được xây dựng nhằm giải quyết vấn đề minh bạch tài chính trong lớp học, cho phép cán sự lớp (Admin) quản lý các khoản thu và chi tiêu, đồng thời cho phép thành viên (Học sinh) theo dõi số dư và các hoạt động của quỹ một cách công khai.

## 2. KIẾN TRÚC HỆ THỐNG
Dự án được tách biệt thành 2 phần chính (Decoupled Architecture) kết nối qua REST API:

### 2.1 Backend (Laravel 8 API)
- **Thư mục:** `/backend`
- **Nhiệm vụ:** Xử lý logic nghiệp vụ, quản lý database và cung cấp API.
- **Xác thực:** Sử dụng Laravel Sanctum (Token-based Authentication).
- **Phân quyền:** Admin (Quản trị viên) và User (Sinh viên).

### 2.2 Frontend (HTML5 / Tailwind CSS / Vanilla JS)
- **Thư mục:** `/frontend`
- **Nhiệm vụ:** Giao diện người dùng, gọi API và hiển thị dữ liệu.
- **Styling:** Tailwind CSS (qua CDN để đơn giản hóa quá trình setup).
- **Logic:** Vanilla JavaScript (không dùng framework phức tạp để dễ bảo trì).

---

## 3. CẤU TRÚC THƯ MỤC CHI TIẾT
Dự án được tổ chức lại để cực kỳ chuyên nghiệp và dễ quản lý:

```
quylop/
├── backend/              # Mã nguồn Laravel (PHP)
│   ├── app/Http/Controllers/Api/  # Chứa các Controller xử lý API mới tạo
│   ├── routes/api.php    # Định nghĩa các endpoints cho Frontend
│   └── .env              # Cấu hình Database & App Key
├── frontend/             # Giao diện người dùng (HTML/JS)
│   ├── index.html        # Trang chủ công khai (Landing Page)
│   ├── pages/            # Các trang chức năng (Login, Dashboard, Funds)
│   ├── js/               # Logic xử lý API và UI (main.js, api.js, dashboard.js...)
│   └── css/              # Styles tùy chỉnh
├── database/             # Quản lý Database
│   └── backups/         # Chứa các file SQL backup công việc hàng ngày
├── docs/                 # Tài liệu hướng dẫn & Nhật ký phát triển
└── scripts/              # Các file batch (.bat) để chạy dự án nhanh
```

---

## 4. CÁC CÔNG VIỆC ĐÃ HOÀN THÀNH (CHI TIẾT)

### 🚀 Giai đoạn 1: Môi trường & Database
1.  **Thiết lập XAMPP:** Cấu hình PHP 8.2 và MySQL.
2.  **Import Database:** Sử dụng file `du_lieu_quylop.sql` để khởi tạo 8 bảng chính (`users`, `funds`, `expenses`, `bank_transactions`...).
3.  **Tạo tài khoản Admin:**
    *   Mã SV/Email: `thanhbinhit`
    *   Mật khẩu: `taolaconma` (Sử dụng Seeder để hash Bcrypt chuẩn Laravel).

### 🛠 Giai đoạn 2: Backend API Development
1.  **AuthController:** Xử lý Login/Logout, trả về `access_token` qua Sanctum.
2.  **PublicController:** API `/api/dashboard` cung cấp dữ liệu tổng quát cho trang chủ.
3.  **FundController (API):** 
    *   `createWeekly()`: Tự động tạo quỹ 10k mỗi tuần.
    *   `getPublicStudents()`: **Endpoint công khai** để sinh viên xem danh sách đóng tiền mà không cần login.
    *   `contribute()`: Xác nhận đóng tiền. **Đặc biệt:** Tự động tạo bản ghi trong `bank_transactions` để cộng dồn vào số dư tổng khi Admin xác nhận.
4.  **CORS Fix:** Cấu hình `config/cors.php` cho phép Frontend gọi API.

### 🍱 Giai đoạn 3: Frontend Development
1.  **Trang chủ (index.html):** 
    *   Hiển thị thẻ số dư.
    *   **Modal Kiểm tra & Thanh toán:** Khi sinh viên nhấn vào một quỹ, sẽ hiện danh sách chi tiết và **Hướng dẫn thanh toán Online (QR/Chuyển khoản)**.
2.  **Dashboard Admin:** 
    *   Sidebar điều hướng chuyên nghiệp.
3.  **Quản lý Thu Quỹ (10k/Tuần):** 
    *   Xác nhận sinh viên đã đóng (tiền mặt hoặc chuyển khoản) và hệ thống sẽ tự nhảy số dư.
4.  **API Service Layer (js/api.js):** Một Class chuyên biệt để xử lý tất cả các yêu cầu Fetch API, tự động đính kèm Token và xử lý lỗi.

### 📂 Giai đoạn 4: Tổ chức & Tối ưu
1.  **Scripting:** Tạo file `start-server.bat`, `start-frontend.bat`, `backup-database.bat` để người mới vào chỉ cần 1 click là chạy được.
2.  **Documentation:** Viết `STRUCTURE.md` để giải thích cách đặt tên file và workflow.

---

## 5. HƯỚNG DẪN DÀNH CHO NGƯỜI TIẾP QUẢN

### Cách chạy dự án:
1.  Bật **MySQL** trong XAMPP.
2.  Chạy Backend: `\scripts\start-server.bat` (Chạy ở cổng 8000).
3.  Chạy Frontend: `\scripts\start-frontend.bat` (Hoặc mở trực tiếp file `frontend/index.html`).

### Các thông tin cần nhớ:
*   **API Base URL:** `http://localhost:8000/api`
*   **Credentials:** `thanhbinhit` / `taolaconma`
*   **Database:** Tên db là `quylop`, user `root`, pass trống.

### Những việc cần làm tiếp theo (To-do):
1.  **Quản lý Chi tiêu:** Viết API và giao diện cho phần `expenses` để Admin có thể trừ tiền quỹ khi có hoạt động lớp.
2.  **Upload Hóa đơn:** Tích hợp chức năng upload ảnh minh chứng cho mỗi khoản chi.
3.  **Danh sách Thành viên:** CRUD cho bảng `users` để thêm sinh viên mới vào lớp.
4.  **Export báo cáo:** Xuất file Excel tổng kết quỹ hàng tháng.

---
*Tài liệu này được soạn thảo bởi trợ lý AI Antigravity, sẵn sàng cho bất kỳ lập trình viên nào muốn tiếp nối sứ mệnh minh bạch tài chính lớp học.* 🎯

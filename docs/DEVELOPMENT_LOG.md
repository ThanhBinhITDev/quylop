# 📔 Nhật Ký Phát Triển & Hướng Dẫn Bàn Giao (Development Log & Handover)

File này được tạo ra theo yêu cầu của bạn để ghi lại toàn bộ quá trình phát triển, hướng dẫn cài đặt và trạng thái hiện tại của dự án "Quỹ Lớp".

---

## 🚀 Trạng Thái Hiện Tại (Current Status)
**Cập nhật lần cuối:** 17/01/2026
- **Giai đoạn:** Đã hoàn thiện Giao diện Admin & Public Dashboard.
- **Tính năng mới:** Phân tách 2 vùng giao diện riêng biệt.
    - **Trang Công Khai (`/`):** Hiển thị minh bạch số tiền, khoản thu, chi, người đóng tiền... Ai cũng xem được.
    - **Trang Quản Trị (`/admin/dashboard`):** Dành cho Admin quản lý, nhập liệu.

---

## 🛠 Hướng Dẫn Sử Dụng Nhanh

### 1. Xem báo cáo (Dành cho Thành Viên)
- Mở trang chủ: `http://localhost:8000`.
- Xem được ngay: Số dư hiện tại, tổng thu/chi, danh sách ai vừa đóng tiền... (Không cần đăng nhập).

### 2. Quản lý (Dành cho Lớp Trưởng)
- Tại trang chủ -> Bấm nút **"Đăng nhập Admin"** ở góc phải trên.
- Đăng nhập: `admin` / `123456`.
- Sẽ vào được Trang Dashboard quản trị để thêm Quỹ, duyệt tiền...

---

## 📝 Lịch Sử Thay Đổi (Change Log)

### 📅 Phiên làm việc: 17/01/2026
**Người thực hiện:** AI Assistant

**1. Database & Auth:**
- Hoàn thành Database (Users, Funds, Banking...).
- Hoàn thành Đăng nhập.

**2. Giao diện (Frontend):**
- **Public Dashboard:** Thiết kế trang chủ hiện đại, hiển thị trực quan số liệu tài chính để minh bạch hoá.
- **Admin Dashboard:** Thiết kế Layout quản trị riêng kèm Sidebar chức năng.
- **Auth:** Form Login đẹp mắt.

---

### 📅 Phiên làm việc: 18/01/2026
**Người thực hiện:** Antigravity (AI Assistant)

**1. Tính năng Quản lý Đóng tiền (UX Update):**
- **Toggle Switches:** Thay thế nút xác nhận đóng tiền bằng nút gạt (Switch) kiểu iOS. Hỗ trợ bật/tắt trạng thái đóng tiền 2 chiều.
- **Auto-Sync Balance:** Khi gạt nút, hệ thống tự động cộng/trừ số dư tổng và tạo/xoá giao dịch tương ứng để đảm bảo tính minh bạch.
- **Payment History:** Thêm Modal xem lịch sử đóng tiền chi tiết cho từng thành viên.

**2. Tối ưu hóa Frontend (Refactoring):**
- **Componentization:** Băm nhỏ trang chủ thành các component (`Header`, `Hero`, `Stats`, `Footer`...).
- **Premium Animations:** Thêm hiệu ứng `Fade-in Up`, `Skeleton Loading` và `Scale Animation` cho Modal.

**3. Lỗi & Cách khắc phục (Issue Log):**
- **Lỗi:** "Lỗi khi tải thành phần" (CORS/Fetch error) khi mở file trực tiếp bằng giao thức `file://`.
- **Nguyên nhân:** Trình duyệt bảo mật chặn `fetch()` file cục bộ.
- **Cách Fix:** Chuyển toàn bộ mã nguồn HTML của các component vào file JavaScript trung tâm `js/components.js`. Sử dụng biến `window.CLASS_FUND_COMPONENTS` để nạp trực tiếp mà không cần dùng `fetch()`. Kết quả: Trang web chạy mượt mà ngay cả khi mở file thủ công từ ổ cứng.

**4. Tính năng QR Cá nhân (Personalized QR):**
- **Mã QR định danh:** Mỗi sinh viên giờ đây có một mã QR riêng biệt. Khi bấm vào tên hoặc biểu tượng QR trong danh sách, một Popup sẽ hiện ra.
- **Tự động điền nội dung:** Mã QR được tích hợp VietQR, tự động điền số tài khoản Admin và nội dung chuyển khoản theo cấu trúc: `DONGQUY [Mã SV]`.
- **Hỗ trợ In ấn:** Thêm tính năng "In Mã QR" để tạo bản in đẹp mắt, giúp sinh viên có thể dán vào thẻ hoặc bàn học để đóng tiền nhanh.

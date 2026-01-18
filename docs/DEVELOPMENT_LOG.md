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

# 🏗️ Kiến trúc Cơ sở dữ liệu (Database Schema) - Dự án Quỹ Lớp

Tài liệu này giải thích chi tiết về các bảng, thuộc tính và chức năng của từng thành phần trong database của hệ thống quản lý Quỹ Lớp.

---

## 1. Bảng `users` (Thành viên)
Lưu trữ thông tin của tất cả người dùng trong hệ thống (bao gồm Admin và Sinh viên).

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh duy nhất cho mỗi tài khoản. |
| `name` | varchar | Họ và tên đầy đủ của thành viên. |
| `student_code`| varchar (Unique)| Mã sinh viên (Dùng để đăng nhập). |
| `email` | varchar (Unique)| Địa chỉ email cá nhân. |
| `phone` | varchar | Số điện thoại liên lạc. |
| `password` | varchar | Mật khẩu (đã mã hóa Bcrypt). Mặc định là Mã SV. |
| `role` | varchar | Vai trò: `admin` (quản trị) hoặc `student` (thành viên). |
| `avatar_url` | varchar | Đường dẫn ảnh đại diện (nếu có). |
| `created_at` | timestamp | Thời điểm tài khoản được tạo. |

---

## 2. Bảng `funds` (Danh mục Quỹ thu)
Lưu trữ thông tin về các đợt thu quỹ (ví dụ: Quỹ tuần 1, Quỹ đi chơi...).

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh quỹ. |
| `title` | varchar | Tiêu đề đợt thu (VD: Quỹ tuần 03/2026). |
| `amount` | decimal | Số tiền cần đóng cho mỗi người (VD: 10,000). |
| `description` | text | Mô tả chi tiết đợt thu. |
| `type` | varchar | Loại quỹ: `weekly` (hàng tuần) hoặc `event` (sự kiện). |
| `deadline` | datetime | Hạn cuối cùng phải đóng tiền. |

---

## 3. Bảng `fund_contributions` (Chi tiết Đóng tiền)
Lưu trạng thái đóng tiền của từng sinh viên đối với từng quỹ cụ thể.

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh bản ghi đóng tiền. |
| `user_id` | bigint (FK) | Liên kết với ID của sinh viên (`users.id`). |
| `fund_id` | bigint (FK) | Liên kết với ID của đợt thu quỹ (`funds.id`). |
| `amount` | decimal | Số tiền sinh viên đã đóng thực tế. |
| `status` | varchar | Trạng thái: `unpaid` (chưa đóng) hoặc `paid` (đã đóng). |
| `paid_at` | datetime | Thời điểm sinh viên thực hiện đóng tiền. |
| `bank_transaction_id` | bigint | (Tùy chọn) Liên kết với giao dịch ngân hàng thực tế. |

---

## 4. Bảng `expenses` (Quản lý Chi tiêu)
Lưu trữ thông tin về các khoản tiền đã được chi ra từ quỹ lớp.

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh khoản chi. |
| `title` | varchar | Tiêu đề khoản chi (VD: In tài liệu, Mua nước...). |
| `amount` | decimal | Tổng số tiền đã chi (số tiền dương trong bảng này). |
| `description` | text | Mô tả lý do chi tiêu. |
| `proof_image` | varchar | Link ảnh chụp hóa đơn/minh chứng chi tiêu. |
| `expense_date` | datetime | Ngày thực tế thực hiện chi tiền. |
| `created_by` | bigint (FK) | ID của Admin thực hiện ghi nhận khoản chi này. |

---

## 5. Bảng `bank_transactions` (Lịch sử Giao dịch)
Đây là bảng quan trọng nhất để tính toán **Số dư thực tế**. Nó ghi lại mọi biến động dòng tiền (Thu/Chi).

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh giao dịch. |
| `transaction_code`| varchar (Unique)| Mã định danh (VD: THUQUY_1_2, CHIQUY_101). |
| `amount` | decimal | **Giá trị:** Dương (+10k) nếu là Thu, Âm (-20k) nếu là Chi. |
| `description` | varchar | Nội dung giao dịch hiển thị trên trang chủ. |
| `transaction_date`| datetime | Ngày giao dịch diễn ra. |
| `user_id` | bigint (FK) | Người liên quan đến giao dịch (người đóng hoặc người chi). |
| `status` | varchar | `pending` (chờ) hoặc `processed` (đã xử lý/thành công). |

---

## 6. Bảng `bank_accounts` (Tài khoản nhận tiền)
Lưu thông tin ngân hàng của Admin để hiện mã QR thanh toán.

| Thuộc tính | Kiểu dữ liệu | Chức năng |
| :--- | :--- | :--- |
| `id` | bigint (PK) | Định danh tài khoản. |
| `bank_name` | varchar | Tên ngân hàng (VD: MB Bank). |
| `account_number` | varchar | Số tài khoản. |
| `account_name` | varchar | Tên chủ tài khoản (In hoa không dấu). |
| `bin` | varchar | Mã định danh ngân hàng (Dùng cho VietQR). |
| `is_active` | boolean | Tài khoản đang được sử dụng chính hay không. |

---

### 💡 Ghi chú về luồng dữ liệu Tài chính:
- **Khi Admin xác nhận một sinh viên đã đóng tiền:** Hệ thống tạo một bản ghi `processed` trong `bank_transactions` với `amount` > 0.
- **Khi Admin ghi nhận một khoản chi mới:** Hệ thống tạo một bản ghi `processed` trong `bank_transactions` với `amount` < 0.
- **Số dư hiện tại** = `SUM(amount)` của tất cả giao dịch có trạng thái `processed` trong bảng `bank_transactions`.

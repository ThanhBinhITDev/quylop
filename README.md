# 🎓 Class Management System (Fund & Todo)

> Một hệ thống quản lý "quyền lực" dành cho cán sự lớp giúp minh bạch hóa quỹ lớp và quản lý công việc hiệu quả.

## 🌟 Tổng quan dự án
Dự án được tạo ra để giải quyết nỗi lo của các bạn lớp trưởng/thủ quỹ về việc:
- Quên ai đã đóng tiền quỹ.
- Thất lạc hóa đơn chi tiêu.
- Quên các deadline quan trọng của lớp.

## 🚀 Tính năng chính

### 💰 Quản lý Quỹ Lớp (Finance Management)
- **Theo dõi đóng quỹ:** Tự động liệt kê danh sách đóng quỹ theo từng tuần/tháng.
- **Lịch sử Thu - Chi:** Ghi chép chi tiết mọi biến động tiền tệ.
- **Minh bạch hóa đơn:** Hỗ trợ lưu trữ hình ảnh minh chứng khi chi tiêu.
- **Tổng kết số dư:** Dashboard nhảy số tức thời, không cần cộng tay.

### ✅ Quản lý Todo List (Task Management)
- **Lên kế hoạch:** Tạo các công việc cần thực hiện (ví dụ: Chuẩn bị văn nghệ, Thu bài tập...).
- **Phân loại ưu tiên:** Gắn nhãn mức độ quan trọng (Cao/Trung bình/Thấp).
- **Trạng thái công việc:** Theo dõi tiến độ từ lúc bắt đầu đến khi hoàn thành.

## 🛠 Công nghệ sử dụng
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (NoSQL Cloud).
- **Giao diện:** HTML5, CSS3 (Tailwind CSS), JavaScript ES6.
- **Sơ đồ:** Mermaid.js & DBML.

## 🗄 Cấu trúc Cơ sở dữ liệu (ERD)
Dự án được thiết kế với cấu trúc dữ liệu chặt chẽ bao gồm:
- `Students`: Thông tin học sinh.
- `FeeTracking`: Trạng thái đóng tiền theo tuần.
- `Transactions`: Nhật ký thu chi.
- `Todos`: Danh sách việc cần làm.
- `Admins`: Phân quyền quản trị.

## ⚙️ Cài đặt và Chạy dự án
1. **Clone dự án:**
   ```bash
   git clone https://github.com/ThanhBinhITDev/quylop.git

# Thiệp 20/10 dành cho một người bạn

Website tĩnh, mobile-first, không cần cài dependency hoặc chạy build. Cấu trúc đã được chuẩn bị để triển khai trực tiếp bằng GitHub Pages.

## Chạy trên máy

Mở terminal tại thư mục dự án và chạy:

```powershell
python -m http.server 4173
```

Sau đó mở `http://localhost:4173`.

## Triển khai bằng GitHub Pages

1. Mở repository trên GitHub.
2. Chọn **Settings → Pages**.
3. Trong **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn nhánh **main**, thư mục **/(root)** rồi nhấn **Save**.

Website sẽ được xuất bản tại:

`https://mumeilevina.github.io/20-10/`

## Thay background chuyển động

Thay `assets/floral-sky-motion.mp4` bằng video khác cùng tên. Video nên ngắn, lặp mượt, không có âm thanh và có chủ thể nằm quanh rìa để chữ dễ đọc.

`assets/floral-sky-original.jpg` là poster dự phòng khi video chưa tải hoặc khi người dùng bật chế độ giảm chuyển động.

## Cấu trúc dự án

```text
20-10/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── assets/
│   ├── floral-sky-motion.mp4
│   └── floral-sky-original.jpg
└── README.md
```

# Thiệp 20/10 dành cho một người bạn

Một website tĩnh, mobile-first, không cần cài dependency hay chạy build.

## Chạy dự án

Mở terminal tại thư mục dự án và chạy một trong các lệnh:

```powershell
npx serve dist
```

hoặc:

```powershell
python -m http.server 4173 -d dist
```

Sau đó mở địa chỉ được in ra trong terminal. Có thể deploy trực tiếp thư mục `dist` lên Vercel, Netlify hoặc GitHub Pages.

## Thay background chuyển động

Thay file `dist/assets/floral-sky-motion.mp4` bằng video khác cùng tên. Video nên ngắn, lặp mượt, không có âm thanh và có chủ thể nằm quanh rìa để chữ dễ đọc.

File `dist/assets/floral-sky-original.jpg` là poster dự phòng khi video chưa tải hoặc trình duyệt bật chế độ giảm chuyển động.

## Cấu trúc

- `dist/index.html`: nội dung và cấu trúc các cảnh.
- `dist/styles.css`: art direction, responsive layout, animation và reduced-motion.
- `dist/script.js`: luồng mở quà, các tương tác, letter reveal và canvas petals.
- `dist/assets/floral-sky-motion.mp4`: background chuyển động local từ Pin do người dùng cung cấp.
- `dist/assets/floral-sky-original.jpg`: poster và fallback của background.

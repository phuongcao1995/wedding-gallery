#!/usr/bin/env python3
"""
Tạo ảnh nhẹ (WebP) từ ảnh gốc trong assets/images/ để web tải nhanh.

    pip install pillow
    python tools/optimize_images.py

Kết quả (ảnh gốc không bị thay đổi):
    assets/img/s/<tên>.webp      rộng 720px   (ô ảnh trên điện thoại)
    assets/img/m/<tên>.webp      rộng 1280px  (ô ảnh trên máy tính, ảnh đầu chương)
    assets/img/l/<tên>.webp      cạnh dài 2200px (xem toàn màn hình)
    assets/img/hero-1200.webp, hero-2200.webp   ảnh mở đầu
    assets/og.jpg                ảnh chia sẻ mạng xã hội (1200x630)

Khi thêm ảnh mới, chạy lại lệnh trên. Chỉ cần đưa thư mục assets/img/ lên host
(thư mục assets/images/ chứa ảnh gốc nặng, không cần đưa lên).
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "images"
OUT = ROOT / "assets" / "img"
LONG_EDGE = 2200
QUALITY = 78

# Ảnh mở đầu và vị trí cắt cho ảnh chia sẻ (tỉ lệ 0..1 theo chiều dọc của ảnh gốc)
HERO = "DSC_2931.JPG"
OG_FOCUS_Y = 0.30


def save_webp(im, path, quality=QUALITY):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)


def fit_width(im, width):
    if im.width <= width:
        return im.copy()
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in (".jpg", ".jpeg", ".png"))
    if not files:
        sys.exit(f"Không thấy ảnh trong {SRC}")
    sizes = {}
    for p in files:
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        sizes[p.name] = [im.width, im.height]
        stem = p.stem
        save_webp(fit_width(im, 720), OUT / "s" / f"{stem}.webp")
        save_webp(fit_width(im, 1280), OUT / "m" / f"{stem}.webp")
        scale = LONG_EDGE / max(im.size)
        large = im if scale >= 1 else im.resize(
            (round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        save_webp(large, OUT / "l" / f"{stem}.webp", quality=82)

        if p.name == HERO:
            save_webp(fit_width(im, 1200), OUT / "hero-1200.webp", quality=76)
            save_webp(fit_width(im, 2200), OUT / "hero-2200.webp", quality=78)
            w, h = im.size
            ch = round(w * 630 / 1200)
            top = max(0, min(h - ch, round(h * OG_FOCUS_Y - ch / 2)))
            og = im.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS)
            og.save(ROOT / "assets" / "og.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        print("ok", p.name)

    (OUT / "sizes.json").write_text(json.dumps(sizes, indent=1), encoding="utf-8")
    print(f"Xong {len(files)} ảnh -> {OUT}")


if __name__ == "__main__":
    main()

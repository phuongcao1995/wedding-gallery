#!/usr/bin/env python3
"""
Điền tên miền thật vào thẻ SEO / chia sẻ (canonical, og:url, og:image, sitemap, robots).

    python tools/set_site_url.py https://ten-mien-cua-ban.com

Facebook, Zalo, Messenger... cần đường dẫn ảnh đầy đủ (có tên miền) mới hiện ảnh xem trước.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = ["index.html", "sitemap.xml", "robots.txt"]


def main():
    if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
        sys.exit("Cách dùng: python tools/set_site_url.py https://ten-mien-cua-ban.com")
    base = sys.argv[1].rstrip("/")
    for name in FILES:
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        text = text.replace("https://YOUR-DOMAIN", base)
        path.write_text(text, encoding="utf-8")
        print("da cap nhat", name)


if __name__ == "__main__":
    main()

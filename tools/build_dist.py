#!/usr/bin/env python3
"""Tạo thư mục dist/ chỉ gồm các file cần đưa lên host (không có ảnh gốc nặng)."""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in ["index.html", "style.css", "script.js", "robots.txt", "sitemap.xml", "_headers"]:
    shutil.copy2(ROOT / name, DIST / name)
(DIST / "assets").mkdir()
for name in ["img", "favicon.svg", "apple-touch-icon.png", "og.jpg"]:
    src = ROOT / "assets" / name
    if src.is_dir():
        shutil.copytree(src, DIST / "assets" / name)
    else:
        shutil.copy2(src, DIST / "assets" / name)
size = sum(f.stat().st_size for f in DIST.rglob("*") if f.is_file()) / 1024 / 1024
print(f"Da tao {DIST} ({size:.1f} MB)")

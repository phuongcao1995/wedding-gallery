#!/usr/bin/env python3
"""
List the photos in assets/images/ as ready-to-paste lines for script.js,
with each photo's real width and height (camera rotation included).

Usage (from the project folder):
    python3 tools/list_images.py
    python3 tools/list_images.py --chapters 5     # split into 5 groups

No extra packages needed. Works with JPG, JPEG, PNG and WebP.
"""
import argparse
import os
import struct
import sys

FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "images")
EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp")


def exif_orientation(tiff):
    try:
        endian = "<" if tiff[:2] == b"II" else ">"
        offset = struct.unpack(endian + "I", tiff[4:8])[0]
        count = struct.unpack(endian + "H", tiff[offset:offset + 2])[0]
        for i in range(count):
            entry = offset + 2 + i * 12
            tag = struct.unpack(endian + "H", tiff[entry:entry + 2])[0]
            if tag == 0x0112:
                return struct.unpack(endian + "H", tiff[entry + 8:entry + 10])[0]
    except (struct.error, IndexError):
        pass
    return 1


def jpeg_size(f):
    f.seek(2)
    orientation = 1
    sof_markers = {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}
    while True:
        byte = f.read(1)
        while byte and byte != b"\xff":
            byte = f.read(1)
        while byte == b"\xff":
            byte = f.read(1)
        if not byte:
            return None
        marker = byte[0]
        if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:
            continue
        if marker in (0xD9, 0xDA):
            return None
        length = struct.unpack(">H", f.read(2))[0]
        data = f.read(length - 2)
        if marker == 0xE1 and data[:6] == b"Exif\x00\x00":
            orientation = exif_orientation(data[6:])
        elif marker in sof_markers:
            height, width = struct.unpack(">HH", data[1:5])
            if orientation in (5, 6, 7, 8):  # photo is stored sideways
                width, height = height, width
            return width, height


def png_size(f):
    head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", head[16:24])


def webp_size(f):
    head = f.read(30)
    if head[:4] != b"RIFF" or head[8:12] != b"WEBP":
        return None
    kind = head[12:16]
    if kind == b"VP8 ":
        w, h = struct.unpack("<HH", head[26:30])
        return w & 0x3FFF, h & 0x3FFF
    if kind == b"VP8L":
        bits = struct.unpack("<I", head[21:25])[0]
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    if kind == b"VP8X":
        w = int.from_bytes(head[24:27], "little") + 1
        h = int.from_bytes(head[27:30], "little") + 1
        return w, h
    return None


def image_size(path):
    ext = os.path.splitext(path)[1].lower()
    with open(path, "rb") as f:
        if ext in (".jpg", ".jpeg"):
            return jpeg_size(f)
        if ext == ".png":
            return png_size(f)
        if ext == ".webp":
            return webp_size(f)
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--chapters", type=int, default=1, help="split the list into this many groups")
    args = parser.parse_args()

    folder = os.path.normpath(FOLDER)
    if not os.path.isdir(folder):
        sys.exit(f"Folder not found: {folder}")

    files = sorted(n for n in os.listdir(folder) if n.lower().endswith(EXTENSIONS) and not n.startswith("."))
    if not files:
        sys.exit(f"No photos found in {folder}. Add JPG, PNG or WebP files and run this again.")

    lines = []
    for name in files:
        try:
            size = image_size(os.path.join(folder, name))
        except (OSError, struct.error):
            size = None
        if size:
            lines.append(f'        {{ src: "{name}", alt: "", w: {size[0]}, h: {size[1]} }},')
        else:
            lines.append(f'        {{ src: "{name}", alt: "" }},  // size unknown; the page will measure it')

    groups = max(1, min(args.chapters, len(lines)))
    per = -(-len(lines) // groups)
    for g in range(groups):
        chunk = lines[g * per:(g + 1) * per]
        if not chunk:
            continue
        if groups > 1:
            print(f"      // Chapter {g + 1}")
        print("\n".join(chunk))
        if groups > 1:
            print()

    print(f"// {len(files)} photos found. Write a short description in each alt for screen readers.", file=sys.stderr)


if __name__ == "__main__":
    main()

/* =========================================================
   Wedding album · script.js
   ---------------------------------------------------------
   Everything you need to edit is in the WEDDING object below.
   - Photos live in assets/images/.
   - Each chapter's FIRST photo is shown large beside the
     chapter title; the rest fill the gallery underneath.
   - w and h are the photo's pixel width and height. They let
     the page reserve the right space before a photo loads.
     Run tools/list_images.py to get them automatically.
     If they're missing or wrong, the page still corrects the
     shape once the photo has loaded.
   - Reorder photos by moving lines. Remove a photo by deleting
     its line. Empty chapters are skipped.
   ========================================================= */

const WEDDING = {
  partnerOne: "Ngọc Phương",
  partnerTwo: "Nhật Hạ",
  monogram: "P & H",
  subtitle: "Album cưới",
  date: "5 tháng 7, 2025",       // hiển thị trên trang
  dateISO: "2025-07-05",         // dạng máy đọc của cùng ngày

  imageFolder: "assets/images/",      // ảnh gốc
  optimizedFolder: "assets/img/",     // ảnh nhẹ (WebP) tạo bởi tools/optimize_images.py; để trống nếu không dùng

  // Ảnh mở đầu. Giữ khớp với <link rel="preload"> trong index.html.
  hero: { src: "DSC_2931.JPG", alt: "Chú rể hôn lên trán cô dâu bên tháp champagne", focus: "50% 6%" },

  // Ảnh cuối trang, cạnh lời cảm ơn.
  closing: { src: "DSC_3708.JPG", alt: "Cô dâu hôn lên má chú rể", w: 3933, h: 5900 },

  // Nhạc nền (tuỳ chọn). Ví dụ: "assets/music/bai-hat.mp3". Để trống để ẩn nút nhạc.
  music: "",

  // Ảnh đầu tiên của mỗi chương được hiển thị lớn cạnh tiêu đề.
  chapters: [
    {
      title: "Vườn hoa",
      intro: "Hoa trắng, nắng nhẹ.",
      photos: [
        { src: "DSC_2931.JPG", alt: "Chú rể hôn lên trán cô dâu", w: 4024, h: 6048 },
        { src: "DSC_2964.JPG", alt: "Cô dâu chú rể nâng ly bên tháp champagne", w: 3930, h: 5895 },
        { src: "DSC_2999.JPG", alt: "Cô dâu bên tháp champagne", w: 4024, h: 6048 },
        { src: "DSC_3155.JPG", alt: "Chú rể hôn lên trán cô dâu trong studio", w: 4024, h: 6048 },
        { src: "DSC_3220.JPG", alt: "Cô dâu chú rể vẫy tay", w: 4024, h: 6048 },
        { src: "DSC_3122.JPG", alt: "Cô dâu với bó hoa cầm tay", w: 4024, h: 6048 },
        { src: "DSC_3202.JPG", alt: "Cô dâu chú rể nắm tay", w: 4024, h: 6048 },
      ],
    },
    {
      title: "Ánh sáng ấm",
      intro: "Studio tối, ánh sáng vàng.",
      photos: [
        { src: "DSC_3355.JPG", alt: "Cô dâu chú rể trán chạm trán", w: 6048, h: 4024 },
        { src: "DSC_3364.JPG", alt: "Cô dâu chú rể ôm nhau", w: 4024, h: 6048 },
        { src: "DSC_3298.JPG", alt: "Cô dâu chú rể khoác tay", w: 4024, h: 6048 },
        { src: "DSC_3318.JPG", alt: "Cô dâu chú rể đứng cạnh nhau", w: 4024, h: 6048 },
        { src: "DSC_3245.JPG", alt: "Chân dung cô dâu", w: 4024, h: 6048 },
        { src: "DSC_3253.JPG", alt: "Cô dâu với bó hoa calla", w: 4024, h: 6048 },
        { src: "DSC_3273.JPG", alt: "Cô dâu mỉm cười", w: 4024, h: 6048 },
        { src: "DSC_3384.JPG", alt: "Chú rể ngồi trên ghế cao", w: 4024, h: 6048 },
        { src: "DSC_3390.JPG", alt: "Chú rể chỉnh khuy tay áo", w: 4024, h: 6048 },
        { src: "DSC_3398.JPG", alt: "Chân dung chú rể", w: 4024, h: 6048 },
      ],
    },
    {
      title: "Sắc xanh",
      intro: "Váy trắng giữa hoa xanh nhạt.",
      photos: [
        { src: "DSC_3511.JPG", alt: "Cô dâu chú rể giữa hoa xanh", w: 6048, h: 4024 },
        { src: "DSC_3445.JPG", alt: "Cô dâu chú rể khoác tay", w: 4024, h: 6048 },
        { src: "DSC_3549.JPG", alt: "Cô dâu chú rể bên cổng vòm", w: 4024, h: 6048 },
        { src: "DSC_3573.JPG", alt: "Cô dâu chú rể nắm tay", w: 4024, h: 6048 },
        { src: "DSC_3620.JPG", alt: "Cô dâu chú rể trong phòng hoa", w: 6048, h: 4024 },
        { src: "DSC_3516.JPG", alt: "Chú rể bên cột đá", w: 4024, h: 6048 },
        { src: "DSC_3521.JPG", alt: "Chú rể dựa vào cột đá", w: 4024, h: 6048 },
      ],
    },
    {
      title: "Cổ điển",
      intro: "Cửa sổ lớn, ánh sáng dịu.",
      photos: [
        { src: "DSC_3670.JPG", alt: "Cô dâu chú rể ngồi trên ghế sofa", w: 3957, h: 5936 },
        { src: "DSC_3735.JPG", alt: "Cô dâu chú rể bên cửa sổ", w: 4024, h: 6048 },
        { src: "DSC_3660.JPG", alt: "Chú rể và cô dâu cầm voan", w: 4024, h: 6048 },
        { src: "DSC_3633.JPG", alt: "Cô dâu cầm voan trên ghế sofa", w: 4024, h: 6048 },
      ],
    },
  ],
};

/* ========================================================
   You shouldn't need to edit anything below this line.
   ======================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DEFAULT_RATIO = { w: 2, h: 3 };

  const srcOf = (file) =>
    /^(https?:)?\/\/|^\/|^assets\//.test(file) ? file : WEDDING.imageFolder + file;
  const isLocal = (file) => !/^(https?:)?\/\//.test(file) && !file.startsWith("/");
  const optUrl = (kind, file) =>
    WEDDING.optimizedFolder && isLocal(file)
      ? `${WEDDING.optimizedFolder}${kind}/${file.replace(/\.[^.]+$/, "")}.webp`
      : null;
  const LARGE_EDGE = 2200; // khớp với tools/optimize_images.py
  const largeWidth = (p) => {
    if (!p.w || !p.h) return 1467;
    const k = LARGE_EDGE / Math.max(p.w, p.h);
    return k >= 1 ? p.w : Math.round(p.w * k);
  };
  const srcsetOf = (p) => {
    const s = optUrl("s", p.src);
    if (!s) return null;
    return `${s} 720w, ${optUrl("m", p.src)} 1280w, ${optUrl("l", p.src)} ${largeWidth(p)}w`;
  };
  const ratioOf = (p) => (p.w && p.h ? p.w / p.h : DEFAULT_RATIO.w / DEFAULT_RATIO.h);
  const pad = (n) => String(n).padStart(2, "0");

  // One flat list in album order; used for numbering and the lightbox.
  const photos = [];
  WEDDING.chapters.forEach((chapter, ci) => {
    (chapter.photos || []).forEach((p) => {
      if (p && p.src) photos.push({ ...p, chapter: ci, index: photos.length });
    });
  });

  const missing = new Set();

  /* ---------- Text from the settings ---------- */

  function fillText() {
    const names = `${WEDDING.partnerOne} & ${WEDDING.partnerTwo}`;
    $$("[data-text]").forEach((el) => {
      const value = WEDDING[el.dataset.text];
      if (value) el.textContent = value;
    });
    $$("[data-names]").forEach((el) => (el.textContent = names));
    $$("[data-initials]").forEach((el) => {
      el.textContent = WEDDING.monogram || `${WEDDING.partnerOne.charAt(0)} & ${WEDDING.partnerTwo.charAt(0)}`;
    });
    $$("time[data-date]").forEach((el) => {
      el.textContent = WEDDING.date;
      if (WEDDING.dateISO) el.setAttribute("datetime", WEDDING.dateISO);
    });
  }

  /* ---------- Image loading helpers ---------- */

  // Listeners go on before src is set, so cached images are never missed.
  function loadInto(img, file, frame, photo, srcset) {
    img.addEventListener("load", () => {
      img.classList.add("is-loaded");
      if (photo && img.naturalWidth) {
        const real = img.naturalWidth / img.naturalHeight;
        if (Math.abs(real - ratioOf(photo)) > 0.01) {
          photo.w = img.naturalWidth;
          photo.h = img.naturalHeight;
          if (frame) {
            frame.style.setProperty("--ratio", `${photo.w} / ${photo.h}`);
            // A chapter's lead photo turned out to be the other orientation: switch the spread.
            const spread = frame.closest(".spread__feature") && frame.closest(".spread");
            if (spread) {
              const portrait = real < 1.15;
              spread.classList.toggle("spread--portrait", portrait);
              spread.classList.toggle("spread--landscape", !portrait);
            }
          }
          scheduleRelayout();
        }
      }
    }, { once: true });

    img.addEventListener("error", function onError() {
      // Ảnh nhẹ chưa có: thử lại một lần với ảnh gốc.
      if (srcset && !img.dataset.fallback) {
        img.dataset.fallback = "1";
        img.removeAttribute("srcset");
        img.addEventListener("error", onError, { once: true });
        img.src = srcOf(file);
        return;
      }
      if (frame) frame.classList.add("is-missing");
      img.classList.add("is-missing");
      reportMissing(file);
    }, { once: true });

    if (srcset) img.srcset = srcset;
    img.src = srcset ? optUrl("m", file) : srcOf(file);
  }

  function reportMissing(file) {
    if (missing.has(file)) return;
    missing.add(file);
    console.warn(`Wedding album: couldn't find ${srcOf(file)}. Check the file name in script.js.`);
    const note = $("#setupNote");
    const n = missing.size;
    note.textContent =
      `Không tìm thấy ${n} ảnh trong ${WEDDING.imageFolder}. ` +
      `Kiểm tra tên file trong script.js. Chạm để ẩn.`;
    note.hidden = false;
  }

  /* ---------- Hero and closing ---------- */

  function setupHero() {
    const img = $("#heroImage");
    const hero = WEDDING.hero || photos[0];
    if (!hero) return;
    img.alt = hero.alt || "";
    if (hero.focus) img.style.setProperty("--focus", hero.focus);

    // Ảnh nhẹ đã có trong index.html; nếu thiếu thì dùng ảnh gốc.
    const markMissing = () => { img.classList.add("is-missing"); reportMissing(hero.src); };
    const fallback = () => {
      if (img.dataset.fallback) return markMissing();
      img.dataset.fallback = "1";
      img.removeAttribute("srcset");
      img.src = srcOf(hero.src);
    };
    img.addEventListener("error", fallback);
    if (img.complete && img.naturalWidth === 0) fallback();
  }

  function setupClosing() {
    const c = WEDDING.closing || photos[photos.length - 1];
    const frame = $("#closingFrame");
    const img = $("#closingImage");
    if (!c) { frame.closest("figure").remove(); return; }
    frame.dataset.file = c.src;
    frame.style.setProperty("--ratio", `${c.w || DEFAULT_RATIO.w} / ${c.h || DEFAULT_RATIO.h}`);
    img.alt = c.alt || "";
    if (c.w && c.h) { img.width = c.w; img.height = c.h; }
    img.sizes = "(max-width: 820px) 92vw, 42vw";
    loadInto(img, c.src, frame, c, srcsetOf(c));
  }

  /* ---------- Gallery ---------- */

  const masonries = [];
  let columnCount = 0;

  const columnsForWidth = () => {
    const w = window.innerWidth;
    if (w >= 1100) return 3;
    if (w >= 600) return 2;
    return 1;
  };

  function makeTile(photo, sizes, eager) {
    const figure = document.createElement("figure");
    figure.className = "tile reveal";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile__btn frame";
    btn.dataset.index = photo.index;
    btn.dataset.file = photo.src;
    btn.style.setProperty("--ratio", `${photo.w || DEFAULT_RATIO.w} / ${photo.h || DEFAULT_RATIO.h}`);
    btn.setAttribute("aria-label", `Xem ảnh ${photo.index + 1} trên ${photos.length}: ${photo.alt || "ảnh cưới"}`);

    const img = document.createElement("img");
    img.alt = photo.alt || "";
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";
    img.sizes = sizes;
    if (photo.w && photo.h) { img.width = photo.w; img.height = photo.h; }
    loadInto(img, photo.src, btn, photo, srcsetOf(photo));

    btn.append(img);
    figure.append(btn);
    return figure;
  }

  function buildGallery() {
    const root = $("#gallery");
    const nav = $("#chapterList");
    const frag = document.createDocumentFragment();
    let visibleChapter = 0;

    WEDDING.chapters.forEach((chapter, ci) => {
      const list = photos.filter((p) => p.chapter === ci);
      if (!list.length) return;

      const id = `chapter-${ci + 1}`;
      const flip = visibleChapter % 2 === 1;
      const [feature, ...rest] = list;
      const portrait = ratioOf(feature) < 1.15; // square photos use the narrower layout too

      const section = document.createElement("section");
      section.className = "chapter";
      section.id = id;
      section.setAttribute("aria-labelledby", `${id}-title`);

      const spread = document.createElement("div");
      spread.className = `spread ${portrait ? "spread--portrait" : "spread--landscape"}${flip ? " spread--flip" : ""}`;

      const text = document.createElement("div");
      text.className = "spread__text reveal";
      text.innerHTML = `
        <h2 class="chapter__title" id="${id}-title"></h2>
        ${chapter.intro ? '<p class="chapter__intro"></p>' : ""}`;
      $(".chapter__title", text).textContent = chapter.title || "";
      if (chapter.intro) $(".chapter__intro", text).textContent = chapter.intro;

      const featureTile = makeTile(
        feature,
        portrait ? "(max-width: 900px) 90vw, 40vw" : "(max-width: 900px) 92vw, 64vw",
        visibleChapter === 0
      );
      featureTile.classList.add("spread__feature");

      spread.append(featureTile, text);
      section.append(spread);

      // Ảnh ngang được đặt riêng một hàng; các ảnh dọc liền nhau xếp thành lưới.
      const sizes = "(max-width: 599px) 92vw, (max-width: 1099px) 46vw, 31vw";
      let run = null;
      rest.forEach((p) => {
        if (ratioOf(p) >= 1.15) {
          run = null;
          const wide = document.createElement("div");
          wide.className = "wide";
          wide.append(makeTile(p, "(max-width: 900px) 92vw, 75vw", false));
          section.append(wide);
        } else {
          if (!run) {
            run = { el: document.createElement("div"), items: [] };
            run.el.className = "masonry";
            masonries.push(run);
            section.append(run.el);
          }
          run.items.push({ photo: p, tile: makeTile(p, sizes, false) });
        }
      });

      frag.append(section);

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${id}`;
      a.textContent = chapter.title || `Chương ${visibleChapter + 1}`;
      li.append(a);
      nav.append(li);

      visibleChapter++;
    });

    root.append(frag);
    $("#lbTotal").textContent = pad(photos.length);
    layoutAll(true);
  }

  // Place each photo in the currently shortest column, keeping album order.
  function layoutMasonry(m, cols) {
    // Một nhóm ít ảnh hơn số cột: giữ nguyên cỡ ảnh và căn giữa.
    const n = Math.min(cols, m.items.length);
    m.el.classList.toggle("masonry--short", n < cols);
    m.el.style.setProperty("--cols", cols);
    const columns = Array.from({ length: n }, () => {
      const el = document.createElement("div");
      el.className = "masonry__col";
      return { el, height: 0 };
    });
    m.items.forEach(({ photo, tile }) => {
      let target = columns[0];
      for (const c of columns) if (c.height < target.height - 0.02) target = c;
      target.el.append(tile);
      tile.style.setProperty("--d", `${columns.indexOf(target) * 90}ms`);
      target.height += 1 / ratioOf(photo) + 0.06;
    });
    m.el.replaceChildren(...columns.map((c) => c.el));
  }

  function layoutAll(force) {
    const cols = columnsForWidth();
    if (!force && cols === columnCount) return;
    columnCount = cols;
    masonries.forEach((m) => layoutMasonry(m, cols));
  }

  // If a photo's real shape differs from the list, rebalance once things settle,
  // but only while that part of the page is still off-screen to avoid visible jumps.
  let relayoutTimer = 0;
  function scheduleRelayout() {
    clearTimeout(relayoutTimer);
    relayoutTimer = setTimeout(() => {
      masonries.forEach((m) => {
        const r = m.el.getBoundingClientRect();
        if (r.top > window.innerHeight) layoutMasonry(m, columnCount);
      });
    }, 400);
  }

  /* ---------- Scroll reveal ---------- */

  function setupReveal() {
    const targets = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Header, chapter nav, back to top ---------- */

  function setupChrome() {
    const header = $("#siteHeader");
    const hero = $(".hero");
    const toggle = $(".nav-toggle");
    const nav = $("#chapterNav");
    const toTop = $("#toTop");

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        const past = !entry.isIntersecting;
        header.classList.toggle("is-shown", past);
        toTop.classList.toggle("is-shown", past);
        if (!past) closeMenu();
      }, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);

      const links = new Map($$("#chapterList a").map((a) => [a.hash.slice(1), a]));
      const chapterIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.removeAttribute("aria-current"));
          const a = links.get(e.target.id);
          if (a) a.setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$(".chapter").forEach((c) => chapterIO.observe(c));
    } else {
      header.classList.add("is-shown");
      toTop.classList.add("is-shown");
    }

    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      $("#heroTitle").focus({ preventScroll: true });
    });

    $("#setupNote").addEventListener("click", (e) => { e.currentTarget.hidden = true; });
  }

  /* ---------- Hiệu ứng khi cuộn (chỉ dùng transform/opacity, một lần mỗi khung hình) ---------- */

  function setupScrollFx() {
    const bar = $("#progress");
    const hero = $(".hero");
    const media = $(".hero__media");
    const content = $(".hero__content");
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (reduceMotion.matches) return;
      const h = hero.offsetHeight;
      if (y > h) return;
      media.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
      content.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - y / (h * 0.65)).toFixed(3));
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Chia sẻ ---------- */

  function setupShare() {
    const btn = $("#shareBtn");
    if (!btn) return;
    const label = btn.textContent;
    btn.addEventListener("click", async () => {
      const data = { title: document.title, text: WEDDING.subtitle, url: location.href };
      if (navigator.share) {
        try { await navigator.share(data); } catch (_) { /* người dùng đóng hộp thoại */ }
        return;
      }
      try {
        await navigator.clipboard.writeText(location.href);
        btn.textContent = "Đã sao chép liên kết";
      } catch (_) {
        btn.textContent = location.href;
      }
      setTimeout(() => { btn.textContent = label; }, 2200);
    });
  }

  /* ---------- Music (never autoplays) ---------- */

  function setupMusic() {
    if (!WEDDING.music) return;
    const audio = $("#bgMusic");
    const btn = $("#musicToggle");
    const label = $(".music-toggle__label", btn);
    audio.src = WEDDING.music;
    audio.volume = 0.6;
    btn.hidden = false;

    const sync = () => {
      const playing = !audio.paused;
      btn.setAttribute("aria-pressed", String(playing));
      label.textContent = playing ? "Tắt nhạc" : "Bật nhạc";
    };
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("error", () => {
      console.warn(`Wedding album: couldn't play ${WEDDING.music}. Check the path in script.js.`);
      btn.hidden = true;
    });

    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch((err) => console.warn("Wedding album: music couldn't start.", err));
      } else {
        audio.pause();
      }
    });
  }

  /* ---------- Lightbox ---------- */

  const lb = {
    el: $("#lightbox"),
    stage: $("#lbStage"),
    img: $("#lbImage"),
    current: $("#lbCurrent"),
    caption: $("#lbCaption"),
    missingText: $("#lbMissing"),
    close: $("#lbClose"),
    index: 0,
    isOpen: false,
    lastFocus: null,
    token: 0,
    closeTimer: 0,
  };
  const background = () => [$("#main"), $("#siteHeader"), $(".site-footer"), $("#toTop"), $("#musicToggle"), $(".skip-link")];

  function lockPage(on) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.toggle("is-locked", on);
    document.body.style.paddingRight = on && scrollbar > 0 ? `${scrollbar}px` : "";
    background().forEach((el) => {
      if (!el) return;
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  }

  function showPhoto(i) {
    const total = photos.length;
    lb.index = ((i % total) + total) % total;
    const p = photos[lb.index];
    const token = ++lb.token;

    lb.current.textContent = pad(lb.index + 1);
    lb.caption.textContent = p.caption || "";
    lb.el.classList.add("is-swapping");

    const pre = new Image();
    pre.decoding = "async";
    pre.onload = () => {
      if (token !== lb.token) return;
      lb.img.src = pre.src;
      lb.img.alt = p.alt || "";
      lb.img.hidden = false;
      lb.missingText.hidden = true;
      requestAnimationFrame(() => lb.el.classList.remove("is-swapping"));
    };
    pre.onerror = () => {
      if (token !== lb.token) return;
      if (!pre.dataset.fallback && optUrl("l", p.src)) {
        pre.dataset.fallback = "1";
        pre.src = srcOf(p.src);
        return;
      }
      lb.img.hidden = true;
      lb.img.removeAttribute("src");
      lb.missingText.textContent = `Không tìm thấy ảnh: ${p.src}`;
      lb.missingText.hidden = false;
      lb.el.classList.remove("is-swapping");
    };
    pre.src = optUrl("l", p.src) || srcOf(p.src);

    // Warm up the neighbours so next/previous feel instant.
    [lb.index + 1, lb.index - 1].forEach((j) => {
      const q = photos[(j + total) % total];
      if (q && !missing.has(q.src)) new Image().src = optUrl("l", q.src) || srcOf(q.src);
    });
  }

  function openLightbox(i) {
    if (!photos.length) return;
    clearTimeout(lb.closeTimer);
    lb.lastFocus = document.activeElement;
    lb.el.hidden = false;
    lockPage(true);
    lb.isOpen = true;
    showPhoto(i);
    // Two frames so the opening transition always runs.
    requestAnimationFrame(() => requestAnimationFrame(() => lb.el.classList.add("is-open")));
    lb.close.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lb.isOpen) return;
    lb.isOpen = false;
    lb.token++;
    lb.el.classList.remove("is-open");
    const finish = () => {
      lb.el.hidden = true;
      lb.el.classList.remove("is-swapping");
      lockPage(false);
      if (lb.lastFocus && document.contains(lb.lastFocus)) lb.lastFocus.focus({ preventScroll: true });
    };
    if (reduceMotion.matches) finish();
    else lb.closeTimer = setTimeout(finish, 380);
  }

  function setupLightbox() {
    $("#gallery").addEventListener("click", (e) => {
      const btn = e.target.closest(".tile__btn");
      if (btn) openLightbox(Number(btn.dataset.index));
    });

    lb.close.addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => showPhoto(lb.index - 1));
    $("#lbNext").addEventListener("click", () => showPhoto(lb.index + 1));

    // Clicking the dark area around the photo closes the viewer.
    lb.stage.addEventListener("click", (e) => { if (e.target === lb.stage) closeLightbox(); });

    document.addEventListener("keydown", (e) => {
      if (!lb.isOpen) return;
      switch (e.key) {
        case "ArrowRight": e.preventDefault(); showPhoto(lb.index + 1); break;
        case "ArrowLeft":  e.preventDefault(); showPhoto(lb.index - 1); break;
        case "Escape":     e.preventDefault(); closeLightbox(); break;
        case "Tab": {
          // Keep focus inside the viewer.
          const focusable = $$("button", lb.el).filter((b) => !b.hidden);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          break;
        }
      }
    });

    // Touch: swipe left/right to move between photos, swipe down to close.
    let startX = null, startY = 0, startT = 0;
    lb.stage.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) { startX = null; return; }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startT = Date.now();
    }, { passive: true });

    lb.stage.addEventListener("touchmove", (e) => {
      if (startX === null) return;
      if (e.touches.length !== 1) { startX = null; resetDrag(); return; }
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (reduceMotion.matches) return;
      lb.img.classList.add("is-dragging");
      if (Math.abs(dx) > Math.abs(dy)) lb.img.style.transform = `translateX(${dx * 0.5}px)`;
      else if (dy > 0) lb.img.style.transform = `translateY(${dy * 0.4}px)`;
    }, { passive: true });

    const resetDrag = () => {
      lb.img.classList.remove("is-dragging");
      lb.img.style.transform = "";
    };

    lb.stage.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const quick = Date.now() - startT < 300;
      startX = null;
      resetDrag();
      const threshold = quick ? 30 : 60;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        showPhoto(lb.index + (dx < 0 ? 1 : -1));
      } else if (dy > 90 && dy > Math.abs(dx)) {
        closeLightbox();
      }
    });
    lb.stage.addEventListener("touchcancel", () => { startX = null; resetDrag(); });
  }

  /* ---------- Start ---------- */

  function init() {
    fillText();
    setupHero();
    buildGallery();
    setupClosing();
    setupReveal();
    setupChrome();
    setupMusic();
    setupLightbox();
    setupScrollFx();
    setupShare();

    let resizeFrame = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => layoutAll(false));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

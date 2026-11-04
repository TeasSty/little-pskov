(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const hero = document.querySelector("[data-hero]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  requestAnimationFrame(() => hero?.classList.add("is-ready"));

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  const targets = document.querySelectorAll(
    ".strip, .studio__media, .studio__copy, .zones__head, .zones__item, .packages__intro, .menu__row, .packages__rail, .filmstrip__head, .filmstrip__track figure, .visit__copy, .visit__media, .contact__panel, .contact__media"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("is-visible"));
  }

  if (!reduceMotion && hero) {
    const layers = hero.querySelectorAll("[data-parallax]");
    let ticking = false;

    const updateParallax = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      layers.forEach((layer) => {
        const amount = Number(layer.getAttribute("data-parallax") || 0);
        layer.style.translate = `0 ${progress * amount * -120}px`;
      });
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateParallax);
      },
      { passive: true }
    );
    updateParallax();
  }
})();

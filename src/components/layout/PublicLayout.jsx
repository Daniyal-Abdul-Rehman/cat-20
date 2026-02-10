import bgImage3 from "@/assets/branding/file_00000000128871f5a4517ed9db834747.png";
import bgImage4 from "@/assets/branding/file_00000000280871f58cf3207173814f1f.png";
import bgImage2 from "@/assets/branding/file_000000002a44722fa5c90e7097ab9304.png";
import bgImage6 from "@/assets/branding/file_000000002e3c71f5b6c2c082629d436a.png";
import bgImage1 from "@/assets/branding/file_00000000ea40722f9bafdaa78a515aae.png";
import bgImage5 from "@/assets/branding/file_00000000fb1c71f5a24962155222269f.png";

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bgImgRefs = useRef([]);

  /* ---------------- background scroll animation ---------------- */
  useEffect(() => {
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (reducedMotion) {
      bgImgRefs.current.forEach((img, idx) => {
        if (!img) return;
        img.style.opacity = idx === 0 ? "1" : "0";
        img.style.transform = "translate3d(0,0,0) scale(1.05)";
      });
      return;
    }

    let rafId = null;

    const update = () => {
      rafId = null;
      const docEl = document.documentElement;
      const maxScroll = Math.max(
        1,
        (docEl?.scrollHeight || 1) - window.innerHeight
      );
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY || 0) / maxScroll)
      );

      const imgs = bgImgRefs.current;
      const count = imgs.length;
      if (!count) return;

      const pos = progress * (count - 1);
      const idx = Math.floor(pos);
      const t = pos - idx;

      imgs.forEach((img, i) => {
        if (!img) return;

        let opacity = 0;
        if (i === idx) opacity = 1 - t;
        if (i === idx + 1) opacity = t;

        img.style.opacity = opacity;
        const drift = (progress - 0.5) * 70;
        img.style.transform = `translate3d(0, ${drift}px, 0) scale(1.08)`;
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* ---------------- Fixed background ---------------- */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-primary-950" />
        {[bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6].map(
          (src, idx) => (
            <img
              key={src}
              ref={(el) => (bgImgRefs.current[idx] = el)}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 will-change-transform"
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: "translate3d(0,0,0) scale(1.08)",
              }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-primary-900/10 to-transparent" />
      </div>

      {/* ---------------- Page content ---------------- */}
      <div className="relative z-10">
        {/* Header */}
        <header className="relative z-20 bg-white/80 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary-800">
              CAT-20
            </Link>

            <div className="hidden md:flex gap-3 items-center
            ">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
              <NavLink to="/assessment" className="nav-link">
                Assessment
              </NavLink>
              <Link
                to="/assessment"
                className="px-4 py-2 bg-primary-600 text-white rounded-md"
              >
                Take Assessment
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </header>

        {/* ---------------- Mobile Overlay ---------------- */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[90] bg-black/30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* ---------------- Mobile Sidebar ---------------- */}
        <div
          className={`fixed inset-y-0 right-0 z-[100] w-72 bg-white/95 backdrop-blur-md shadow-xl
          transform transition-transform duration-300 md:hidden
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <span className="font-bold text-primary-800">CAT-20</span>
            <button onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>

          <nav className="p-4 space-y-2 flex flex-col items-center">
            <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
            >
              Assessment
            </NavLink>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 bg-primary-600 text-white rounded-md"
            >
              Take Assessment
            </Link>
          </nav>
        </div>

        {/* Main */}
        <main className="relative z-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="relative z-20 bg-white/80 backdrop-blur-md border-t py-6 text-center text-sm text-gray-500">
          <p>CAT-20 v1.1</p>
          <p>© CAT-20 Project</p>
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;

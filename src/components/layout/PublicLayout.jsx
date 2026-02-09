// src/components/layout/PublicLayout.jsx
import bgImage3 from "@/assets/branding/file_00000000128871f5a4517ed9db834747.png";
import bgImage4 from "@/assets/branding/file_00000000280871f58cf3207173814f1f.png";
import bgImage2 from "@/assets/branding/file_000000002a44722fa5c90e7097ab9304.png";
import bgImage6 from "@/assets/branding/file_000000002e3c71f5b6c2c082629d436a.png";
import bgImage1 from "@/assets/branding/file_00000000ea40722f9bafdaa78a515aae.png";
import bgImage5 from "@/assets/branding/file_00000000fb1c71f5a24962155222269f.png";
import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const bgImgRefs = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches;
    if (reducedMotion) {
      const imgs = bgImgRefs.current;
      imgs.forEach((img, idx) => {
        if (!img) return;
        img.style.opacity = idx === 0 ? "1" : "0";
        img.style.transform = "translate3d(0, 0, 0) scale(1.05)";
      });
      return;
    }

    let rafId = null;

    const update = () => {
      rafId = null;

      const docEl = document.documentElement;
      const maxScroll = Math.max(1, (docEl?.scrollHeight || 1) - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (window.scrollY || 0) / maxScroll));

      const imgs = bgImgRefs.current;
      const count = imgs.length;
      if (count === 0) return;

      const position = progress * (count - 1);
      const idx = Math.floor(position);
      const t = position - idx;

      for (let i = 0; i < count; i += 1) {
        const img = imgs[i];
        if (!img) continue;

        let opacity = 0;
        if (i === idx) opacity = 1 - t;
        else if (i === idx + 1) opacity = t;

        img.style.opacity = `${opacity}`;

        const drift = (progress - 0.5) * 70;
        img.style.transform = `translate3d(0, ${drift}px, 0) scale(1.08)`;
      }
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-primary-950" />
        {[bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6].map(
          (src, idx) => (
            <img
              key={src}
              ref={(el) => {
                bgImgRefs.current[idx] = el;
              }}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-700 ease-out contrast-125 saturate-110 brightness-110"
              style={{
                transform: "translate3d(0, 0, 0) scale(1.08)",
                opacity: idx === 0 ? 1 : 0,
              }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-primary-900/10 to-transparent" />
      </div>

      <div className="relative z-10">
      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-800">
                CAT-20
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-800 bg-primary-50"
                      : "text-primary-700 hover:bg-gray-100"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/choose-interface"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-800 bg-primary-50"
                      : "text-primary-700 hover:bg-gray-100"
                  }`
                }
              >
                Assessment
              </NavLink>
              <Link
                to="/choose-interface"
                className="px-4 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
              >
                Take the Assessment
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm border-t border-white/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm space-y-1">
            <p>CAT-20 v1.1</p>
            <p>© CAT-20 Project</p>
            <p>An evolving framework — clarity improves as the project grows.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default PublicLayout;

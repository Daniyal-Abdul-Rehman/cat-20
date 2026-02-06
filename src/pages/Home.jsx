// src/pages/Home.jsx
import bgImage3 from "@/assets/branding/file_00000000128871f5a4517ed9db834747.png";
import bgImage4 from "@/assets/branding/file_00000000280871f58cf3207173814f1f.png";
import bgImage2 from "@/assets/branding/file_000000002a44722fa5c90e7097ab9304.png";
import bgImage6 from "@/assets/branding/file_000000002e3c71f5b6c2c082629d436a.png";
import bgImage1 from "@/assets/branding/file_00000000ea40722f9bafdaa78a515aae.png";
import bgImage5 from "@/assets/branding/file_00000000fb1c71f5a24962155222269f.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const bgImgRefs = useRef([]);

  const onSubmitReflection = (e) => {
    e.preventDefault();
    setReflectionSubmitted(true);
  };

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
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/45 via-primary-900/20 to-transparent" />
          <div className="relative max-w-5xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Discover How Your Mind Actually Works
              </h1>
              <p className="mt-5 text-xl text-primary-100">
                CAT-20 is a cognitive archetype system that maps how people think,
                seek meaning, build, care, explore, and create — across 20 distinct
                archetypes.
              </p>
              <p className="mt-4 text-sm text-primary-100">
                Built from real-world testing • Pattern-based, not personality stereotypes
              </p>

              <div className="mt-8">
                <Link
                  to="/assessment-intro"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-primary-800"
                >
                  Take the CAT-20 Assessment
                </Link>
                <p className="mt-2 text-sm text-primary-100">Free • No account required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 rounded-2xl border border-gray-200 bg-white/40 backdrop-blur-sm p-6 sm:p-10">
              <section className="space-y-3">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Designed for Clarity and Comfort
                </h2>
                <p className="text-gray-700">
                  CAT-20 is built with readability in mind.
                </p>
                <p className="text-gray-700">
                  We use clean spacing, clear language, and simple structure to
                  reduce mental fatigue and make the experience more comfortable —
                  including for neurodivergent users.
                </p>
              </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-extrabold text-gray-900">What Is CAT-20?</h2>
              <p className="text-gray-700">
                CAT-20 (Cognitive Archetype Taxonomy-20) is a framework for
                understanding how people naturally process information and
                navigate the world.
              </p>
              <p className="text-gray-700">
                Rather than placing you into a single personality “type,” CAT-20
                measures six core cognitive clusters, showing how strongly each
                one shows up for you.
              </p>
              <p className="text-gray-700">
                Your results are displayed as percentages, not labels — revealing
                balance, dominance, and inner tension within your mind.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-extrabold text-gray-900">
                The Six Cognitive Clusters
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Thinker</h3>
                  <p className="mt-1 text-gray-700">
                    Logic, analysis, internal clarity, understanding systems
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Seeker</h3>
                  <p className="mt-1 text-gray-700">
                    Meaning, insight, reflection, pattern recognition
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Builder</h3>
                  <p className="mt-1 text-gray-700">
                    Structure, execution, responsibility, long-term stability
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Nurturer</h3>
                  <p className="mt-1 text-gray-700">
                    Care, empathy, emotional awareness, support
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Spark</h3>
                  <p className="mt-1 text-gray-700">
                    Energy, expression, inspiration, creative drive
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Wanderer</h3>
                  <p className="mt-1 text-gray-700">
                    Exploration, adaptability, curiosity, freedom
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                Every person has all six — CAT-20 shows how they interact inside you.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Why CAT-20 Is Different
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">Not a personality label</h3>
                  <p className="mt-1 text-gray-700">
                    CAT-20 measures cognitive patterns, not fixed identities.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">Multi-dimensional results</h3>
                  <p className="mt-1 text-gray-700">
                    You don’t get one box — you get a full mental map.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">Built from live testing</h3>
                  <p className="mt-1 text-gray-700">
                    The system has been refined through real responses, not theory alone.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">Action-oriented insight</h3>
                  <p className="mt-1 text-gray-700">
                    Results highlight strengths, blind spots, and growth challenges — not just traits.
                  </p>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden space-y-4 rounded-xl border border-gray-200 bg-white/35 backdrop-blur-sm p-6 sm:p-8">
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/20" />
              </div>

              <div className="relative">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Testimonials
                  </h2>
                  <p className="text-sm text-gray-500">Coming soon</p>
                </div>
                <p className="text-gray-700">
                  You mentioned you’ll share testimonials once we’re in the layout phase. This section is reserved so they can be placed intentionally.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <p className="text-gray-600">
                      This area will display real reflections from people who have taken the CAT-20 assessment.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <p className="text-gray-600">
                      Once you share the quotes, we’ll format them into a clean, consistent layout.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-extrabold text-gray-900">
                What You’ll Learn About Yourself
              </h2>
              <p className="text-gray-700">Through CAT-20, you’ll gain insight into:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Your primary and secondary cognitive archetypes</li>
                <li>Strengths you naturally rely on</li>
                <li>Blind spots that quietly work against you</li>
                <li>How you approach decisions, stress, and responsibility</li>
                <li>Why certain paths feel natural — and others feel forced</li>
              </ul>
              <p className="text-gray-700">
                Many people describe their results as surprisingly accurate or deeply clarifying.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-extrabold text-gray-900">About the Assessment</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Takes about 10–15 minutes</li>
                <li>No right or wrong answers</li>
                <li>Choose what feels most natural to you</li>
                <li>Questions are spaced and formatted for clarity and focus</li>
              </ul>
              <p className="text-gray-700">This is not a test you “pass” or “fail.”</p>
              <p className="text-gray-700">It’s a tool for awareness.</p>

              <div className="pt-2">
                <Link
                  to="/assessment-intro"
                  className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Start the CAT-20 Assessment
                </Link>
                <p className="mt-2 text-sm text-gray-500">Free • No account required</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-gray-900">Early Experiences</h2>
              <p className="text-gray-700">
                If CAT-20 helped you reflect or gain clarity, you’re welcome to share your experience. There’s
                no obligation — insight matters more than praise.
              </p>

              {reflectionSubmitted ? (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <p className="font-medium text-gray-900">Reflection received.</p>
                  <p className="mt-1 text-gray-700">
                    Thank you. If you’d like, you can submit another reflection by refreshing the page.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmitReflection} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                      Name (optional)
                    </label>
                    <input id="name" name="name" className="input mt-1 w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="reflection">
                      Reflection
                    </label>
                    <textarea
                      id="reflection"
                      name="reflection"
                      required
                      rows={5}
                      className="input mt-1 w-full"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      id="permission"
                      name="permission"
                      type="checkbox"
                      className="mt-1"
                    />
                    <label htmlFor="permission" className="text-sm text-gray-700">
                      OK to display anonymously
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="submit" className="btn btn-primary">
                      Share a Reflection
                    </button>
                    <p className="text-sm text-gray-500">
                      Name optional • Can be posted anonymously
                    </p>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

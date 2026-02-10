// src/pages/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "This is scarily accurate — down to things I didn't even think were possible to predict.",
      author: "Dhruv Singh"
    },
    {
      quote: "I've taken many personality tests, and this one feels most consistent to my core.",
      author: "Brooke Nitzsche"
    },
    {
      quote: "100% accurate. I can only handle social situations for a short period of time and need time alone to recharge.",
      author: "Mystic Sullivan (Nurse)"
    },
    {
      quote: "CAT-20 is like a mirror. It shows archetype of your conscious core and orbiting personality fragments. Very interesting.",
      author: "Ini Udom"
    },
    {
      quote: "This is definitely on point. I will be introducing this to my staff at office.",
      author: "Carol Brown, CFO"
    },
    {
      quote: "Your results were clear, precise, and surprisingly consistent. The analysis felt genuinely accurate.",
      author: "Alice Coyle"
    },
    {
      quote: "At first I thought some of weaknesses didn't apply to me. After reflecting, I realized they actually did. It was very insightful.",
      author: "Grace Tovar"
    },
    {
      quote: "This gave me a lot of food for thought. Even being familiar with Jung and MBTI, this felt uniquely valuable.",
      author: "JK"
    },
    {
      quote: "Usually I struggle to answer personality tests. With this one, answers felt clear and natural. This is definitely me.",
      author: "Jennifer Hilger"
    },
    {
      quote: "This puts words to my intuitions and blindspots at work and in relationships. I'm printing this out to carry with me.",
      author: "Joyce Fadeley"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const onSubmitReflection = (e) => {
    e.preventDefault();
    setReflectionSubmitted(true);
  };

  return (
    <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/45 via-primary-900/20 to-transparent" />
          <div className="max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl sm:max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                A Clearer Map of How Your Mind Works
              </h1>
              <p className="mt-4 text-base sm:text-lg text-primary-100 font-medium">
                CAT-20 maps how you think, seek meaning, build, care, explore, and create — across 20 cognitive archetypes.
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-primary-100">
                Built from real-world testing • Pattern-based, not personality stereotypes
              </p>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-primary-100 italic">
                CAT-20 is a Black-founded system for understanding how different minds stabilize and interpret the world.
              </p>

              <div className="mt-8">
                <Link
                  to="/choose-interface"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Thinker</h3>
                  <p className="mt-1 text-gray-700">
                    Logic, analysis, internal clarity, understanding systems
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Seeker</h3>
                  <p className="mt-1 text-gray-700">
                    Meaning, insight, reflection, pattern recognition
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Builder</h3>
                  <p className="mt-1 text-gray-700">
                    Structure, execution, responsibility, long-term stability
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Nurturer</h3>
                  <p className="mt-1 text-gray-700">
                    Care, empathy, emotional awareness, support
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Spark</h3>
                  <p className="mt-1 text-gray-700">
                    Energy, expression, inspiration, creative drive
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
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
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Not a personality label</h3>
                  <p className="mt-1 text-gray-700">
                    CAT-20 measures cognitive patterns, not fixed identities.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Multi-dimensional results</h3>
                  <p className="mt-1 text-gray-700">
                    You don't get one box — you get a full mental map.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Built from live testing</h3>
                  <p className="mt-1 text-gray-700">
                    Refined through real responses, not theory alone.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900">Action-oriented insight</h3>
                  <p className="mt-1 text-gray-700">
                    Highlights strengths, blind spots, and growth challenges.
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
                    Voices from CAT-20
                  </h2>
                  <p className="text-sm text-gray-500 italic">Real experiences</p>
                </div>
                <p className="text-gray-700 mt-2">
                  Real reflections from people who have taken CAT-20 assessment.
                </p>
                
                {/* Carousel Container */}
                <div className="relative mt-6">
                  <div className="overflow-hidden rounded-lg">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                          <div className="rounded-lg border border-gray-200 bg-white/70 p-5">
                            <p className="text-gray-600 italic text-lg leading-relaxed">
                              "{testimonial.quote}"
                            </p>
                            <p className="text-sm text-gray-500 mt-4 font-medium">— {testimonial.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7 7" />
                      </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTestimonial 
                              ? 'bg-primary-600' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                What You'll Learn About Yourself
              </h2>
              <p className="text-gray-700">Through CAT-20, you'll gain insight into:</p>
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

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                About the Assessment
              </h2>
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
                  to="/choose-interface"
                  className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Take the CAT-20 Assessment
                </Link>
                <p className="mt-2 text-sm text-gray-500">Free • No account required</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Early Experiences
              </h2>
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
  );
};

export default Home;

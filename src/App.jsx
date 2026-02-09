// src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";

// Layouts
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";

// Public Pages
import Home from "./pages/Home";

const ChooseInterfacePage = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Choose How CAT-20 Speaks To You
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            This doesn't change your results — it changes the lens your results are explained through.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/assessment-intro?focus=self-discovery"
            className="group block rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                Self-Discovery
              </h3>
              <p className="text-gray-600">
                How your cognition organizes meaning, perception, and internal patterns.
              </p>
            </div>
          </Link>

          <Link
            to="/assessment-intro?focus=love-relationships"
            className="group block rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors">
                Love & Relationships
              </h3>
              <p className="text-gray-600">
                How your wiring shapes attachment, closeness, and emotional safety.
              </p>
            </div>
          </Link>

          <Link
            to="/assessment-intro?focus=gaming-performance"
            className="group block rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                Gaming & Performance
              </h3>
              <p className="text-gray-600">
                How your mind regulates focus, pressure, and competitive response.
              </p>
            </div>
          </Link>

          <Link
            to="/assessment-intro?focus=career-direction"
            className="group block rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                Career & Direction
              </h3>
              <p className="text-gray-600">
                How your patterns influence responsibility, momentum, and long-term stability.
              </p>
            </div>
          </Link>

          <Link
            to="/assessment-intro?focus=social-dynamics"
            className="group block rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                Social Dynamics
              </h3>
              <p className="text-gray-600">
                How you interpret people, roles, and movement within groups.
              </p>
            </div>
          </Link>

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-6 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-gray-500 font-medium">More pathways coming soon</p>
              <p className="text-sm text-gray-400">CAT-20 continues to evolve based on real-world use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssessmentIntroPage = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 rounded-2xl border border-gray-200 bg-white/40 backdrop-blur-sm p-6 sm:p-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              CAT-20 Cognitive Assessment
            </h1>
            <p className="text-lg text-gray-600">
              A brief map of how your mind naturally operates
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">What this is</h2>
            <p className="text-gray-700">
              This assessment measures how you think and process the world, not
              who you “should” be or how you perform under pressure.
            </p>
            <p className="text-gray-700">There are no right or wrong answers.</p>
            <p className="text-gray-700">There are no trick questions.</p>
            <p className="text-gray-700">
              CAT-20 looks for patterns, not perfection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">
              How to answer (please read)
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>
                Choose the option that feels most natural, not what sounds best
              </li>
              <li>
                Answer based on how you usually operate, not rare situations
              </li>
              <li>
                Don’t overthink — your first instinct is often the most accurate
              </li>
              <li>
                If two answers feel close, pick the one that feels slightly more
                true
              </li>
              <li>
                This works best when you answer honestly, not strategically
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">What you’ll receive</h2>
            <p className="text-gray-700">
              After completing the assessment, you’ll see:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Your primary and secondary cognitive archetypes</li>
              <li>A breakdown of all six cognitive clusters</li>
              <li>Key strengths and blind spots</li>
              <li>
                Insight into how you approach decisions, stress, and growth
              </li>
            </ul>
            <p className="text-gray-700">Results are shown as percentages, not labels.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Designed for clarity</h2>
            <p className="text-gray-700">
              Questions are intentionally spaced and written to reduce mental
              strain. Take your time, pause if needed, and stay comfortable.
            </p>
            <p className="text-gray-700">
              If something feels unclear, answer based on what feels closest —
              ambiguity itself is part of how cognition shows up.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Before you begin</h2>
            <p className="text-gray-700">This assessment takes about 10–15 minutes.</p>
            <p className="text-gray-700">
              Answer as yourself — not who you want to become, and not who others
              expect you to be.
            </p>
          </section>

          <div className="pt-2">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Take the CAT-20 Assessment
            </Link>
            <p className="mt-2 text-sm text-gray-500">Free • No account required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  const assessmentUrl = import.meta.env.VITE_CAT20_ASSESSMENT_URL;
  const canEmbed = typeof assessmentUrl === "string" && assessmentUrl.length > 0;

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 rounded-2xl border border-gray-200 bg-white/40 backdrop-blur-sm p-6 sm:p-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              CAT-20 Cognitive Archetype Assessment
            </h1>
            <p className="text-lg text-gray-600">
              This assessment explores how you naturally think, decide, and
              engage with the world. There are no right or wrong answers.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>
                Answer based on what feels most natural, not what sounds best
              </li>
              <li>
                Do not answer how you wish you were — answer how you usually are
              </li>
              <li>Go with your first instinct whenever possible</li>
              <li>
                If two answers feel close, choose the one you lean toward more
                often
              </li>
              <li>This assessment works best when you don’t overthink it.</li>
            </ul>
            <p className="text-sm text-gray-500">
              Questions are spaced intentionally for clarity and ease of focus.
              Take your time if needed.
            </p>
          </section>

          {!canEmbed ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 space-y-3">
              <p className="text-gray-800 font-medium">
                Assessment link not configured.
              </p>
              <p className="text-gray-600 text-sm">
                Set <span className="font-mono">VITE_CAT20_ASSESSMENT_URL</span> in
                your environment to a Typeform (or other) assessment URL.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href={assessmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Open Assessment in a New Tab
                </a>
                <p className="text-sm text-gray-500">Free • No account required</p>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  title="CAT-20 Assessment"
                  src={assessmentUrl}
                  className="w-full h-[80vh]"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/choose-interface" element={<ChooseInterfacePage />} />
              <Route path="/assessment-intro" element={<AssessmentIntroPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/profile" element={<Profile />} />
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

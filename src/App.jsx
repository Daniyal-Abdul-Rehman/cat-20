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

const AssessmentIntroPage = () => {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
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
              Begin the CAT-20 Assessment
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
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
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

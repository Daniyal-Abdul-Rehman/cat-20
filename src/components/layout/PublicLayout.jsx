// src/components/layout/PublicLayout.jsx
import { Link, NavLink, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="relative z-20 bg-white/85 backdrop-blur-sm shadow">
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
                to="/assessment-intro"
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
                to="/assessment-intro"
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
      <footer className="relative z-20 bg-white/85 backdrop-blur-sm shadow-inner py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm space-y-1">
            <p>CAT-20 v1.1</p>
            <p>© CAT-20 Project</p>
            <p>An evolving framework — clarity improves as the project grows.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

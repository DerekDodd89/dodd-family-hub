import { Users } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Inventory from "./pages/Inventory";
import Shopping from "./pages/Shopping";
import Recipes from "./pages/Recipes";
import Budget from "./pages/Budget";

function App() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="border-b border-stone-200 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            aria-label="Return to dashboard"
          >
            <div className="rounded-xl bg-emerald-700 p-2 text-white">
              <Users size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold">Dodd Family Hub</h1>

              <p className="text-sm text-stone-500">
                Family Management Operating System
              </p>
            </div>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/food" element={<Food />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/shopping" element={<Shopping />} />

          <Route path="/recipes" element={<Recipes />} />

          <Route path="/meal-plan" element={<Recipes />} />

          <Route path="/budget" element={<Budget />} />

          <Route
            path="/family"
            element={
              <main className="p-5 md:p-8">
                <h1 className="text-3xl font-bold">Family</h1>

                <p className="mt-2 text-stone-600">
                  Family members, schedules, and household information will
                  appear here.
                </p>
              </main>
            }
          />

          <Route
            path="*"
            element={
              <main className="p-5 md:p-8">
                <h1 className="text-3xl font-bold">Page not found</h1>

                <p className="mt-2 text-stone-600">
                  This section has not been built yet.
                </p>

                <Link
                  to="/"
                  className="mt-5 inline-block rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white"
                >
                  Return to Dashboard
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
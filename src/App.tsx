import {
  Home,
  Receipt,
  Users,
  Utensils,
} from "lucide-react";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Shopping from "./pages/Shopping";
import Recipes from "./pages/Recipes";
import Budget from "./pages/Budget";
import Food from "./pages/Food";

const navigation = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Food", path: "/food", icon: Utensils },
  { name: "Budget", path: "/budget", icon: Receipt },
  { name: "Family", path: "/family", icon: Users },
];

function App() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="border-b border-stone-200 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="rounded-xl bg-emerald-700 p-2 text-white">
            <Utensils size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Dodd Family Hub</h1>
            <p className="text-sm text-stone-500">Family Management Operating System</p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside className="hidden min-h-[calc(100vh-73px)] w-60 border-r border-stone-200 bg-white p-4 md:block">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-emerald-50 font-semibold text-emerald-800"
                        : "text-stone-600 hover:bg-stone-100"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/" element={<Food />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/budget" element={<Budget />} />
          <Route
            path="*"
            element={
              <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold">Page coming next</h2>
                <p className="mt-2 text-stone-600">
                  This section is connected and ready to build.
                </p>
              </main>
            }
          />
        </Routes>
      </div>

      <nav className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t border-stone-200 bg-white px-2 py-2 md:hidden">
        {navigation.slice(0, 5).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs ${
                  isActive ? "text-emerald-700" : "text-stone-500"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
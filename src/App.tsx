import {
  BookOpen,
  CalendarDays,
  Home,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import { NavLink, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import Inventory from "./pages/Inventory";

const navigation = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Inventory", path: "/inventory", icon: Package },
  { name: "Shopping", path: "/shopping", icon: ShoppingCart },
  { name: "Meal Plan", path: "/meal-plan", icon: CalendarDays },
  { name: "Recipes", path: "/recipes", icon: BookOpen },
  { name: "Receipts", path: "/receipts", icon: Receipt },
  { name: "Family", path: "/family", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
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
            <p className="text-sm text-stone-500">Food Management</p>
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
          <Route path="/inventory" element={<Inventory />} />
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
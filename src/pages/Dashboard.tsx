import {
  CircleDollarSign,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Food",
    description: "Inventory, shopping, meal planning, and recipes.",
    path: "/food",
    icon: Utensils,
  },
  {
    title: "Finances",
    description: "Budget, bills, spending, and household goals.",
    path: "/budget",
    icon: CircleDollarSign,
  },
  {
    title: "Family",
    description: "Members, schedules, contacts, and household details.",
    path: "/family",
    icon: Users,
  },
];

export default function Dashboard() {
  return (
    <main className="p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">
          Household overview
        </p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">
          Dodd Family Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-stone-600">
          Choose a module to manage the areas that matter most to your family.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.title}
                to={module.path}
                className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Icon size={28} />
                  </div>

                  <span className="text-sm font-semibold text-emerald-700">
                    Open
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  {module.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {module.description}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
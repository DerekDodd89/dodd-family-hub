import {
  CalendarDays,
  CircleDollarSign,
  Package,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const dashboardCards = [
  {
    title: "Food Inventory",
    value: "17 items",
    detail: "6 items below minimum",
    path: "/inventory",
    icon: Package,
  },
  {
    title: "Shopping",
    value: "2 items",
    detail: "Ready to review",
    path: "/shopping",
    icon: ShoppingCart,
  },
  {
    title: "Meal Plan",
    value: "0 meals",
    detail: "Plan the week",
    path: "/food",
    icon: Utensils,
  },
  {
    title: "Budget",
    value: "$0 tracked",
    detail: "Review household spending",
    path: "/budget",
    icon: CircleDollarSign,
  },
  {
    title: "Family",
    value: "0 members",
    detail: "Add household profiles",
    path: "/family",
    icon: Users,
  },
  {
    title: "Upcoming",
    value: "No events",
    detail: "Family calendar summary",
    path: "/family",
    icon: CalendarDays,
  },
];

export default function Dashboard() {
  return (
    <main className="flex-1 p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">
          Household overview
        </p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">
          Dodd Family Dashboard
        </h1>

        <p className="mt-2 text-stone-600">
          The most important information from Food, Budget, and Family.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-stone-500">
                      {card.title}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-stone-900">
                      {card.value}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {card.detail}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                    <Icon size={22} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
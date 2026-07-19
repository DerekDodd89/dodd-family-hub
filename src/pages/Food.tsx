import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  BookOpen,
} from "lucide-react";

const sections = [
  {
    title: "Inventory",
    description:
      "Manage pantry, refrigerator, and freezer inventory.",
    path: "/inventory",
    icon: Package,
  },
  {
    title: "Shopping",
    description:
      "Review grocery lists and upload receipts.",
    path: "/shopping",
    icon: ShoppingCart,
  },
  {
    title: "Meal Plan",
    description:
      "View recipes and plan meals for the week.",
    path: "/meal-plan",
    icon: BookOpen,
  },
];

export default function Food() {
  return (
    <main className="p-5 md:p-8">
      <h1 className="text-4xl font-bold">Food Management</h1>

      <p className="mt-2 text-stone-600">
        Manage all food-related information for the household.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.title}
              to={section.path}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 w-fit">
                <Icon size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {section.title}
              </h2>

              <p className="mt-2 text-stone-600">
                {section.description}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
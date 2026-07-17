import { Link } from "react-router-dom";
import {
  CalendarDays,
  Car,
  FileText,
  HeartPulse,
  Home,
  Landmark,
  Package,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";

const modules = [
  {
    name: "Food Management",
    path: "/inventory",
    icon: Utensils,
    status: "Active",
    details: [
      "Inventory, shopping, meals, and recipes",
      "Low-stock alerts coming next",
      "Receipts connected to food spending",
    ],
  },
  {
    name: "Budget",
    path: "/budget",
    icon: Landmark,
    status: "Active",
    details: [
      "$40,955 total credit-card debt",
      "$1,095 monthly minimum payments",
      "$740 estimated monthly interest",
    ],
  },
  {
    name: "Family",
    path: "/family",
    icon: Users,
    status: "In Development",
    details: [
      "7 household members",
      "Profiles, schedules, and reminders",
      "Shared family information",
    ],
  },
  {
    name: "Health",
    path: "/health",
    icon: HeartPulse,
    status: "Planned",
    details: [
      "Fitness and nutrition goals",
      "Appointments and health records",
      "Family progress tracking",
    ],
  },
  {
    name: "Home",
    path: "/home",
    icon: Home,
    status: "Planned",
    details: [
      "Maintenance schedules",
      "Home projects and repairs",
      "Appliances and warranties",
    ],
  },
  {
    name: "Vehicles",
    path: "/vehicles",
    icon: Car,
    status: "Planned",
    details: [
      "Maintenance and service records",
      "Fuel and mileage tracking",
      "Insurance and registration",
    ],
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FileText,
    status: "Planned",
    details: [
      "Important family records",
      "Receipts and warranties",
      "Secure document storage",
    ],
  },
  {
    name: "Security",
    path: "/security",
    icon: ShieldCheck,
    status: "Future Module",
    details: [
      "Emergency information",
      "Family safety tools",
      "Location features planned later",
    ],
  },
];

const quickStats = [
  {
    label: "Active Modules",
    value: "2",
    icon: Package,
  },
  {
    label: "Household Members",
    value: "7",
    icon: Users,
  },
  {
    label: "Debt Accounts",
    value: "4",
    icon: Receipt,
  },
  {
    label: "Food Tools",
    value: "5",
    icon: ShoppingCart,
  },
];

export default function Dashboard() {
  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Family Management Operating System
        </p>

        <h1 className="text-4xl font-bold text-stone-900">
          FMOS Dashboard
        </h1>

        <p className="mt-2 text-stone-500">
          One place to view and manage the Dodd family household.
        </p>
      </div>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Icon className="h-5 w-5 text-emerald-700" />
                </div>

                <div>
                  <p className="text-sm text-stone-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-stone-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Family Management Modules
            </h2>

            <p className="text-sm text-stone-500">
              Select a module to view details and manage that part of family life.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-sm text-stone-500 md:flex">
            <CalendarDays className="h-4 w-4" />
            FMOS Overview
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.name}
                to={module.path}
                className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-3 transition group-hover:bg-emerald-200">
                      <Icon className="h-6 w-6 text-emerald-700" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-stone-900">
                        {module.name}
                      </h3>

                      <p className="text-sm font-medium text-emerald-700">
                        {module.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-stone-600">
                  {module.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
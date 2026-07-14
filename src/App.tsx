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

const navigation = [
  { name: "Dashboard", icon: Home },
  { name: "Inventory", icon: Package },
  { name: "Shopping", icon: ShoppingCart },
  { name: "Meal Plan", icon: CalendarDays },
  { name: "Recipes", icon: BookOpen },
  { name: "Receipts", icon: Receipt },
  { name: "Family", icon: Users },
  { name: "Settings", icon: Settings },
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
            {navigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${
                    index === 0
                      ? "bg-emerald-50 font-semibold text-emerald-800"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-5 md:p-8">
          <div className="mb-7">
            <p className="text-sm font-medium text-emerald-700">
              Sunday food reset
            </p>

            <h2 className="mt-1 text-3xl font-bold">Good evening, Derek</h2>

            <p className="mt-2 text-stone-600">
              Here is the current food-management overview.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Inventory"
              value="17 items"
              note="6 items below minimum"
              icon={Package}
            />

            <DashboardCard
              title="Shopping"
              value="0 items"
              note="List is ready to generate"
              icon={ShoppingCart}
            />

            <DashboardCard
              title="Meal plan"
              value="7 days"
              note="Chicken nugget salads tonight"
              icon={CalendarDays}
            />

            <DashboardCard
              title="Recipes"
              value="6 recipes"
              note="Family recipe library"
              icon={BookOpen}
            />
          </section>

          <section className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Items running low</h3>

                <button className="text-sm font-semibold text-emerald-700">
                  View inventory
                </button>
              </div>

              <div className="space-y-3">
                <InventoryRow name="Eggs" current="0 dozen" target="6 dozen" />
                <InventoryRow
                  name="Activia yogurt"
                  current="6 cups"
                  target="28 cups"
                />
                <InventoryRow
                  name="Apples"
                  current="3"
                  target="28"
                />
                <InventoryRow
                  name="Ratio yogurt"
                  current="3 cups"
                  target="7 cups"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">This week’s meals</h3>

                <button className="text-sm font-semibold text-emerald-700">
                  Edit plan
                </button>
              </div>

              <div className="space-y-3">
                <MealRow day="Monday" meal="Simple crockpot chicken" />
                <MealRow day="Tuesday" meal="Ground beef tacos" />
                <MealRow day="Wednesday" meal="Flexible meal" />
                <MealRow day="Thursday" meal="Simple spaghetti" />
                <MealRow day="Friday" meal="Salmon and broccoli" />
                <MealRow day="Saturday" meal="Homemade pizza" />
                <MealRow day="Sunday" meal="Chicken fajitas" />
              </div>
            </div>
          </section>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t border-stone-200 bg-white px-2 py-2 md:hidden">
        {navigation.slice(0, 5).map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`flex flex-col items-center gap-1 text-xs ${
                index === 0 ? "text-emerald-700" : "text-stone-500"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: string;
  note: string;
  icon: typeof Package;
};

function DashboardCard({
  title,
  value,
  note,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-500">{title}</span>

        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
          <Icon size={20} />
        </div>
      </div>

      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-stone-500">{note}</p>
    </div>
  );
}

function InventoryRow({
  name,
  current,
  target,
}: {
  name: string;
  current: string;
  target: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-stone-500">Minimum: {target}</p>
      </div>

      <span className="font-bold text-amber-800">{current}</span>
    </div>
  );
}

function MealRow({ day, meal }: { day: string; meal: string }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-100 pb-2 last:border-0">
      <span className="font-semibold">{day}</span>
      <span className="text-right text-sm text-stone-600">{meal}</span>
    </div>
  );
}

export default App;
export default function Food() {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold">Food Module</h1>

      <p className="mt-2 text-stone-500">
        Manage your family's food, meals, shopping, and recipes.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold">Inventory</h2>
          <p className="text-sm text-stone-500">
            Track pantry, refrigerator, and freezer items.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold">Shopping</h2>
          <p className="text-sm text-stone-500">
            Automatically generated shopping lists.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold">Recipes</h2>
          <p className="text-sm text-stone-500">
            Family favorites and meal ideas.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold">Meal Planner</h2>
          <p className="text-sm text-stone-500">
            Plan meals for the week.
          </p>
        </div>
      </div>
    </main>
  );
}
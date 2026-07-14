export default function Inventory() {
  const inventory = [
    {
      category: "Breakfast",
      item: "Eggs",
      current: "4 dozen",
      minimum: "6 dozen",
      status: "LOW",
    },
    {
      category: "Breakfast",
      item: "Ratio Yogurt",
      current: "8",
      minimum: "14",
      status: "LOW",
    },
    {
      category: "Produce",
      item: "Apples",
      current: "18",
      minimum: "21",
      status: "LOW",
    },
    {
      category: "Meat",
      item: "Chicken Breast",
      current: "25 lbs",
      minimum: "15 lbs",
      status: "GOOD",
    },
    {
      category: "Meat",
      item: "Ground Beef",
      current: "20 lbs",
      minimum: "10 lbs",
      status: "GOOD",
    },
    {
      category: "Dairy",
      item: "Milk",
      current: "4 gallons",
      minimum: "4 gallons",
      status: "GOOD",
    },
  ];

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold">Food Inventory</h1>

      <p className="mt-2 text-stone-500">
        Current pantry, refrigerator, and freezer inventory.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3">Current</th>
              <th className="p-3">Minimum</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((food) => (
              <tr key={food.item} className="border-b">
                <td className="p-3">{food.category}</td>
                <td className="p-3 font-semibold">{food.item}</td>
                <td className="p-3 text-center">{food.current}</td>
                <td className="p-3 text-center">{food.minimum}</td>

                <td className="p-3 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      food.status === "GOOD"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {food.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-6 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
        + Update Inventory
      </button>
    </main>
  );
}
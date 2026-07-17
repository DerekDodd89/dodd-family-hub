import { useEffect, useState } from "react";
import { inventoryItems } from "../data/inventory";
import { supabase } from "../lib/supabase";

type ShoppingRow = {
  id: number;
  name: string;
  category: string | null;
  unit: string | null;
  current_quantity: number | null;
  minimum_quantity: number | null;
  target_quantity: number | null;
  quantity_to_buy: number | null;
  purchased: boolean;
};

export default function Shopping() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadShoppingItems() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("shopping_items")
        .select("*")
        .order("name");

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        const lowStockItems = inventoryItems
          .filter((item) => item.current < item.minimum)
          .map((item) => ({
            name: item.name,
            category: item.category,
            unit: item.unit,
            current_quantity: item.current,
            minimum_quantity: item.minimum,
            target_quantity: item.target,
            quantity_to_buy: item.target - item.current,
            purchased: false,
          }));

        if (lowStockItems.length > 0) {
          const { data: insertedItems, error: insertError } = await supabase
            .from("shopping_items")
            .insert(lowStockItems)
            .select();

          if (insertError) {
            setErrorMessage(insertError.message);
            setLoading(false);
            return;
          }

          setShoppingItems(insertedItems ?? []);
        }
      } else {
        setShoppingItems(data);
      }

      setLoading(false);
    }

    loadShoppingItems();
  }, []);

  async function togglePurchased(item: ShoppingRow) {
    const newPurchasedValue = !item.purchased;

    setShoppingItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, purchased: newPurchasedValue }
          : currentItem,
      ),
    );

    const { error } = await supabase
      .from("shopping_items")
      .update({ purchased: newPurchasedValue })
      .eq("id", item.id);

    if (error) {
      setErrorMessage(error.message);

      setShoppingItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? { ...currentItem, purchased: item.purchased }
            : currentItem,
        ),
      );
    }
  }

  const remainingItems = shoppingItems.filter(
    (item) => !item.purchased,
  ).length;

  if (loading) {
    return (
      <main className="flex-1 p-8">
        <p className="text-stone-500">Loading shopping list...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Shopping List
        </h1>

        <p className="mt-2 text-stone-500">
          Shared shopping list saved in Supabase.
        </p>

        <p className="mt-2 font-semibold text-emerald-700">
          {remainingItems} item{remainingItems === 1 ? "" : "s"} remaining
        </p>

        {errorMessage && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {shoppingItems.length === 0 ? (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-semibold">
              Nothing needs to be purchased.
            </p>
          </div>
        ) : (
          shoppingItems.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition ${
                item.purchased ? "opacity-60" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={item.purchased}
                onChange={() => togglePurchased(item)}
                className="h-6 w-6 accent-emerald-700"
              />

              <div className="flex-1">
                <p
                  className={`text-lg font-semibold ${
                    item.purchased
                      ? "text-stone-500 line-through"
                      : "text-stone-900"
                  }`}
                >
                  {item.name}
                </p>

                <p className="text-sm text-stone-500">
                  Buy {item.quantity_to_buy ?? 0} {item.unit ?? "item"}
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  Current: {item.current_quantity ?? 0} · Minimum:{" "}
                  {item.minimum_quantity ?? 0} · Target:{" "}
                  {item.target_quantity ?? 0}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  item.purchased
                    ? "bg-stone-100 text-stone-500"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {item.purchased ? "Purchased" : "Needed"}
              </span>
            </label>
          ))
        )}
      </div>
    </main>
  );
}
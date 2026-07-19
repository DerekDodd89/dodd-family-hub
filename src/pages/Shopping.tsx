import {
  Camera,
  CheckCircle2,
  Circle,
  RefreshCw,
} from "lucide-react";
import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

type InventoryRow = {
  id: string;
  name: string;
  category: string;
  location: "Pantry" | "Refrigerator" | "Freezer";
  current_quantity: number;
  minimum_quantity: number;
  target_quantity: number;
  unit: string;
  preferred_store: string | null;
};

type ShoppingItem = InventoryRow & {
  purchased: boolean;
  quantityToBuy: number;
};

export default function Shopping() {
  const receiptInputRef = useRef<HTMLInputElement>(null);

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(
    [],
  );

  const [receiptName, setReceiptName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadShoppingList();
  }, []);

  async function loadShoppingList() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("category")
      .order("name");

    if (error) {
      console.error(error);
      setErrorMessage("The shopping list could not be loaded.");
      setLoading(false);
      return;
    }

    const neededItems = (data as InventoryRow[])
      .filter(
        (item) =>
          Number(item.current_quantity) <
          Number(item.minimum_quantity),
      )
      .map((item) => ({
        ...item,
        current_quantity: Number(item.current_quantity),
        minimum_quantity: Number(item.minimum_quantity),
        target_quantity: Number(item.target_quantity),
        quantityToBuy: Math.max(
          0,
          Number(item.target_quantity) -
            Number(item.current_quantity),
        ),
        purchased: false,
      }));

    setShoppingItems(neededItems);
    setLoading(false);
  }

  function togglePurchased(id: string) {
    setShoppingItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              purchased: !item.purchased,
            }
          : item,
      ),
    );
  }

  function handleReceiptSelection(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setReceiptName(file.name);
    event.target.value = "";
  }

  const remainingCount = shoppingItems.filter(
    (item) => !item.purchased,
  ).length;

  return (
    <main className="p-4 pb-10 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Food Management
            </p>

            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              Shopping List
            </h1>

            <p className="mt-2 text-stone-600">
              Automatically generated from inventory items below
              minimum.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={loadShoppingList}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-3 font-semibold text-stone-700 hover:bg-stone-50"
            >
              <RefreshCw size={19} />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => receiptInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              <Camera size={19} />
              Upload Receipt
            </button>
          </div>
        </div>

        <input
          ref={receiptInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleReceiptSelection}
        />

        {receiptName && (
          <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-900">
              Receipt selected
            </p>

            <p className="mt-1 text-sm text-emerald-800">
              {receiptName}
            </p>

            <p className="mt-2 text-sm text-stone-600">
              Receipt recognition and automatic inventory updates will
              be connected next.
            </p>
          </section>
        )}

        {errorMessage && (
          <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
            {errorMessage}
          </section>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 p-5">
            <div>
              <h2 className="text-xl font-bold">Needed Items</h2>

              <p className="mt-1 text-sm text-stone-500">
                {remainingCount} item
                {remainingCount === 1 ? "" : "s"} remaining
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-stone-500">
              Loading shopping list...
            </div>
          ) : shoppingItems.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2
                className="mx-auto text-emerald-600"
                size={38}
              />

              <p className="mt-3 font-semibold">
                Your shopping list is empty.
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Nothing is currently below its minimum quantity.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {shoppingItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePurchased(item.id)}
                  className="flex w-full items-center gap-4 p-5 text-left hover:bg-stone-50"
                >
                  {item.purchased ? (
                    <CheckCircle2
                      className="shrink-0 text-emerald-600"
                      size={24}
                    />
                  ) : (
                    <Circle
                      className="shrink-0 text-stone-400"
                      size={24}
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-semibold ${
                        item.purchased
                          ? "text-stone-400 line-through"
                          : "text-stone-900"
                      }`}
                    >
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {item.category} · {item.location}
                    </p>

                    {item.preferred_store && (
                      <p className="mt-1 text-xs text-stone-500">
                        Preferred store: {item.preferred_store}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        item.purchased
                          ? "text-stone-400 line-through"
                          : "text-emerald-700"
                      }`}
                    >
                      Buy {item.quantityToBuy} {item.unit}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      Current: {item.current_quantity} {item.unit}
                    </p>

                    <p className="text-sm text-stone-500">
                      Target: {item.target_quantity} {item.unit}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
import { Camera, CheckCircle2, Circle } from "lucide-react";
import { useRef, useState } from "react";
import { inventoryItems } from "../data/inventory";

export default function Shopping() {
  const receiptInputRef = useRef<HTMLInputElement>(null);

  const initialItems = inventoryItems
    .filter((item) => item.current < item.minimum)
    .map((item) => ({
      ...item,
      quantityToBuy: item.target - item.current,
      purchased: false,
    }));

  const [shoppingItems, setShoppingItems] = useState(initialItems);
  const [receiptName, setReceiptName] = useState("");

  function togglePurchased(id: string) {
    setShoppingItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, purchased: !item.purchased }
          : item
      )
    );
  }

  const remainingCount = shoppingItems.filter(
    (item) => !item.purchased
  ).length;

  return (
    <main className="p-5 md:p-8">
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
              Items below their target inventory level.
            </p>
          </div>

          <button
            type="button"
            onClick={() => receiptInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800"
          >
            <Camera size={20} />
            Upload Receipt
          </button>
        </div>

        <input
          ref={receiptInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setReceiptName(file.name);
            }
          }}
        />

        {receiptName && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">
              Receipt selected
            </p>

            <p className="mt-1 text-sm text-emerald-700">
              {receiptName}
            </p>

            <p className="mt-1 text-sm text-stone-600">
              Receipt analysis and automatic inventory updates will be
              connected later.
            </p>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 p-5">
            <div>
              <h2 className="text-xl font-bold">Needed Items</h2>

              <p className="mt-1 text-sm text-stone-500">
                {remainingCount} item{remainingCount === 1 ? "" : "s"} remaining
              </p>
            </div>
          </div>

          {shoppingItems.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2
                className="mx-auto text-emerald-600"
                size={36}
              />

              <p className="mt-3 font-semibold">
                Your shopping list is empty.
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Nothing is currently below its target inventory level.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {shoppingItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePurchased(item.id)}
                  className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-stone-50"
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
                      {item.category} · Current: {item.current} {item.unit}
                    </p>
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
                      Target: {item.target} {item.unit}
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
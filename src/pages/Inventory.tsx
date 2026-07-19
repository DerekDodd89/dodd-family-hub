import {
  Camera,
  CheckCircle2,
  Minus,
  PackagePlus,
  Plus,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  inventoryItems as startingInventory,
  type InventoryItem,
} from "../data/inventory";

type StorageLocation = "Pantry" | "Refrigerator" | "Freezer";
type InventoryFilter = "All" | StorageLocation;

type EditableInventoryItem = InventoryItem & {
  storageLocation: StorageLocation;
};

type InventoryPhoto = {
  name: string;
  url: string;
};

type InventoryPhotos = Partial<Record<StorageLocation, InventoryPhoto>>;

type NewItemForm = {
  name: string;
  category: string;
  storageLocation: StorageLocation;
  current: number;
  minimum: number;
  target: number;
  unit: string;
  preferredStore: string;
};

const emptyNewItem: NewItemForm = {
  name: "",
  category: "",
  storageLocation: "Pantry",
  current: 0,
  minimum: 0,
  target: 0,
  unit: "items",
  preferredStore: "",
};

function determineStorageLocation(location: string): StorageLocation {
  const normalizedLocation = location.toLowerCase();

  if (normalizedLocation.includes("freezer")) {
    return "Freezer";
  }

  if (
    normalizedLocation.includes("pantry") ||
    normalizedLocation.includes("cabinet")
  ) {
    return "Pantry";
  }

  return "Refrigerator";
}

function calculateStatus(
  current: number,
  minimum: number,
): InventoryItem["status"] {
  if (current <= 0) {
    return "OUT";
  }

  if (current < minimum) {
    return "LOW";
  }

  return "GOOD";
}

export default function Inventory() {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [inventoryItems, setInventoryItems] = useState<
    EditableInventoryItem[]
  >(() =>
    startingInventory.map((item) => ({
      ...item,
      storageLocation: determineStorageLocation(item.location),
    })),
  );

  const [activeFilter, setActiveFilter] =
    useState<InventoryFilter>("All");

  const [photoLocation, setPhotoLocation] =
    useState<StorageLocation>("Pantry");

  const [photos, setPhotos] = useState<InventoryPhotos>({});

  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const [newItem, setNewItem] =
    useState<NewItemForm>(emptyNewItem);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return inventoryItems;
    }

    return inventoryItems.filter(
      (item) => item.storageLocation === activeFilter,
    );
  }, [activeFilter, inventoryItems]);

  const lowStockCount = inventoryItems.filter(
    (item) => item.current < item.minimum,
  ).length;

  function openPhotoPicker(location: StorageLocation) {
    setPhotoLocation(location);
    photoInputRef.current?.click();
  }

  function handlePhotoSelection(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotos((currentPhotos) => {
      const existingPhoto = currentPhotos[photoLocation];

      if (existingPhoto) {
        URL.revokeObjectURL(existingPhoto.url);
      }

      return {
        ...currentPhotos,
        [photoLocation]: {
          name: file.name,
          url: URL.createObjectURL(file),
        },
      };
    });

    event.target.value = "";
  }

  function removePhoto(location: StorageLocation) {
    setPhotos((currentPhotos) => {
      const photo = currentPhotos[location];

      if (photo) {
        URL.revokeObjectURL(photo.url);
      }

      const updatedPhotos = { ...currentPhotos };
      delete updatedPhotos[location];

      return updatedPhotos;
    });
  }

  function updateQuantity(id: string, amount: number) {
    setInventoryItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const updatedCurrent = Math.max(0, item.current + amount);

        return {
          ...item,
          current: updatedCurrent,
          status: calculateStatus(
            updatedCurrent,
            item.minimum,
          ),
        };
      }),
    );
  }

  function setQuantity(id: string, quantity: number) {
    const safeQuantity = Number.isFinite(quantity)
      ? Math.max(0, quantity)
      : 0;

    setInventoryItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              current: safeQuantity,
              status: calculateStatus(
                safeQuantity,
                item.minimum,
              ),
            }
          : item,
      ),
    );
  }

  function deleteItem(id: string) {
    setInventoryItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  function addInventoryItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = newItem.name.trim();

    if (!trimmedName) {
      return;
    }

    const itemId = `${trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now()}`;

    const item: EditableInventoryItem = {
      id: itemId,
      name: trimmedName,
      category: newItem.category.trim() || "Other",
      current: Math.max(0, newItem.current),
      minimum: Math.max(0, newItem.minimum),
      target: Math.max(0, newItem.target),
      unit: newItem.unit.trim() || "items",
      preferredStore:
        newItem.preferredStore.trim() || "Not selected",
      location: newItem.storageLocation,
      storageLocation: newItem.storageLocation,
      status: calculateStatus(
        newItem.current,
        newItem.minimum,
      ),
    };

    setInventoryItems((currentItems) => [
      ...currentItems,
      item,
    ]);

    setNewItem(emptyNewItem);
    setShowAddItemForm(false);
  }

  return (
    <main className="p-4 pb-10 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Food Management
            </p>

            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              Inventory
            </h1>

            <p className="mt-2 text-stone-600">
              Manage pantry, refrigerator, and freezer items.
            </p>

            <p className="mt-2 text-sm font-semibold text-amber-700">
              {lowStockCount} item
              {lowStockCount === 1 ? "" : "s"} below minimum
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowAddItemForm((current) => !current)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800"
          >
            {showAddItemForm ? (
              <X size={20} />
            ) : (
              <PackagePlus size={20} />
            )}

            {showAddItemForm ? "Close Form" : "Add Item"}
          </button>
        </div>

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePhotoSelection}
        />

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {(
            [
              "Pantry",
              "Refrigerator",
              "Freezer",
            ] as StorageLocation[]
          ).map((location) => {
            const photo = photos[location];

            return (
              <div
                key={location}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="p-5">
                  <h2 className="text-lg font-bold">
                    {location}
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Take a current photo of the {location.toLowerCase()}.
                  </p>

                  <button
                    type="button"
                    onClick={() => openPhotoPicker(location)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 font-semibold text-emerald-700 hover:bg-emerald-50"
                  >
                    <Camera size={19} />
                    {photo ? "Replace Photo" : "Take Photo"}
                  </button>
                </div>

                {photo && (
                  <div className="border-t border-stone-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-stone-700">
                        {photo.name}
                      </p>

                      <button
                        type="button"
                        onClick={() => removePhoto(location)}
                        className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-red-600"
                        aria-label={`Remove ${location} photo`}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <img
                      src={photo.url}
                      alt={`${location} inventory`}
                      className="mt-3 h-44 w-full rounded-xl object-cover"
                    />

                    <p className="mt-3 text-xs text-stone-500">
                      Photo recognition will later propose inventory
                      changes for your approval.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {showAddItemForm && (
          <section className="mt-7 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-xl font-bold">
              Add Inventory Item
            </h2>

            <form
              onSubmit={addInventoryItem}
              className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <FormField label="Item Name">
                <input
                  required
                  value={newItem.name}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
                  placeholder="Example: Brown rice"
                />
              </FormField>

              <FormField label="Category">
                <input
                  value={newItem.category}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
                  placeholder="Pantry, Dairy, Meat..."
                />
              </FormField>

              <FormField label="Location">
                <select
                  value={newItem.storageLocation}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      storageLocation:
                        event.target.value as StorageLocation,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
                >
                  <option value="Pantry">Pantry</option>
                  <option value="Refrigerator">
                    Refrigerator
                  </option>
                  <option value="Freezer">Freezer</option>
                </select>
              </FormField>

              <FormField label="Unit">
                <input
                  value={newItem.unit}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      unit: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
                  placeholder="items, pounds, gallons..."
                />
              </FormField>

              <NumberField
                label="Current"
                value={newItem.current}
                onChange={(value) =>
                  setNewItem((current) => ({
                    ...current,
                    current: value,
                  }))
                }
              />

              <NumberField
                label="Minimum"
                value={newItem.minimum}
                onChange={(value) =>
                  setNewItem((current) => ({
                    ...current,
                    minimum: value,
                  }))
                }
              />

              <NumberField
                label="Target"
                value={newItem.target}
                onChange={(value) =>
                  setNewItem((current) => ({
                    ...current,
                    target: value,
                  }))
                }
              />

              <FormField label="Preferred Store">
                <input
                  value={newItem.preferredStore}
                  onChange={(event) =>
                    setNewItem((current) => ({
                      ...current,
                      preferredStore: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
                  placeholder="H-E-B, Lowe's, United..."
                />
              </FormField>

              <div className="md:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                >
                  Save Item
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 p-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Pantry",
                  "Refrigerator",
                  "Freezer",
                ] as InventoryFilter[]
              ).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    activeFilter === filter
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-stone-200">
            {filteredItems.map((item) => {
              const isLow = item.current < item.minimum;

              return (
                <article
                  key={item.id}
                  className="p-4 md:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold">
                          {item.name}
                        </h3>

                        {isLow ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                            <TriangleAlert size={14} />
                            Low
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                            <CheckCircle2 size={14} />
                            Good
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-stone-500">
                        {item.category} · {item.storageLocation}
                      </p>

                      <p className="mt-1 text-sm text-stone-500">
                        Minimum: {item.minimum} {item.unit} · Target:{" "}
                        {item.target} {item.unit}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                        className="rounded-xl border border-stone-300 p-2.5 text-stone-700 hover:bg-stone-100"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus size={20} />
                      </button>

                      <label className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={item.current}
                          onChange={(event) =>
                            setQuantity(
                              item.id,
                              Number(event.target.value),
                            )
                          }
                          className="w-16 bg-transparent text-center font-bold outline-none"
                          aria-label={`${item.name} current quantity`}
                        />

                        <span className="text-sm text-stone-500">
                          {item.unit}
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                        className="rounded-xl border border-stone-300 p-2.5 text-stone-700 hover:bg-stone-100"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="rounded-xl border border-red-200 p-2.5 text-red-600 hover:bg-red-50"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-stone-500">
              No inventory items are assigned to this location.
            </div>
          )}
        </section>

        <p className="mt-4 text-center text-xs text-stone-500">
          Manual changes currently remain until the page is refreshed.
          Supabase persistence will be connected next.
        </p>
      </div>
    </main>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-stone-700">
        {label}
      </span>

      {children}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <FormField label={label}>
      <input
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(event) =>
          onChange(Math.max(0, Number(event.target.value)))
        }
        className="w-full rounded-xl border border-stone-300 px-3 py-2.5"
      />
    </FormField>
  );
}
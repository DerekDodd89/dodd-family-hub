export type InventoryStatus = "GOOD" | "LOW" | "OUT";

export interface InventoryItem {
  id: string;
  category: string;
  name: string;
  current: number;
  minimum: number;
  target: number;
  unit: string;
  location: string;
  preferredStore: string;
  status: InventoryStatus;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "eggs",
    category: "Breakfast",
    name: "Eggs",
    current: 6,
    minimum: 6,
    target: 8,
    unit: "dozen",
    location: "Kitchen refrigerator",
    preferredStore: "Lowe's Market",
    status: "GOOD",
  },
  {
    id: "activia-yogurt",
    category: "Dairy",
    name: "Activia Yogurt",
    current: 5,
    minimum: 7,
    target: 9,
    unit: "packs",
    location: "Kitchen refrigerator",
    preferredStore: "Lowe's Market",
    status: "LOW",
  },
  {
    id: "ratio-yogurt",
    category: "Dairy",
    name: "Ratio Protein Yogurt",
    current: 2,
    minimum: 7,
    target: 10,
    unit: "cups",
    location: "Kitchen refrigerator",
    preferredStore: "Lowe's Market",
    status: "LOW",
  },
  {
    id: "apples",
    category: "Produce",
    name: "Apples",
    current: 1,
    minimum: 1,
    target: 2,
    unit: "5 lb bags",
    location: "Kitchen refrigerator",
    preferredStore: "Lowe's Market",
    status: "GOOD",
  },
  {
    id: "milk",
    category: "Dairy",
    name: "Whole Milk",
    current: 6,
    minimum: 4,
    target: 6,
    unit: "gallons",
    location: "Kitchen refrigerator",
    preferredStore: "Lowe's Market",
    status: "GOOD",
  },
  {
    id: "chicken-breast",
    category: "Meat",
    name: "Chicken Breast",
    current: 6,
    minimum: 2,
    target: 8,
    unit: "family packs",
    location: "Garage refrigerator",
    preferredStore: "H-E-B",
    status: "GOOD",
  },
  {
    id: "ground-beef",
    category: "Meat",
    name: "Ground Beef",
    current: 2,
    minimum: 2,
    target: 5,
    unit: "family packs",
    location: "Garage refrigerator",
    preferredStore: "H-E-B",
    status: "GOOD",
  },
  {
    id: "pork-chop-lunches",
    category: "Prepared Meals",
    name: "Dad's Pork Chop Lunches",
    current: 10,
    minimum: 5,
    target: 10,
    unit: "meal containers",
    location: "Garage refrigerator",
    preferredStore: "Home prepared",
    status: "GOOD",
  },
];
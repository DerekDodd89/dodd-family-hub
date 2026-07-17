export type RecipeCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snack"
  | "Dessert"
  | "Meal Prep"
  | "Game Day";

export type RecipeTag =
  | "High Protein"
  | "Low Calorie"
  | "Air Fryer"
  | "Ninja Creami"
  | "Freezer Friendly"
  | "Family Favorite"
  | "Kid Friendly"
  | "Chicken"
  | "Beef"
  | "Breakfast"
  | "Dessert"
  | "Meal Prep"


export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  inventoryItemId?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  source: string;
  sourcePage: number;
  servings: number;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: RecipeTag[];
  ingredients: RecipeIngredient[];
  instructions: string[];
}

export const recipes: Recipe[] = [
  {
    id: "meal-prep-frozen-breakfast-burritos",
    name: "Meal Prep Frozen Breakfast Burritos",
    category: "Breakfast",
    source: "High Protein Breakfast Recipes",
    sourcePage: 2,
    servings: 6,
    servingSize: "1 burrito",
    calories: 472,
    protein: 47,
    carbs: 44,
    fat: 12,
    tags: [
      "High Protein",
      "Meal Prep",
      "Freezer Friendly",
      "Breakfast",
    ],
    ingredients: [
      {
        name: "Frozen fajita vegetables",
        amount: 1,
        unit: "bag",
      },
      {
        name: "Lean ground turkey",
        amount: 8,
        unit: "oz",
      },
      {
        name: "Lean ground beef",
        amount: 8,
        unit: "oz",
        inventoryItemId: "ground-beef",
      },
      {
        name: "Taco seasoning",
        amount: 1,
        unit: "packet",
      },
      {
        name: "Cottage cheese",
        amount: 450,
        unit: "g",
      },
      {
        name: "Nutritional yeast",
        amount: 8,
        unit: "g",
      },
      {
        name: "Egg whites",
        amount: 400,
        unit: "g",
      },
      {
        name: "Large eggs",
        amount: 6,
        unit: "eggs",
        inventoryItemId: "eggs",
      },
      {
        name: "Burrito tortillas",
        amount: 6,
        unit: "tortillas",
      },
      {
        name: "Frank's RedHot",
        amount: 30,
        unit: "g",
      },
      {
        name: "Sugar-free pancake syrup",
        amount: 30,
        unit: "g",
      },
    ],
    instructions: [
      "Cook the fajita vegetables until softened and lightly browned.",
      "Add the turkey and beef, then cook until browned.",
      "Mix in taco seasoning, cottage cheese, and nutritional yeast.",
      "Cook until the extra liquid reduces, then cool the mixture.",
      "Scramble the egg whites and eggs, then let them cool.",
      "Divide the meat and egg mixtures evenly among the tortillas.",
      "Roll into burritos, wrap in foil, and freeze.",
      "To serve, remove the foil, microwave to thaw, then air fry until golden.",
    ],
  },
  {
    id: "mcchicken-salad",
    name: "McChicken Salad",
    category: "Lunch",
    source: "One Chicken Breast, 33 Meals",
    sourcePage: 2,
    servings: 1,
    servingSize: "1 whole salad",
    calories: 357,
    protein: 50,
    carbs: 28,
    fat: 5,
    tags: ["High Protein", "Low Calorie", "Chicken"],
    ingredients: [
      {
        name: "Lean ground chicken breast",
        amount: 16,
        unit: "oz",
        inventoryItemId: "chicken-breast",
      },
      {
        name: "Yellow mustard",
        amount: 20,
        unit: "g",
      },
      {
        name: "Panko",
        amount: 30,
        unit: "g",
      },
      {
        name: "Lettuce",
        amount: 100,
        unit: "g",
      },
      {
        name: "Romaine",
        amount: 100,
        unit: "g",
      },
      {
        name: "Grape tomatoes",
        amount: 50,
        unit: "g",
      },
      {
        name: "Red onion",
        amount: 50,
        unit: "g",
      },
      {
        name: "Dill pickles",
        amount: 50,
        unit: "g",
      },
      {
        name: "Sharp cheddar cheese",
        amount: 14,
        unit: "g",
      },
      {
        name: "Plain nonfat Greek yogurt",
        amount: 113,
        unit: "g",
      },
      {
        name: "Sugar-free ketchup",
        amount: 40,
        unit: "g",
      },
      {
        name: "Dijon mustard",
        amount: 16,
        unit: "g",
      },
    ],
    instructions: [
      "Mix the dressing ingredients until smooth and refrigerate.",
      "Combine the ground chicken, mustard, and seasonings.",
      "Form four patties and coat them with seasoned panko.",
      "Air fry at 400°F for 9 to 10 minutes.",
      "Build the salad with the vegetables, chicken, cheese, and dressing.",
    ],
  },
  {
    id: "birthday-cake-batter-protein-ice-cream",
    name: "Birthday Cake Batter Protein Ice Cream",
    category: "Dessert",
    source: "High Protein Ice Creami",
    sourcePage: 6,
    servings: 1,
    servingSize: "1 pint",
    calories: 255,
    protein: 36,
    carbs: 17,
    fat: 4,
    tags: ["High Protein", "Ninja Creami", "Dessert"],
    ingredients: [
      {
        name: "Fat-free milk",
        amount: 225,
        unit: "g",
        inventoryItemId: "milk",
      },
      {
        name: "Unsweetened vanilla almond milk",
        amount: 225,
        unit: "g",
      },
      {
        name: "Cake batter extract",
        amount: 5,
        unit: "g",
      },
      {
        name: "Vanilla protein powder",
        amount: 30,
        unit: "g",
      },
      {
        name: "Sugar-free cheesecake pudding mix",
        amount: 8,
        unit: "g",
      },
      {
        name: "Zero-calorie sweetener",
        amount: 5,
        unit: "g",
      },
      {
        name: "Sprinkles",
        amount: 20,
        unit: "g",
      },
    ],
    instructions: [
      "Blend all ingredients except the sprinkles until smooth.",
      "Freeze the pint overnight.",
      "Process using the Lite Ice Cream setting.",
      "Make a hole in the center and add the sprinkles.",
      "Run the mix-in setting and serve.",
    ],
  },
];
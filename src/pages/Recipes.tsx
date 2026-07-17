import { recipes } from "../data/recipes";

function Recipes() {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-4xl font-bold">Recipe Library</h1>

      <p className="mt-2 text-stone-600">
        Search and browse family recipes.
      </p>

      <div className="mt-8 grid gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {recipe.name}
                </h2>

                <p className="mt-1 text-stone-500">
                  {recipe.category} • {recipe.source}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-emerald-700">
                  {recipe.protein}g Protein
                </p>

                <p className="text-sm text-stone-500">
                  {recipe.calories} Calories
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 text-sm text-stone-600">
              Serves {recipe.servings} • {recipe.servingSize}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Recipes;
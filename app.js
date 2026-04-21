const STORAGE_KEY = "trackyourmeal_state_v1";

const defaultState = {
  profileName: "Meal Tracker User",
  proteinGoal: 140,
  calorieGoal: 2400,
  age: 25,
  sex: "male",
  heightCm: 175,
  weightKg: 70,
  activityFactor: 1.55,
  goal: "maintain",
  meals: [],
};

const templates = [
  {
    name: "Greek Yogurt Bowl",
    type: "Breakfast",
    calories: 300,
    protein: 20,
    carbs: 26,
    fats: 8,
  },
  {
    name: "Protein Shake",
    type: "Snack",
    calories: 220,
    protein: 30,
    carbs: 10,
    fats: 7,
  },
  {
    name: "Salmon Plate",
    type: "Dinner",
    calories: 560,
    protein: 38,
    carbs: 34,
    fats: 23,
  },
];

const mealTypes = [
  "All",
  "Breakfast",
  "Lunch",
  "Afternoon Break",
  "Dinner",
  "Snack",
];

const foodDb = {
  egg: {
    display: "Egg",
    per100: { calories: 143, protein: 13, carbs: 1.1, fats: 9.5 },
    units: { small: 38, medium: 44, large: 50 },
  },
  "chicken breast": {
    display: "Chicken Breast",
    per100: { calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    units: { gram: 1, serving: 120 },
  },
  rice: {
    display: "Cooked Rice",
    per100: { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
    units: { gram: 1, cup: 158 },
  },
  oats: {
    display: "Oats",
    per100: { calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9 },
    units: { gram: 1, cup: 80 },
  },
  banana: {
    display: "Banana",
    per100: { calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 },
    units: { gram: 1, medium: 118, large: 136 },
  },
  pizza: {
    display: "Pizza",
    per100: { calories: 266, protein: 11, carbs: 33, fats: 10 },
    units: { slice: 100, small: 85, medium: 107, large: 130 },
  },
  creatine: {
    display: "Creatine",
    per100: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    units: { scoop: 5, double: 10, container: 300 },
  },
  "greek yogurt": {
    display: "Greek Yogurt",
    per100: { calories: 97, protein: 10, carbs: 3.9, fats: 5 },
    units: { gram: 1, cup: 245 },
  },
  tuna: {
    display: "Tuna",
    per100: { calories: 132, protein: 28, carbs: 0, fats: 1.3 },
    units: { gram: 1, can: 120 },
  },
  potato: {
    display: "Potato",
    per100: { calories: 87, protein: 1.9, carbs: 20.1, fats: 0.1 },
    units: { gram: 1, medium: 173 },
  },
  bread: {
    display: "Bread",
    per100: { calories: 265, protein: 9, carbs: 49, fats: 3.2 },
    units: { gram: 1, slice: 30 },
  },
  "chicken adobo": {
    display: "Chicken Adobo",
    per100: { calories: 210, protein: 20, carbs: 4, fats: 12 },
    units: { gram: 1, serving: 220, cup: 200 },
  },
  "pork adobo": {
    display: "Pork Adobo",
    per100: { calories: 290, protein: 18, carbs: 4, fats: 22 },
    units: { gram: 1, serving: 220, cup: 200 },
  },
  sinigang: {
    display: "Sinigang",
    per100: { calories: 95, protein: 8, carbs: 6, fats: 4 },
    units: { gram: 1, bowl: 320, serving: 300 },
  },
  tinola: {
    display: "Tinola",
    per100: { calories: 105, protein: 11, carbs: 4, fats: 5 },
    units: { gram: 1, bowl: 320, serving: 300 },
  },
  "kare-kare": {
    display: "Kare-Kare",
    per100: { calories: 230, protein: 11, carbs: 10, fats: 16 },
    units: { gram: 1, serving: 250, cup: 220 },
  },
  sisig: {
    display: "Sisig",
    per100: { calories: 265, protein: 16, carbs: 5, fats: 20 },
    units: { gram: 1, serving: 180, plate: 200 },
  },
  "bicol express": {
    display: "Bicol Express",
    per100: { calories: 265, protein: 10, carbs: 6, fats: 22 },
    units: { gram: 1, serving: 220, cup: 200 },
  },
  laing: {
    display: "Laing",
    per100: { calories: 185, protein: 4, carbs: 8, fats: 15 },
    units: { gram: 1, serving: 180, cup: 170 },
  },
  menudo: {
    display: "Menudo",
    per100: { calories: 180, protein: 10, carbs: 11, fats: 10 },
    units: { gram: 1, serving: 240, cup: 220 },
  },
  afritada: {
    display: "Afritada",
    per100: { calories: 170, protein: 12, carbs: 9, fats: 9 },
    units: { gram: 1, serving: 240, cup: 220 },
  },
  kaldereta: {
    display: "Kaldereta",
    per100: { calories: 220, protein: 13, carbs: 8, fats: 14 },
    units: { gram: 1, serving: 240, cup: 220 },
  },
  pochero: {
    display: "Pochero",
    per100: { calories: 145, protein: 9, carbs: 10, fats: 7 },
    units: { gram: 1, bowl: 320, serving: 300 },
  },
  "nilagang baka": {
    display: "Nilagang Baka",
    per100: { calories: 140, protein: 11, carbs: 7, fats: 7 },
    units: { gram: 1, bowl: 320, serving: 300 },
  },
  bulalo: {
    display: "Bulalo",
    per100: { calories: 125, protein: 10, carbs: 3, fats: 8 },
    units: { gram: 1, bowl: 350, serving: 320 },
  },
  "pancit bihon": {
    display: "Pancit Bihon",
    per100: { calories: 165, protein: 7, carbs: 24, fats: 4 },
    units: { gram: 1, serving: 230, plate: 250 },
  },
  "pancit canton": {
    display: "Pancit Canton",
    per100: { calories: 185, protein: 7, carbs: 26, fats: 6 },
    units: { gram: 1, serving: 230, plate: 250 },
  },
  palabok: {
    display: "Palabok",
    per100: { calories: 200, protein: 8, carbs: 24, fats: 8 },
    units: { gram: 1, serving: 230, plate: 250 },
  },
  "lumpia shanghai": {
    display: "Lumpia Shanghai",
    per100: { calories: 280, protein: 10, carbs: 17, fats: 19 },
    units: { gram: 1, piece: 25, serving: 120 },
  },
  "chicken inasal": {
    display: "Chicken Inasal",
    per100: { calories: 205, protein: 24, carbs: 2, fats: 11 },
    units: { gram: 1, serving: 200, piece: 150 },
  },
  tapsilog: {
    display: "Tapsilog",
    per100: { calories: 225, protein: 10, carbs: 24, fats: 10 },
    units: { gram: 1, serving: 350, plate: 380 },
  },
  tosilog: {
    display: "Tosilog",
    per100: { calories: 240, protein: 8, carbs: 26, fats: 12 },
    units: { gram: 1, serving: 350, plate: 380 },
  },
  longsilog: {
    display: "Longsilog",
    per100: { calories: 255, protein: 8, carbs: 25, fats: 14 },
    units: { gram: 1, serving: 350, plate: 380 },
  },
  "bangus sisig": {
    display: "Bangus Sisig",
    per100: { calories: 185, protein: 16, carbs: 4, fats: 11 },
    units: { gram: 1, serving: 180, plate: 200 },
  },
  "ginataang gulay": {
    display: "Ginataang Gulay",
    per100: { calories: 145, protein: 4, carbs: 10, fats: 10 },
    units: { gram: 1, serving: 220, cup: 200 },
  },
  "ginisang monggo": {
    display: "Ginisang Monggo",
    per100: { calories: 135, protein: 7, carbs: 16, fats: 5 },
    units: { gram: 1, bowl: 280, serving: 250 },
  },
};

const runtime = {
  activeFilter: "All",
  searchTerm: "",
  selectedFoodKey: null,
  inferredFood: null,
  sqliteAvailable: false,
  sqliteSyncInFlight: false,
};

const state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(defaultState);
    }
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      meals: Array.isArray(parsed.meals) ? parsed.meals : [],
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  queueSQLiteSave();
}

let sqliteSaveTimer;

function mergeLoadedState(nextState) {
  if (!nextState || typeof nextState !== "object") {
    return;
  }

  const merged = {
    ...structuredClone(defaultState),
    ...nextState,
    meals: Array.isArray(nextState.meals) ? nextState.meals : [],
  };

  Object.assign(state, merged);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function tryLoadStateFromSQLite() {
  try {
    const response = await fetch("/api/state", { method: "GET" });
    if (!response.ok) {
      return;
    }

    const payload = await response.json();
    mergeLoadedState(payload.state);
    runtime.sqliteAvailable = true;
  } catch {
    runtime.sqliteAvailable = false;
  }
}

async function pushStateToSQLite() {
  if (runtime.sqliteSyncInFlight) {
    return;
  }

  runtime.sqliteSyncInFlight = true;
  try {
    const response = await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    runtime.sqliteAvailable = response.ok;
  } catch {
    runtime.sqliteAvailable = false;
  } finally {
    runtime.sqliteSyncInFlight = false;
  }
}

function queueSQLiteSave() {
  clearTimeout(sqliteSaveTimer);
  sqliteSaveTimer = setTimeout(() => {
    void pushStateToSQLite();
  }, 120);
}

function qs(id) {
  return document.getElementById(id);
}

function calculateTargets(profile) {
  const base =
    profile.sex === "male"
      ? 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + 5
      : 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age - 161;

  let calories = base * profile.activityFactor;
  if (profile.goal === "cut") {
    calories -= 350;
  }
  if (profile.goal === "bulk") {
    calories += 300;
  }

  const protein =
    profile.goal === "bulk" ? profile.weightKg * 2.1 : profile.weightKg * 1.8;
  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
  };
}

function calculateBmi(weightKg, heightCm) {
  const meters = heightCm / 100;
  return weightKg / (meters * meters);
}

function normalizeFoodKey(text) {
  return String(text || "")
    .toLowerCase()
    .trim();
}

function inferPer100FromName(foodName) {
  const name = normalizeFoodKey(foodName);
  const profiles = [
    {
      test: /adobo|sinigang|tinola|kare|sisig|bicol|laing|menudo|afritada|kaldereta|pochero|nilaga|bulalo|pancit|palabok|lumpia|inasal|silog|monggo|ginataan/,
      per100: { calories: 190, protein: 11, carbs: 13, fats: 10 },
    },
    {
      test: /chicken|tuna|fish|beef|meat|turkey|egg|protein/,
      per100: { calories: 170, protein: 27, carbs: 1, fats: 6 },
    },
    {
      test: /rice|bread|oat|potato|pasta|banana|apple|fruit/,
      per100: { calories: 130, protein: 3, carbs: 28, fats: 1 },
    },
    {
      test: /nuts|peanut|butter|oil|avocado|cheese/,
      per100: { calories: 520, protein: 14, carbs: 12, fats: 44 },
    },
    {
      test: /creatine|supplement|monohydrate|preworkout|pre-workout/,
      per100: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    },
    {
      test: /vegetable|salad|broccoli|spinach|cucumber|tomato/,
      per100: { calories: 35, protein: 2.5, carbs: 6, fats: 0.4 },
    },
  ];

  const matched = profiles.find((profile) => profile.test.test(name));
  return matched
    ? matched.per100
    : { calories: 160, protein: 8, carbs: 18, fats: 6 };
}

function getTodayMeals() {
  const today = new Date().toDateString();
  return state.meals.filter(
    (meal) => new Date(meal.createdAt).toDateString() === today,
  );
}

function getFilteredMeals() {
  return getTodayMeals().filter((meal) => {
    const typeMatch =
      runtime.activeFilter === "All" || meal.type === runtime.activeFilter;
    const searchMatch = meal.name
      .toLowerCase()
      .includes(runtime.searchTerm.toLowerCase().trim());
    return typeMatch && searchMatch;
  });
}

function getDailyTotals() {
  return getTodayMeals().reduce(
    (acc, meal) => {
      acc.calories += Number(meal.calories) || 0;
      acc.protein += Number(meal.protein) || 0;
      acc.carbs += Number(meal.carbs) || 0;
      acc.fats += Number(meal.fats) || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  );
}

function addMeal(data) {
  state.meals.unshift({
    id: crypto.randomUUID(),
    name: data.name,
    type: data.type,
    calories: data.calories,
    protein: data.protein,
    carbs: data.carbs,
    fats: data.fats,
    createdAt: new Date().toISOString(),
  });
  saveState();
}

function deleteMeal(id) {
  state.meals = state.meals.filter((meal) => meal.id !== id);
  saveState();
}

function getPast7DaysData() {
  const days = [];
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const key = date.toDateString();

    const totals = state.meals
      .filter((meal) => new Date(meal.createdAt).toDateString() === key)
      .reduce(
        (acc, meal) => {
          acc.calories += Number(meal.calories) || 0;
          acc.protein += Number(meal.protein) || 0;
          return acc;
        },
        { calories: 0, protein: 0 },
      );

    days.push({
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      calories: totals.calories,
      protein: totals.protein,
    });
  }
  return days;
}

function renderHome() {
  const todayDate = qs("todayDate");
  const totalCalories = qs("totalCalories");
  const totalProtein = qs("totalProtein");
  const goalText = qs("goalText");
  const goalProgress = qs("goalProgress");
  const dailyStatusBadge = qs("dailyStatusBadge");
  const mealFilters = qs("mealFilters");
  const mealList = qs("mealList");
  const mealSearch = qs("mealSearch");
  const emptyMealsHint = qs("emptyMealsHint");
  const suggestionList = qs("suggestionList");
  const splash = qs("splash");
  const mainApp = qs("mainApp");
  const startBtn = qs("startBtn");
  let splashHideTimer = null;

  if (!todayDate || !mealList) {
    return;
  }

  function draw() {
    todayDate.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const daily = getDailyTotals();
    totalCalories.textContent = Math.round(daily.calories);
    totalProtein.textContent = Math.round(daily.protein);

    const ratio =
      state.proteinGoal > 0
        ? Math.min(100, Math.round((daily.protein / state.proteinGoal) * 100))
        : 0;
    goalText.textContent = `${ratio}%`;
    goalProgress.style.width = `${ratio}%`;

    if (
      daily.protein >= state.proteinGoal &&
      daily.calories >= state.calorieGoal * 0.9
    ) {
      dailyStatusBadge.textContent = "Goal Reached";
    } else if (daily.protein >= state.proteinGoal * 0.7) {
      dailyStatusBadge.textContent = "Almost There";
    } else {
      dailyStatusBadge.textContent = "On Track";
    }

    mealFilters.innerHTML = mealTypes
      .map(
        (type) =>
          `<button class="chip ${runtime.activeFilter === type ? "active" : ""}" data-filter="${type}">${type}</button>`,
      )
      .join("");

    const meals = getFilteredMeals();
    mealList.innerHTML = meals
      .map((meal) => {
        const timeLabel = new Date(meal.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `<li class="meal-item"><div><h4>${meal.name}</h4><p class="meal-meta">${meal.type} | ${meal.calories} kcal | ${meal.protein}g protein | ${meal.carbs || 0}g carbs | ${meal.fats || 0}g fats | ${timeLabel}</p></div><button class="remove-btn" data-delete-id="${meal.id}">Delete</button></li>`;
      })
      .join("");

    emptyMealsHint.classList.toggle("hidden", meals.length > 0);

    const remainCalories = Math.max(0, state.calorieGoal - daily.calories);
    const remainProtein = Math.max(0, state.proteinGoal - daily.protein);
    const suggestions = [];

    if (remainProtein > 50) {
      suggestions.push(
        "High protein needed: try chicken breast, tuna, eggs, or Greek yogurt.",
      );
    } else if (remainProtein > 20) {
      suggestions.push(
        "Moderate protein left: add milk plus oats, yogurt bowl, or 2 eggs.",
      );
    } else {
      suggestions.push(
        "Protein target is nearly done. Focus on vegetables and hydration.",
      );
    }

    if (remainCalories > 700) {
      suggestions.push(
        "Calories are low for your target. Add rice or potato with lean protein.",
      );
    } else if (remainCalories > 250) {
      suggestions.push(
        "You still have room for a balanced snack with carbs and protein.",
      );
    } else {
      suggestions.push(
        "Calorie target is nearly met. Keep your final meal lighter.",
      );
    }

    suggestionList.innerHTML = suggestions
      .map((text) => `<li>${text}</li>`)
      .join("");
  }

  draw();

  mealFilters.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.filter) {
      return;
    }
    runtime.activeFilter = target.dataset.filter;
    draw();
  });

  mealSearch.addEventListener("input", () => {
    runtime.searchTerm = mealSearch.value;
    draw();
  });

  mealList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.deleteId) {
      return;
    }
    deleteMeal(target.dataset.deleteId);
    draw();
  });

  if (splash && mainApp && startBtn) {
    const syncSplashToScroll = () => {
      if (!document.body.classList.contains("tracking-started")) {
        return;
      }

      if (window.scrollY <= 24) {
        window.clearTimeout(splashHideTimer);
        splash.classList.remove("hidden", "splash-closing");
        return;
      }

      splash.classList.add("splash-closing");
      window.clearTimeout(splashHideTimer);
      splashHideTimer = window.setTimeout(() => {
        if (window.scrollY > 24) {
          splash.classList.add("hidden");
        }
      }, 280);
    };

    window.addEventListener("scroll", syncSplashToScroll, { passive: true });

    startBtn.addEventListener("click", () => {
      if (document.body.classList.contains("tracking-started")) {
        return;
      }

      document.body.classList.add("tracking-started");
      mainApp.classList.remove("hidden");
      splash.classList.add("splash-closing");
      draw();

      window.setTimeout(() => {
        splash.classList.add("hidden");
        mainApp.scrollIntoView({ behavior: "smooth", block: "start" });
        syncSplashToScroll();
      }, 420);
    });
  }
}

function resolveFoodKey(inputText) {
  const normalized = normalizeFoodKey(inputText);
  const compact = normalized.replace(/[^a-z0-9]/g, "");

  const exact = Object.keys(foodDb).find(
    (key) =>
      key === normalized || foodDb[key].display.toLowerCase() === normalized,
  );
  if (exact) {
    return exact;
  }

  const compactMatch = Object.keys(foodDb).find((key) => {
    const keyCompact = key.replace(/[^a-z0-9]/g, "");
    const displayCompact = foodDb[key].display
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    return keyCompact === compact || displayCompact === compact;
  });
  if (compactMatch) {
    return compactMatch;
  }

  return (
    Object.keys(foodDb).find(
      (key) =>
        key.includes(normalized) ||
        normalized.includes(key) ||
        foodDb[key].display.toLowerCase().includes(normalized),
    ) || null
  );
}

function estimateFoodNutrition(foodKey, quantity, unitKey) {
  if (!foodKey && runtime.inferredFood) {
    const unitMultiplier = unitKey === "serving" ? 120 : 1;
    const grams = quantity * unitMultiplier;
    const factor = grams / 100;
    return {
      foodLabel: runtime.inferredFood.display,
      unitLabel: unitKey === "serving" ? "serving" : "gram",
      grams: Math.round(grams),
      calories: Math.round(runtime.inferredFood.per100.calories * factor),
      protein: Math.round(runtime.inferredFood.per100.protein * factor),
      carbs: Math.round(runtime.inferredFood.per100.carbs * factor),
      fats: Math.round(runtime.inferredFood.per100.fats * factor),
    };
  }

  const food = foodDb[foodKey];
  if (!food || !food.units[unitKey]) {
    return null;
  }

  const grams = quantity * food.units[unitKey];
  const factor = grams / 100;
  return {
    foodLabel: food.display,
    unitLabel:
      foodKey === "pizza"
        ? {
            slice: "slice",
            small: "small slice",
            medium: "medium slice",
            large: "large slice",
          }[unitKey] || unitKey
        : unitKey,
    grams: Math.round(grams),
    calories: Math.round(food.per100.calories * factor),
    protein: Math.round(food.per100.protein * factor),
    carbs: Math.round(food.per100.carbs * factor),
    fats: Math.round(food.per100.fats * factor),
  };
}

function renderFoodUnits(foodUnit, foodKey) {
  if (!foodUnit) {
    return;
  }

  if (!foodKey && !runtime.inferredFood) {
    foodUnit.innerHTML = "<option value=''>Select food first</option>";
    return;
  }

  if (!foodKey && runtime.inferredFood) {
    foodUnit.innerHTML =
      "<option value='gram'>gram</option><option value='serving'>serving</option>";
    return;
  }

  const units = Object.keys(foodDb[foodKey].units);
  foodUnit.innerHTML = units
    .map((unit) => {
      const label =
        foodKey === "pizza"
          ? {
              slice: "slice",
              small: "small slice",
              medium: "medium slice",
              large: "large slice",
            }[unit] || unit
          : unit;
      return `<option value="${unit}">${label}</option>`;
    })
    .join("");
}

function updateFoodQuantityRules(foodQuantity, foodKey) {
  if (!foodQuantity) {
    return;
  }

  if (foodKey === "creatine") {
    foodQuantity.min = "1";
    foodQuantity.step = "1";
    if (Number(foodQuantity.value) < 1) {
      foodQuantity.value = "1";
    }
    return;
  }

  foodQuantity.min = "0.25";
  foodQuantity.step = "0.25";
}

function renderAddMeal() {
  const form = qs("addMealForm");
  if (!form) {
    return;
  }

  const foodInput = qs("foodInput");
  const foodQuantity = qs("foodQuantity");
  const foodUnit = qs("foodUnit");
  const foodEstimate = qs("foodEstimate");
  const foodOptions = qs("foodOptions");
  const applyFoodEstimateBtn = qs("applyFoodEstimateBtn");
  const mealName = qs("mealName");
  const mealType = qs("mealType");
  const calories = qs("calories");
  const protein = qs("protein");
  const carbs = qs("carbs");
  const fats = qs("fats");
  const templateButtons = qs("templateButtons");
  const addMealMessage = qs("addMealMessage");

  foodOptions.innerHTML = Object.keys(foodDb)
    .map((key) => `<option value="${foodDb[key].display}"></option>`)
    .join("");

  function drawEstimate() {
    const quantity = Number(foodQuantity.value || 1);
    const unit = foodUnit.value;
    if (
      (!runtime.selectedFoodKey && !runtime.inferredFood) ||
      !unit ||
      quantity <= 0
    ) {
      foodEstimate.textContent =
        "Select a food to auto-calculate calories and protein.";
      return;
    }

    const estimate = estimateFoodNutrition(
      runtime.selectedFoodKey,
      quantity,
      unit,
    );
    if (!estimate) {
      foodEstimate.textContent =
        "Food not found. Use manual entry for custom foods.";
      return;
    }

    foodEstimate.textContent = `${quantity} ${estimate.unitLabel} (${estimate.grams}g): ${estimate.calories} kcal, ${estimate.protein}g protein, ${estimate.carbs}g carbs, ${estimate.fats}g fats`;
  }

  foodInput.addEventListener("input", () => {
    runtime.selectedFoodKey = resolveFoodKey(foodInput.value);
    runtime.inferredFood = null;

    if (!runtime.selectedFoodKey && foodInput.value.trim().length >= 2) {
      runtime.inferredFood = {
        display: foodInput.value.trim(),
        per100: inferPer100FromName(foodInput.value),
      };
    }

    renderFoodUnits(foodUnit, runtime.selectedFoodKey);
    updateFoodQuantityRules(foodQuantity, runtime.selectedFoodKey);
    drawEstimate();
  });

  foodQuantity.addEventListener("input", drawEstimate);
  foodUnit.addEventListener("change", drawEstimate);

  applyFoodEstimateBtn.addEventListener("click", () => {
    const quantity = Number(foodQuantity.value || 1);
    const unit = foodUnit.value;
    const estimate = estimateFoodNutrition(
      runtime.selectedFoodKey,
      quantity,
      unit,
    );

    if (!estimate) {
      addMealMessage.textContent =
        "Could not estimate food. Enter meal values manually.";
      return;
    }

    mealName.value = `${estimate.foodLabel} (${quantity} ${estimate.unitLabel})`;
    calories.value = estimate.calories;
    protein.value = estimate.protein;
    carbs.value = estimate.carbs;
    fats.value = estimate.fats;
    addMealMessage.textContent = "Auto values applied.";
  });

  templateButtons.innerHTML = templates
    .map(
      (item, idx) =>
        `<button class="chip" data-template-index="${idx}">${item.name} (${item.protein}g)</button>`,
    )
    .join("");

  templateButtons.addEventListener("click", (event) => {
    const target = event.target;
    if (
      !(target instanceof HTMLElement) ||
      target.dataset.templateIndex === undefined
    ) {
      return;
    }

    const template = templates[Number(target.dataset.templateIndex)];
    mealName.value = template.name;
    mealType.value = template.type;
    calories.value = template.calories;
    protein.value = template.protein;
    carbs.value = template.carbs;
    fats.value = template.fats;
    addMealMessage.textContent = "Template applied.";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = {
      name: mealName.value.trim(),
      type: mealType.value,
      calories: Number(calories.value),
      protein: Number(protein.value),
      carbs: Number(carbs.value || 0),
      fats: Number(fats.value || 0),
    };

    if (
      !payload.name ||
      payload.calories <= 0 ||
      payload.protein <= 0 ||
      payload.carbs < 0 ||
      payload.fats < 0
    ) {
      addMealMessage.textContent = "Please enter valid meal values.";
      return;
    }

    addMeal(payload);
    form.reset();
    mealType.value = "Breakfast";
    carbs.value = 0;
    fats.value = 0;
    addMealMessage.textContent = "Meal saved. Go to Home to see it.";
  });

  renderFoodUnits(foodUnit, null);
  updateFoodQuantityRules(foodQuantity, null);
}

function renderStats() {
  const weeklyBars = qs("weeklyBars");
  if (!weeklyBars) {
    return;
  }

  const weeklyCalories = qs("weeklyCalories");
  const weeklyProtein = qs("weeklyProtein");
  const weeklyAvgProtein = qs("weeklyAvgProtein");

  const week = getPast7DaysData();
  const maxCalories = Math.max(...week.map((d) => d.calories), 600);
  const maxProtein = Math.max(...week.map((d) => d.protein), 60);

  weeklyBars.innerHTML = week
    .map((day) => {
      const calHeight = Math.max(
        4,
        Math.round((day.calories / maxCalories) * 120),
      );
      const proHeight = Math.max(
        4,
        Math.round((day.protein / maxProtein) * 120),
      );
      return `<div class="bar-col"><div class="bar-stack" title="${day.calories} kcal / ${day.protein}g"><div class="bar bar-cal" style="height:${calHeight}px"></div><div class="bar bar-pro" style="height:${proHeight}px"></div></div><span class="day-label">${day.label}</span></div>`;
    })
    .join("");

  const totals = week.reduce(
    (acc, day) => {
      acc.calories += day.calories;
      acc.protein += day.protein;
      return acc;
    },
    { calories: 0, protein: 0 },
  );

  weeklyCalories.textContent = Math.round(totals.calories);
  weeklyProtein.textContent = Math.round(totals.protein);
  weeklyAvgProtein.textContent = Math.round(totals.protein / 7);
}

function renderProfile() {
  const profileName = qs("profileName");
  if (!profileName) {
    return;
  }

  const ageInput = qs("ageInput");
  const sexInput = qs("sexInput");
  const heightInput = qs("heightInput");
  const weightInput = qs("weightInput");
  const activityInput = qs("activityInput");
  const goalInput = qs("goalInput");
  const proteinGoalInput = qs("proteinGoalInput");
  const saveProfileBtn = qs("saveProfileBtn");
  const bmiValue = qs("bmiValue");
  const bmiScaleValue = qs("bmiScaleValue");
  const bmiScaleMarker = qs("bmiScaleMarker");
  const bmiCategoryText = qs("bmiCategoryText");
  const calorieGoalText = qs("calorieGoalText");
  const proteinGoalText = qs("proteinGoalText");
  const profileMessage = qs("profileMessage");

  function syncFields() {
    profileName.value = state.profileName;
    ageInput.value = state.age;
    sexInput.value = state.sex;
    heightInput.value = state.heightCm;
    weightInput.value = state.weightKg;
    activityInput.value = String(state.activityFactor);
    goalInput.value = state.goal;
    proteinGoalInput.value = state.proteinGoal;

    const bmi = calculateBmi(state.weightKg, state.heightCm);
    const bmiRounded = bmi.toFixed(1);
    bmiValue.textContent = bmiRounded;
    if (bmiScaleValue) {
      bmiScaleValue.textContent = bmiRounded;
    }

    if (bmiCategoryText) {
      if (bmi < 18.5) {
        bmiCategoryText.textContent = "Category: Underweight";
      } else if (bmi < 25) {
        bmiCategoryText.textContent = "Category: Normal";
      } else if (bmi < 30) {
        bmiCategoryText.textContent = "Category: Overweight";
      } else {
        bmiCategoryText.textContent = "Category: Obesity";
      }
    }

    if (bmiScaleMarker) {
      const minBmi = 12;
      const maxBmi = 40;
      const clamped = Math.min(maxBmi, Math.max(minBmi, bmi));
      const percent = ((clamped - minBmi) / (maxBmi - minBmi)) * 100;
      bmiScaleMarker.style.left = `calc(${percent}% - 7px)`;
    }

    calorieGoalText.textContent = `${state.calorieGoal} kcal`;
    proteinGoalText.textContent = `${state.proteinGoal} g`;
  }

  syncFields();

  saveProfileBtn.addEventListener("click", () => {
    const nextName = profileName.value.trim();
    const nextAge = Number(ageInput.value);
    const nextHeight = Number(heightInput.value);
    const nextWeight = Number(weightInput.value);

    if (!nextName) {
      profileMessage.textContent = "Please enter your name.";
      return;
    }

    if (
      nextAge < 13 ||
      nextAge > 90 ||
      nextHeight < 120 ||
      nextHeight > 230 ||
      nextWeight < 35 ||
      nextWeight > 220
    ) {
      profileMessage.textContent =
        "Please enter valid age, height, and weight values.";
      return;
    }

    state.profileName = nextName;
    state.age = nextAge;
    state.sex = sexInput.value;
    state.heightCm = nextHeight;
    state.weightKg = nextWeight;
    state.activityFactor = Number(activityInput.value);
    state.goal = goalInput.value;

    const auto = calculateTargets(state);
    state.calorieGoal = auto.calories;

    const manualProteinGoal = Number(proteinGoalInput.value);
    state.proteinGoal =
      manualProteinGoal >= 20 && manualProteinGoal <= 350
        ? manualProteinGoal
        : auto.protein;

    saveState();
    syncFields();
    profileMessage.textContent = `Saved. Auto plan: ${state.calorieGoal} kcal and ${state.proteinGoal}g protein/day.`;
  });
}

async function initPage() {
  await tryLoadStateFromSQLite();
  const page = document.body.dataset.page;
  if (page === "home") {
    renderHome();
  }
  if (page === "add") {
    renderAddMeal();
  }
  if (page === "stats") {
    renderStats();
  }
  if (page === "profile") {
    renderProfile();
  }
}

void initPage();

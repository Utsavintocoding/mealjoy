import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";

export type Meal = {
  id: number;
  image: string;
  title: string;
  time: string;
  calories: string;
  tags: string[];
  cuisine: string;
  category: "Breakfast" | "Lunch" | "Dinner";
  ingredients: string[];
  steps: string[];
};

export const allMeals: Meal[] = [
  // Indian
  { id: 1, image: meal1, title: "Butter Chicken & Naan", time: "35 min", calories: "520 kcal", tags: ["High Protein"], cuisine: "Indian", category: "Dinner", ingredients: ["500g chicken thighs", "1 cup tomato purée", "½ cup cream", "2 tbsp butter", "Garam masala, cumin, turmeric", "Naan bread"], steps: ["Marinate chicken in yogurt and spices for 20 min.", "Cook chicken in butter until golden.", "Add tomato purée and simmer 15 min.", "Stir in cream and season.", "Serve with warm naan."] },
  { id: 2, image: meal2, title: "Masala Dosa", time: "25 min", calories: "280 kcal", tags: ["Vegetarian"], cuisine: "Indian", category: "Breakfast", ingredients: ["Dosa batter", "2 potatoes, boiled & mashed", "Onion, mustard seeds, curry leaves", "Coconut chutney", "Sambar"], steps: ["Spread dosa batter on hot griddle.", "Cook until golden and crispy.", "Fill with spiced potato masala.", "Fold and serve with chutney and sambar."] },

  // Japanese
  { id: 3, image: meal3, title: "Teriyaki Salmon Bowl", time: "20 min", calories: "450 kcal", tags: ["Omega-3"], cuisine: "Japanese", category: "Dinner", ingredients: ["Salmon fillet", "Soy sauce, mirin, sugar", "Steamed rice", "Edamame, avocado", "Sesame seeds"], steps: ["Mix soy sauce, mirin, and sugar for glaze.", "Pan-sear salmon 4 min per side, glazing often.", "Serve over steamed rice with edamame and avocado.", "Garnish with sesame seeds."] },
  { id: 4, image: meal1, title: "Japanese Onigiri", time: "15 min", calories: "200 kcal", tags: ["Quick"], cuisine: "Japanese", category: "Breakfast", ingredients: ["Sushi rice", "Nori sheets", "Tuna mayo or pickled plum", "Soy sauce", "Sesame seeds"], steps: ["Cook sushi rice and let cool slightly.", "Wet hands, shape rice into triangles.", "Add filling in center.", "Wrap with nori strip."] },

  // Mexican
  { id: 5, image: meal2, title: "Chicken Burrito Bowl", time: "25 min", calories: "480 kcal", tags: ["High Protein"], cuisine: "Mexican", category: "Lunch", ingredients: ["Grilled chicken", "Black beans, corn", "Cilantro lime rice", "Salsa, guacamole", "Sour cream, cheese"], steps: ["Season and grill chicken, then slice.", "Cook cilantro lime rice.", "Assemble bowl with beans, corn, rice, chicken.", "Top with salsa, guac, and sour cream."] },
  { id: 6, image: meal3, title: "Breakfast Tacos", time: "15 min", calories: "350 kcal", tags: ["Quick"], cuisine: "Mexican", category: "Breakfast", ingredients: ["Corn tortillas", "Scrambled eggs", "Black beans", "Avocado, salsa", "Cotija cheese"], steps: ["Scramble eggs with a pinch of salt.", "Warm tortillas on a dry pan.", "Fill with eggs, beans, avocado.", "Top with salsa and cheese."] },

  // Italian
  { id: 7, image: meal1, title: "Classic Margherita Pizza", time: "30 min", calories: "400 kcal", tags: ["Vegetarian"], cuisine: "Italian", category: "Dinner", ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Fresh basil", "Olive oil"], steps: ["Stretch dough into a round.", "Spread crushed tomatoes.", "Add torn mozzarella.", "Bake at 250°C for 8-10 min.", "Top with fresh basil and olive oil."] },
  { id: 8, image: meal2, title: "Caprese Panini", time: "10 min", calories: "320 kcal", tags: ["Quick"], cuisine: "Italian", category: "Lunch", ingredients: ["Ciabatta bread", "Fresh mozzarella", "Tomato slices", "Basil, pesto", "Balsamic glaze"], steps: ["Slice ciabatta and spread pesto.", "Layer mozzarella, tomato, basil.", "Press in panini grill 3-4 min.", "Drizzle with balsamic glaze."] },

  // Thai
  { id: 9, image: meal3, title: "Pad Thai", time: "20 min", calories: "420 kcal", tags: ["Quick"], cuisine: "Thai", category: "Dinner", ingredients: ["Rice noodles", "Shrimp or tofu", "Bean sprouts, peanuts", "Pad Thai sauce", "Lime, cilantro"], steps: ["Soak noodles in warm water 10 min.", "Stir-fry protein until cooked.", "Add noodles and sauce, toss well.", "Top with peanuts, sprouts, cilantro, lime."] },
  { id: 10, image: meal1, title: "Thai Green Curry", time: "25 min", calories: "380 kcal", tags: ["Spicy"], cuisine: "Thai", category: "Dinner", ingredients: ["Green curry paste", "Coconut milk", "Chicken or tofu", "Thai basil, bamboo shoots", "Jasmine rice"], steps: ["Fry curry paste in oil until fragrant.", "Add coconut milk and bring to simmer.", "Add protein and veggies, cook 15 min.", "Serve over jasmine rice with Thai basil."] },

  // Mediterranean
  { id: 11, image: meal2, title: "Rainbow Buddha Bowl", time: "15 min", calories: "320 kcal", tags: ["Vegetarian"], cuisine: "Mediterranean", category: "Lunch", ingredients: ["Quinoa", "Chickpeas, roasted", "Avocado, cucumber, tomato", "Tahini dressing", "Mixed greens"], steps: ["Cook quinoa and let cool.", "Roast chickpeas with cumin.", "Arrange veggies and quinoa in bowl.", "Drizzle with tahini dressing."] },
  { id: 12, image: meal3, title: "Shakshuka", time: "20 min", calories: "290 kcal", tags: ["High Protein"], cuisine: "Mediterranean", category: "Breakfast", ingredients: ["Eggs", "Tomato sauce, cumin, paprika", "Bell peppers, onion", "Feta cheese", "Crusty bread"], steps: ["Sauté peppers and onion.", "Add spiced tomato sauce, simmer.", "Create wells, crack in eggs.", "Cover and cook until eggs set.", "Top with feta, serve with bread."] },

  // Korean
  { id: 13, image: meal1, title: "Bibimbap", time: "30 min", calories: "450 kcal", tags: ["Balanced"], cuisine: "Korean", category: "Lunch", ingredients: ["Steamed rice", "Beef bulgogi or tofu", "Spinach, carrots, zucchini", "Gochujang sauce", "Fried egg, sesame oil"], steps: ["Cook rice and prepare veggies.", "Sauté each vegetable separately.", "Cook protein with soy and garlic.", "Arrange all on rice, top with egg.", "Add gochujang and mix before eating."] },

  // American
  { id: 14, image: meal2, title: "Avocado Toast Deluxe", time: "10 min", calories: "280 kcal", tags: ["Quick"], cuisine: "American", category: "Breakfast", ingredients: ["Sourdough bread", "Ripe avocado", "Cherry tomatoes, radish", "Poached egg", "Everything bagel seasoning"], steps: ["Toast sourdough until golden.", "Mash avocado with lime and salt.", "Spread on toast, add toppings.", "Top with poached egg and seasoning."] },
  { id: 15, image: meal3, title: "Grilled Chicken & Veggies", time: "25 min", calories: "380 kcal", tags: ["High Protein"], cuisine: "American", category: "Dinner", ingredients: ["2 chicken breasts", "Bell peppers, zucchini", "Olive oil, garlic", "Italian herbs", "Lemon"], steps: ["Season chicken with herbs and garlic.", "Grill chicken 6 min per side.", "Grill veggies alongside.", "Squeeze lemon over everything.", "Plate and serve."] },

  // Chinese
  { id: 16, image: meal1, title: "Kung Pao Chicken", time: "20 min", calories: "410 kcal", tags: ["Spicy"], cuisine: "Chinese", category: "Dinner", ingredients: ["Chicken breast, diced", "Peanuts, dried chilies", "Soy sauce, rice vinegar", "Sichuan peppercorns", "Steamed rice"], steps: ["Marinate chicken in soy and cornstarch.", "Stir-fry chilies and peppercorns.", "Add chicken, cook until done.", "Toss in peanuts and sauce.", "Serve with steamed rice."] },
  { id: 17, image: meal2, title: "Dim Sum Congee", time: "30 min", calories: "220 kcal", tags: ["Comfort"], cuisine: "Chinese", category: "Breakfast", ingredients: ["Jasmine rice", "Chicken broth", "Ginger, scallions", "Century egg or chicken", "Soy sauce, sesame oil"], steps: ["Simmer rice in broth on low for 25 min.", "Stir occasionally until creamy.", "Add ginger and protein.", "Top with scallions, soy, sesame oil."] },

  // Ethiopian
  { id: 18, image: meal3, title: "Misir Wot & Injera", time: "35 min", calories: "340 kcal", tags: ["Vegetarian", "Spicy"], cuisine: "Ethiopian", category: "Lunch", ingredients: ["Red lentils", "Berbere spice", "Onion, garlic, ginger", "Injera bread", "Turmeric"], steps: ["Sauté onion until deeply caramelized.", "Add berbere, garlic, ginger.", "Add lentils and water, simmer 25 min.", "Serve on injera and tear to eat."] },
];

export const getCuisines = () => [...new Set(allMeals.map((m) => m.cuisine))];

export const getMealsByCategory = (category: string) =>
  allMeals.filter((m) => m.category === category);

export const getMealsByCuisine = (cuisine: string) =>
  allMeals.filter((m) => m.cuisine === cuisine);

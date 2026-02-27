import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";

export type Meal = {
  id: number;
  image: string;
  title: string;
  time: string;
  durationMin: number;
  calories: string;
  tags: string[];
  cuisine: string;
  category: "Breakfast" | "Lunch" | "Dinner";
  budget: "Budget" | "Mid" | "Premium";
  diet: string[];
  ingredients: string[];
  steps: string[];
};

export const allMeals: Meal[] = [
  // Indian
  { id: 1, image: meal1, title: "Butter Chicken & Naan", time: "35 min", durationMin: 35, calories: "520 kcal", tags: ["High Protein"], cuisine: "Indian", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["500g chicken thighs", "1 cup tomato purée", "½ cup cream", "2 tbsp butter", "Garam masala, cumin, turmeric", "Naan bread"], steps: ["Marinate chicken in yogurt and spices for 20 min.", "Cook chicken in butter until golden.", "Add tomato purée and simmer 15 min.", "Stir in cream and season.", "Serve with warm naan."] },
  { id: 2, image: meal2, title: "Masala Dosa", time: "25 min", durationMin: 25, calories: "280 kcal", tags: ["Vegetarian"], cuisine: "Indian", category: "Breakfast", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Dosa batter", "2 potatoes, boiled & mashed", "Onion, mustard seeds, curry leaves", "Coconut chutney", "Sambar"], steps: ["Spread dosa batter on hot griddle.", "Cook until golden and crispy.", "Fill with spiced potato masala.", "Fold and serve with chutney and sambar."] },
  { id: 3, image: meal3, title: "Paneer Tikka Wrap", time: "20 min", durationMin: 20, calories: "380 kcal", tags: ["Vegetarian", "Quick"], cuisine: "Indian", category: "Lunch", budget: "Budget", diet: ["Vegetarian"], ingredients: ["200g paneer", "Yogurt, tikka masala spice", "Roti or tortilla", "Onion, bell pepper", "Mint chutney"], steps: ["Cube paneer and marinate in spiced yogurt.", "Grill or pan-fry until charred.", "Warm roti, add paneer and veggies.", "Drizzle mint chutney, roll up."] },
  { id: 4, image: meal1, title: "Chole Bhature", time: "30 min", durationMin: 30, calories: "450 kcal", tags: ["Comfort"], cuisine: "Indian", category: "Lunch", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Chickpeas, cooked", "Onion, tomato, ginger-garlic paste", "Chole masala, cumin", "Bhature dough", "Pickled onion"], steps: ["Sauté onion and ginger-garlic paste.", "Add tomato, spices and chickpeas.", "Simmer 15 min.", "Fry bhature dough until puffed.", "Serve together."] },

  // Japanese
  { id: 5, image: meal3, title: "Teriyaki Salmon Bowl", time: "20 min", durationMin: 20, calories: "450 kcal", tags: ["Omega-3"], cuisine: "Japanese", category: "Dinner", budget: "Premium", diet: ["Omnivore", "Keto"], ingredients: ["Salmon fillet", "Soy sauce, mirin, sugar", "Steamed rice", "Edamame, avocado", "Sesame seeds"], steps: ["Mix soy sauce, mirin, and sugar for glaze.", "Pan-sear salmon 4 min per side, glazing often.", "Serve over steamed rice with edamame and avocado.", "Garnish with sesame seeds."] },
  { id: 6, image: meal1, title: "Japanese Onigiri", time: "15 min", durationMin: 15, calories: "200 kcal", tags: ["Quick"], cuisine: "Japanese", category: "Breakfast", budget: "Budget", diet: ["Omnivore"], ingredients: ["Sushi rice", "Nori sheets", "Tuna mayo or pickled plum", "Soy sauce", "Sesame seeds"], steps: ["Cook sushi rice and let cool slightly.", "Wet hands, shape rice into triangles.", "Add filling in center.", "Wrap with nori strip."] },
  { id: 7, image: meal2, title: "Miso Ramen", time: "25 min", durationMin: 25, calories: "480 kcal", tags: ["Comfort"], cuisine: "Japanese", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Ramen noodles", "Miso paste, dashi stock", "Pork belly or tofu", "Soft-boiled egg", "Corn, scallions, nori"], steps: ["Boil dashi stock, dissolve miso paste.", "Cook noodles separately.", "Sear pork belly slices.", "Assemble bowl with noodles, broth, toppings."] },

  // Mexican
  { id: 8, image: meal2, title: "Chicken Burrito Bowl", time: "25 min", durationMin: 25, calories: "480 kcal", tags: ["High Protein"], cuisine: "Mexican", category: "Lunch", budget: "Mid", diet: ["Omnivore"], ingredients: ["Grilled chicken", "Black beans, corn", "Cilantro lime rice", "Salsa, guacamole", "Sour cream, cheese"], steps: ["Season and grill chicken, then slice.", "Cook cilantro lime rice.", "Assemble bowl with beans, corn, rice, chicken.", "Top with salsa, guac, and sour cream."] },
  { id: 9, image: meal3, title: "Breakfast Tacos", time: "15 min", durationMin: 15, calories: "350 kcal", tags: ["Quick"], cuisine: "Mexican", category: "Breakfast", budget: "Budget", diet: ["Omnivore"], ingredients: ["Corn tortillas", "Scrambled eggs", "Black beans", "Avocado, salsa", "Cotija cheese"], steps: ["Scramble eggs with a pinch of salt.", "Warm tortillas on a dry pan.", "Fill with eggs, beans, avocado.", "Top with salsa and cheese."] },
  { id: 10, image: meal1, title: "Veggie Quesadilla", time: "10 min", durationMin: 10, calories: "320 kcal", tags: ["Quick", "Vegetarian"], cuisine: "Mexican", category: "Lunch", budget: "Budget", diet: ["Vegetarian"], ingredients: ["Flour tortilla", "Cheese, bell pepper, onion", "Mushrooms, corn", "Sour cream, salsa"], steps: ["Fill tortilla with cheese and veggies.", "Fold and cook on dry pan 3 min per side.", "Cut into wedges.", "Serve with sour cream and salsa."] },
  { id: 11, image: meal2, title: "Enchiladas Verdes", time: "30 min", durationMin: 30, calories: "420 kcal", tags: ["Comfort"], cuisine: "Mexican", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Corn tortillas", "Shredded chicken", "Tomatillo salsa verde", "Sour cream, cheese", "Cilantro, onion"], steps: ["Fill tortillas with chicken and roll.", "Place in baking dish, pour salsa over.", "Top with cheese.", "Bake at 200°C for 15 min.", "Garnish with cilantro and sour cream."] },

  // Italian
  { id: 12, image: meal1, title: "Classic Margherita Pizza", time: "30 min", durationMin: 30, calories: "400 kcal", tags: ["Vegetarian"], cuisine: "Italian", category: "Dinner", budget: "Mid", diet: ["Vegetarian"], ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Fresh basil", "Olive oil"], steps: ["Stretch dough into a round.", "Spread crushed tomatoes.", "Add torn mozzarella.", "Bake at 250°C for 8-10 min.", "Top with fresh basil and olive oil."] },
  { id: 13, image: meal2, title: "Caprese Panini", time: "10 min", durationMin: 10, calories: "320 kcal", tags: ["Quick"], cuisine: "Italian", category: "Lunch", budget: "Budget", diet: ["Vegetarian"], ingredients: ["Ciabatta bread", "Fresh mozzarella", "Tomato slices", "Basil, pesto", "Balsamic glaze"], steps: ["Slice ciabatta and spread pesto.", "Layer mozzarella, tomato, basil.", "Press in panini grill 3-4 min.", "Drizzle with balsamic glaze."] },
  { id: 14, image: meal3, title: "Spaghetti Aglio e Olio", time: "15 min", durationMin: 15, calories: "350 kcal", tags: ["Quick", "Vegetarian"], cuisine: "Italian", category: "Dinner", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Spaghetti", "Garlic, olive oil", "Red pepper flakes", "Parsley", "Parmesan (optional)"], steps: ["Cook spaghetti al dente.", "Sauté sliced garlic in olive oil.", "Add pepper flakes.", "Toss pasta in garlic oil.", "Garnish with parsley."] },

  // Thai
  { id: 15, image: meal3, title: "Pad Thai", time: "20 min", durationMin: 20, calories: "420 kcal", tags: ["Quick"], cuisine: "Thai", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Rice noodles", "Shrimp or tofu", "Bean sprouts, peanuts", "Pad Thai sauce", "Lime, cilantro"], steps: ["Soak noodles in warm water 10 min.", "Stir-fry protein until cooked.", "Add noodles and sauce, toss well.", "Top with peanuts, sprouts, cilantro, lime."] },
  { id: 16, image: meal1, title: "Thai Green Curry", time: "25 min", durationMin: 25, calories: "380 kcal", tags: ["Spicy"], cuisine: "Thai", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Green curry paste", "Coconut milk", "Chicken or tofu", "Thai basil, bamboo shoots", "Jasmine rice"], steps: ["Fry curry paste in oil until fragrant.", "Add coconut milk and bring to simmer.", "Add protein and veggies, cook 15 min.", "Serve over jasmine rice with Thai basil."] },
  { id: 17, image: meal2, title: "Thai Basil Fried Rice", time: "15 min", durationMin: 15, calories: "360 kcal", tags: ["Quick", "Spicy"], cuisine: "Thai", category: "Lunch", budget: "Budget", diet: ["Omnivore"], ingredients: ["Cooked rice", "Thai basil, garlic, chilies", "Soy sauce, fish sauce", "Egg", "Chicken or shrimp"], steps: ["Heat oil, fry garlic and chilies.", "Add protein, cook through.", "Add rice and sauces, stir-fry.", "Toss in Thai basil.", "Top with fried egg."] },

  // Mediterranean
  { id: 18, image: meal2, title: "Rainbow Buddha Bowl", time: "15 min", durationMin: 15, calories: "320 kcal", tags: ["Vegetarian"], cuisine: "Mediterranean", category: "Lunch", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Quinoa", "Chickpeas, roasted", "Avocado, cucumber, tomato", "Tahini dressing", "Mixed greens"], steps: ["Cook quinoa and let cool.", "Roast chickpeas with cumin.", "Arrange veggies and quinoa in bowl.", "Drizzle with tahini dressing."] },
  { id: 19, image: meal3, title: "Shakshuka", time: "20 min", durationMin: 20, calories: "290 kcal", tags: ["High Protein"], cuisine: "Mediterranean", category: "Breakfast", budget: "Budget", diet: ["Vegetarian"], ingredients: ["Eggs", "Tomato sauce, cumin, paprika", "Bell peppers, onion", "Feta cheese", "Crusty bread"], steps: ["Sauté peppers and onion.", "Add spiced tomato sauce, simmer.", "Create wells, crack in eggs.", "Cover and cook until eggs set.", "Top with feta, serve with bread."] },
  { id: 20, image: meal1, title: "Falafel Wrap", time: "20 min", durationMin: 20, calories: "380 kcal", tags: ["Vegetarian"], cuisine: "Mediterranean", category: "Lunch", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Falafel (frozen or fresh)", "Pita bread", "Hummus, tahini", "Lettuce, tomato, pickles", "Hot sauce"], steps: ["Bake or fry falafel until crispy.", "Warm pita bread.", "Spread hummus inside pita.", "Add falafel, veggies, tahini.", "Roll and serve."] },

  // Korean
  { id: 21, image: meal1, title: "Bibimbap", time: "30 min", durationMin: 30, calories: "450 kcal", tags: ["Balanced"], cuisine: "Korean", category: "Lunch", budget: "Mid", diet: ["Omnivore"], ingredients: ["Steamed rice", "Beef bulgogi or tofu", "Spinach, carrots, zucchini", "Gochujang sauce", "Fried egg, sesame oil"], steps: ["Cook rice and prepare veggies.", "Sauté each vegetable separately.", "Cook protein with soy and garlic.", "Arrange all on rice, top with egg.", "Add gochujang and mix before eating."] },
  { id: 22, image: meal2, title: "Korean Fried Chicken", time: "30 min", durationMin: 30, calories: "520 kcal", tags: ["Comfort", "Spicy"], cuisine: "Korean", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Chicken wings", "Cornstarch, flour", "Gochujang, soy, honey", "Garlic, ginger", "Sesame seeds, scallions"], steps: ["Coat chicken in cornstarch-flour mix.", "Double-fry until extra crispy.", "Mix gochujang, soy, honey, garlic.", "Toss fried chicken in sauce.", "Garnish with sesame and scallions."] },
  { id: 23, image: meal3, title: "Kimchi Jjigae", time: "25 min", durationMin: 25, calories: "310 kcal", tags: ["Spicy", "Comfort"], cuisine: "Korean", category: "Dinner", budget: "Budget", diet: ["Omnivore"], ingredients: ["Aged kimchi", "Pork belly or tofu", "Gochugaru, soy sauce", "Soft tofu", "Scallions, rice"], steps: ["Sauté kimchi and pork.", "Add water and gochugaru.", "Simmer 15 min.", "Add soft tofu gently.", "Serve with rice."] },

  // American
  { id: 24, image: meal2, title: "Avocado Toast Deluxe", time: "10 min", durationMin: 10, calories: "280 kcal", tags: ["Quick"], cuisine: "American", category: "Breakfast", budget: "Budget", diet: ["Vegetarian"], ingredients: ["Sourdough bread", "Ripe avocado", "Cherry tomatoes, radish", "Poached egg", "Everything bagel seasoning"], steps: ["Toast sourdough until golden.", "Mash avocado with lime and salt.", "Spread on toast, add toppings.", "Top with poached egg and seasoning."] },
  { id: 25, image: meal3, title: "Grilled Chicken & Veggies", time: "25 min", durationMin: 25, calories: "380 kcal", tags: ["High Protein"], cuisine: "American", category: "Dinner", budget: "Mid", diet: ["Omnivore", "Keto"], ingredients: ["2 chicken breasts", "Bell peppers, zucchini", "Olive oil, garlic", "Italian herbs", "Lemon"], steps: ["Season chicken with herbs and garlic.", "Grill chicken 6 min per side.", "Grill veggies alongside.", "Squeeze lemon over everything.", "Plate and serve."] },
  { id: 26, image: meal1, title: "Classic Pancakes", time: "15 min", durationMin: 15, calories: "350 kcal", tags: ["Comfort"], cuisine: "American", category: "Breakfast", budget: "Budget", diet: ["Vegetarian"], ingredients: ["Flour, sugar, baking powder", "Egg, milk, butter", "Maple syrup", "Fresh berries", "Whipped cream"], steps: ["Mix dry ingredients.", "Add wet ingredients, stir until just combined.", "Cook on griddle until bubbles form.", "Flip and cook other side.", "Stack and top with syrup and berries."] },
  { id: 27, image: meal2, title: "BBQ Pulled Pork Sandwich", time: "30 min", durationMin: 30, calories: "520 kcal", tags: ["Comfort", "High Protein"], cuisine: "American", category: "Lunch", budget: "Mid", diet: ["Omnivore"], ingredients: ["Pulled pork (pre-cooked)", "BBQ sauce", "Brioche buns", "Coleslaw", "Pickles"], steps: ["Heat pulled pork with BBQ sauce.", "Toast brioche buns.", "Pile pork on bottom bun.", "Top with coleslaw and pickles.", "Serve with extra sauce."] },

  // Chinese
  { id: 28, image: meal1, title: "Kung Pao Chicken", time: "20 min", durationMin: 20, calories: "410 kcal", tags: ["Spicy"], cuisine: "Chinese", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Chicken breast, diced", "Peanuts, dried chilies", "Soy sauce, rice vinegar", "Sichuan peppercorns", "Steamed rice"], steps: ["Marinate chicken in soy and cornstarch.", "Stir-fry chilies and peppercorns.", "Add chicken, cook until done.", "Toss in peanuts and sauce.", "Serve with steamed rice."] },
  { id: 29, image: meal2, title: "Dim Sum Congee", time: "30 min", durationMin: 30, calories: "220 kcal", tags: ["Comfort"], cuisine: "Chinese", category: "Breakfast", budget: "Budget", diet: ["Omnivore"], ingredients: ["Jasmine rice", "Chicken broth", "Ginger, scallions", "Century egg or chicken", "Soy sauce, sesame oil"], steps: ["Simmer rice in broth on low for 25 min.", "Stir occasionally until creamy.", "Add ginger and protein.", "Top with scallions, soy, sesame oil."] },
  { id: 30, image: meal3, title: "Mapo Tofu", time: "15 min", durationMin: 15, calories: "280 kcal", tags: ["Spicy", "Quick"], cuisine: "Chinese", category: "Dinner", budget: "Budget", diet: ["Omnivore"], ingredients: ["Soft tofu", "Ground pork", "Doubanjiang, soy sauce", "Sichuan peppercorn", "Scallions, rice"], steps: ["Cook ground pork until crispy.", "Add doubanjiang and aromatics.", "Add tofu cubes gently.", "Simmer 5 min.", "Serve over rice with scallions."] },
  { id: 31, image: meal1, title: "Egg Fried Rice", time: "10 min", durationMin: 10, calories: "340 kcal", tags: ["Quick"], cuisine: "Chinese", category: "Lunch", budget: "Budget", diet: ["Omnivore"], ingredients: ["Day-old rice", "Eggs", "Soy sauce, sesame oil", "Peas, carrots", "Scallions"], steps: ["Heat oil, scramble eggs.", "Add rice, stir-fry on high heat.", "Add soy sauce and veggies.", "Toss until heated through.", "Garnish with scallions."] },

  // Ethiopian
  { id: 32, image: meal3, title: "Misir Wot & Injera", time: "35 min", durationMin: 35, calories: "340 kcal", tags: ["Vegetarian", "Spicy"], cuisine: "Ethiopian", category: "Lunch", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Red lentils", "Berbere spice", "Onion, garlic, ginger", "Injera bread", "Turmeric"], steps: ["Sauté onion until deeply caramelized.", "Add berbere, garlic, ginger.", "Add lentils and water, simmer 25 min.", "Serve on injera and tear to eat."] },

  // Vietnamese
  { id: 33, image: meal2, title: "Pho Bo", time: "30 min", durationMin: 30, calories: "380 kcal", tags: ["Comfort"], cuisine: "Vietnamese", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Rice noodles", "Beef broth, star anise, cinnamon", "Thinly sliced beef", "Bean sprouts, Thai basil", "Hoisin, sriracha, lime"], steps: ["Simmer broth with spices 20 min.", "Cook rice noodles.", "Place noodles in bowl, add raw beef.", "Pour hot broth over.", "Serve with herbs and condiments."] },
  { id: 34, image: meal3, title: "Banh Mi Sandwich", time: "15 min", durationMin: 15, calories: "350 kcal", tags: ["Quick"], cuisine: "Vietnamese", category: "Lunch", budget: "Budget", diet: ["Omnivore"], ingredients: ["Baguette", "Pork or chicken", "Pickled carrots, daikon", "Cilantro, jalapeño", "Pâté, mayo"], steps: ["Toast baguette.", "Spread pâté and mayo.", "Add sliced meat.", "Top with pickled veggies and cilantro.", "Add jalapeño to taste."] },

  // Greek
  { id: 35, image: meal1, title: "Greek Gyro Plate", time: "20 min", durationMin: 20, calories: "440 kcal", tags: ["High Protein"], cuisine: "Greek", category: "Lunch", budget: "Mid", diet: ["Omnivore"], ingredients: ["Lamb or chicken gyro meat", "Pita bread", "Tzatziki sauce", "Tomato, onion, lettuce", "Fries (optional)"], steps: ["Cook or warm gyro meat.", "Warm pita bread.", "Spread tzatziki on pita.", "Add meat and veggies.", "Serve with fries."] },
  { id: 36, image: meal2, title: "Spanakopita", time: "30 min", durationMin: 30, calories: "300 kcal", tags: ["Vegetarian"], cuisine: "Greek", category: "Dinner", budget: "Mid", diet: ["Vegetarian"], ingredients: ["Spinach, feta cheese", "Phyllo dough", "Onion, dill", "Egg", "Olive oil, butter"], steps: ["Sauté spinach and onion.", "Mix with feta, dill, egg.", "Layer phyllo, brush with butter.", "Add filling, fold or layer.", "Bake at 180°C for 25 min."] },

  // Middle Eastern
  { id: 37, image: meal3, title: "Chicken Shawarma", time: "25 min", durationMin: 25, calories: "420 kcal", tags: ["High Protein"], cuisine: "Middle Eastern", category: "Dinner", budget: "Mid", diet: ["Omnivore"], ingredients: ["Chicken thighs", "Shawarma spice blend", "Pita, pickles, garlic sauce", "Tomato, lettuce", "Tahini"], steps: ["Marinate chicken in shawarma spices.", "Cook on high heat until charred.", "Slice thinly.", "Serve in pita with veggies and sauces."] },
  { id: 38, image: meal1, title: "Hummus & Pita Plate", time: "10 min", durationMin: 10, calories: "260 kcal", tags: ["Quick", "Vegetarian"], cuisine: "Middle Eastern", category: "Breakfast", budget: "Budget", diet: ["Vegetarian", "Vegan"], ingredients: ["Hummus", "Pita bread", "Olive oil, paprika", "Cucumber, tomato", "Pickles, olives"], steps: ["Spread hummus on plate.", "Drizzle olive oil and paprika.", "Warm pita bread.", "Arrange veggies around.", "Dip and enjoy."] },
];

export const getCuisines = () => [...new Set(allMeals.map((m) => m.cuisine))];

export const getMealsByCategory = (category: string) =>
  allMeals.filter((m) => m.category === category);

export const getMealsByCuisine = (cuisine: string) =>
  allMeals.filter((m) => m.cuisine === cuisine);

export const getDiets = () => [...new Set(allMeals.flatMap((m) => m.diet))];

export const getBudgets = (): Array<"Budget" | "Mid" | "Premium"> => ["Budget", "Mid", "Premium"];

export const getMealsByPantry = (pantryItems: string[]): Meal[] => {
  if (pantryItems.length === 0) return [];
  const lower = pantryItems.map((i) => i.toLowerCase());
  return allMeals
    .map((meal) => {
      const matchCount = meal.ingredients.filter((ing) =>
        lower.some((p) => ing.toLowerCase().includes(p))
      ).length;
      return { meal, matchCount, matchPercent: matchCount / meal.ingredients.length };
    })
    .filter((r) => r.matchCount > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .map((r) => r.meal);
};

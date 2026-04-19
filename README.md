# 🍽️ MealJoy

A modern food ordering web application built with React, TypeScript, and Supabase. Browse meals, manage your cart, place orders, and track delivery status — all in a clean, responsive UI.

![MealJoy](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase) ![Vitest](https://img.shields.io/badge/Tested-Vitest-yellow?logo=vitest)

---

## ✨ Features

- 🔐 **Authentication** — Sign up, log in, and log out via Supabase Auth
- 🍛 **Meal Browsing** — Browse meals by category with live search filtering
- 🛒 **Cart Management** — Add, remove, and update item quantities with real-time totals
- 📦 **Order Placement** — Checkout with delivery address and special instructions
- 📋 **Order History** — View past orders and live order status updates
- 👤 **User Profile** — Manage account details
- 📱 **Responsive Design** — Works seamlessly on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Data Fetching | TanStack React Query |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Testing | Vitest + React Testing Library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account

### Installation

```bash
# Clone the repository
git clone https://github.com/Utsavintocoding/mealjoy.git
cd mealjoy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key to .env

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🧪 Running Tests

The project includes a comprehensive test suite covering cart logic, authentication, meal browsing, order flow, navigation, and data-fetching hooks.

```bash
# Run all tests (single pass)
npm test

# Watch mode (re-runs on file changes)
npm run test:watch
```

### Test Coverage

| File | What's tested |
|---|---|
| `cart.test.ts` | Add/remove items, quantity updates, totals calculation |
| `auth.test.tsx` | Login validation, Supabase auth calls, error handling |
| `meals.test.tsx` | MealCard rendering, MealGrid search & category filtering |
| `orders.test.tsx` | Order status badges, checkout form validation & submission |
| `navigation.test.tsx` | NavBar auth states, link hrefs, protected routes |
| `hooks.test.tsx` | `useMeals` and `useOrders` React Query hooks |

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/            # shadcn/ui base components
├── pages/             # Route-level page components
├── hooks/             # Custom React Query hooks
├── integrations/
│   └── supabase/      # Supabase client & type definitions
├── lib/               # Utility functions
├── __tests__/         # Test files
└── test/
    ├── setup.ts        # Vitest global setup + Supabase mock
    └── utils.tsx       # Custom render wrapper + data factories
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT

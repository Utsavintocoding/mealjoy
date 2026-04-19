import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

// ----------------------------------------------------------------
// Custom render wrapper that provides all global providers
// ----------------------------------------------------------------
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  });

interface WrapperProps {
  children: React.ReactNode;
  initialRoute?: string;
}

function AllProviders({ children, initialRoute = "/" }: WrapperProps) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { initialRoute?: string }
) => {
  const { initialRoute, ...rest } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialRoute={initialRoute}>{children}</AllProviders>
    ),
    ...rest,
  });
};

export * from "@testing-library/react";
export { customRender as render };

// ----------------------------------------------------------------
// Mock data factories
// ----------------------------------------------------------------
export const makeMeal = (overrides = {}) => ({
  id: "meal-1",
  name: "Grilled Chicken Bowl",
  description: "Healthy grilled chicken with vegetables",
  price: 12.99,
  category: "Mains",
  image_url: "https://example.com/chicken.jpg",
  available: true,
  created_at: new Date().toISOString(),
  ...overrides,
});

export const makeCartItem = (overrides = {}) => ({
  id: "item-1",
  meal_id: "meal-1",
  name: "Grilled Chicken Bowl",
  price: 12.99,
  quantity: 1,
  ...overrides,
});

export const makeUser = (overrides = {}) => ({
  id: "user-123",
  email: "test@example.com",
  user_metadata: { full_name: "Test User" },
  ...overrides,
});

export const makeOrder = (overrides = {}) => ({
  id: "order-1",
  user_id: "user-123",
  items: [makeCartItem()],
  total: 12.99,
  status: "pending",
  created_at: new Date().toISOString(),
  ...overrides,
});

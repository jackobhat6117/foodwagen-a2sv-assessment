// src/testing/test-utils.tsx

import React, { ReactElement, useState } from "react";
import { render, RenderOptions, configure } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configure Testing Library to recognize data-test-id as a valid test ID
configure({ testIdAttribute: 'data-test-id' });

// Create a new QueryClient for each test run to isolate tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Turn off retries for tests
        staleTime: Infinity, // Prevent refetches
      },
    },
  });

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Use useState to ensure the client is created only once
  const [queryClient] = useState(() => createTestQueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Override the default render method with our custom one
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from RTL
export * from "@testing-library/react";
// Export our custom render as 'render'
export { customRender as render };
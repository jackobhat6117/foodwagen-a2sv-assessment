// src/lib/providers.tsx

"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner"; // Import the Toaster component
import { useState } from "react";
import { queryClient } from "@/lib/api/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  // Use useState to ensure the client is only created once
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* This component displays the toasts.
          Position it as you like. */}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
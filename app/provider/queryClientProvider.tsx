// src/lib/providers.tsx

"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner"; 
import { useState } from "react";
import { queryClient } from "@/lib/api/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {

  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
    
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

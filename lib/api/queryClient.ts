// src/lib/query-client.ts

import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "An unknown query error occurred";
      console.error("Query Error:", message);
      toast.error(message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "An unknown mutation error occurred";
        console.error("Mutation Error:", message);
        toast.error(message);
      },
      
    },
  },
});
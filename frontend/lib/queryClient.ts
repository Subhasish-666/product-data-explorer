import { QueryClient } from '@tanstack/react-query';

/**
 * Central React Query client
 * Used by <QueryClientProvider /> in app/providers.tsx
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid refetching on every focus (better UX)
      refetchOnWindowFocus: false,

      // Retry once on network failure
      retry: 1,

      // Default cache time
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Background refetch instead of blocking UI
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // mutations should not retry automatically
    },
  },
});

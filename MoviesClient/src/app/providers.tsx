import { Provider } from "react-redux"
import { store } from "./store.ts"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});


function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}

export default AppProviders;
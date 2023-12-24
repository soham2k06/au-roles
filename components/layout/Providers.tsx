"use client";

import { SessionContextProvider } from "@/contexts";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SessionProvider } from "next-auth/react";

import { Amatic_SC } from "next/font/google";
import { Toaster } from "sonner";

const amaticSc = Amatic_SC({
  subsets: ["latin"],
  weight: ["700"],
});
const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#101418",
    },
    text: {
      primary: "#afb8c4",
    },
    divider: "#2f343b",
  },
  typography: {
    fontFamily: amaticSc.style.fontFamily,
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster richColors theme="dark" />
          <SessionContextProvider>{children}</SessionContextProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;

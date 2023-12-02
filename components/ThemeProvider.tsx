"use client";

import {
  CssBaseline,
  ThemeProvider as ThemeProviderMUI,
  createTheme,
} from "@mui/material";
import { Amatic_SC } from "next/font/google";

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

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderMUI theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProviderMUI>
  );
}

export default ThemeProvider;

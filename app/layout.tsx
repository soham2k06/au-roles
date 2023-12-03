import type { Metadata } from "next";
import "./globals.css";

import { Container } from "@mui/material";
import { Background, Header, ThemeProvider } from "@/components";

export const metadata: Metadata = {
  title: "ModMaze",
  description: "Among us mod roles details website created by Soham Bhikadiya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
      </head>
      <ThemeProvider>
        <body>
          <Background />
          <Header />
          <Container maxWidth="xl" sx={{ pt: "64px" }}>
            {children}
          </Container>
        </body>
      </ThemeProvider>
    </html>
  );
}

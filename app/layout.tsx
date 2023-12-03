import type { Metadata } from "next";
import "./globals.css";

import { Header, ThemeProvider, Background } from "@/components";
import { Container } from "@mui/material";

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

import type { Metadata } from "next";
import "./globals.css";

import { Container } from "@mui/material";
import { Background, Header, Providers } from "@/components";

export const metadata: Metadata = {
  title: "ModMaze",
  description: "Among us mod roles details website created by Soham Bhikadiya.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <Background />
          <Header />
          <Container maxWidth="xl" sx={{ pt: "64px" }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

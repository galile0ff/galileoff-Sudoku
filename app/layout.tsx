import type { Metadata, Viewport } from "next";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Dock from '@/components/Navigation/Dock';
import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Sudoku",
  description: "6x6 Mini Sudoku Game",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mini Sudoku",
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
          <Dock />
        </MantineProvider>
      </body>
    </html>
  );
}

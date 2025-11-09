import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import localFont from "next/font/local";

// Load local font
const myLocalFont = localFont({
  src: [
    {
      path: "/fonts/MyLocalFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/MyLocalFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-my-local", // optional CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real-time chat with Socket.io",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${myLocalFont.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

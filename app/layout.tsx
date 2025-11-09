import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

// Load local font from public/fonts
const myLocalFont = localFont({
  src: [
    { path: "/fonts/MyLocalFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/MyLocalFont-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-my-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real-time chat with Socket.io",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${myLocalFont.className} antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

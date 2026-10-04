import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rift Scout — League Player Insights",
  description: "Search a League of Legends Riot ID and explore ranked stats, recent form, and champion performance.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

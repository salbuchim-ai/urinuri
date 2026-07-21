import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppHeader } from "@/components/story/AppHeader";
import { StoryFlowProvider } from "@/components/story/StoryFlowProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UriNuri | Every Story Begins With You",
  description: "Create playful, child-friendly stories inspired by cultures around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoryFlowProvider>
          <AppHeader />
          {children}
        </StoryFlowProvider>
      </body>
    </html>
  );
}

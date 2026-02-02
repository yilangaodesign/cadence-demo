import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Cadence Design System | AI-Native Capacity Governance",
  description: "Design system for Cadence - an AI-native capacity governance tool. Based on IBM Carbon with custom brand colors and typography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Cadence Typography: Inter, Lora, Roboto Mono from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Lora:ital,wght@0,400..600;1,400&family=Roboto+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

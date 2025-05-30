/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Script from "next/script";

export const metadata = {
  title: "Bostället2.0",
  description: "Nya generationens häng",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex justify-center">
        <UserProvider>{children}</UserProvider>
        {/* Scriptet för att aktivera cookiebanner */}
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="G_1Y_eDbu5WybI"
          async
        />
      </body>
    </html>
  );
}

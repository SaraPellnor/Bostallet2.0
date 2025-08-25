/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Script from "next/script";
import shareImage from "./images/share-image.png"; // <-- detta funkar med next/image import

export const metadata = {
  title: "Bostället2.0",
  description: "Nya generationens häng",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Bostället2.0",
    description: "Nya generationens häng",
    url: "https://bostallet20.se",
    siteName: "Bostället2.0",
    images: [
      {
        url: shareImage.src, // viktigt att använda .src när du importerar bilden
        width: 1200,
        height: 630,
        alt: "Bostället2.0",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bostället2.0",
    description: "Nya generationens häng",
    images: [shareImage.src],
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

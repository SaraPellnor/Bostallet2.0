import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Script from "next/script";

export const metadata = {
  title: "Bostället 2.0",
  description: "Nya generationens häng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <UserProvider>{children}</UserProvider>
        {/* Scriptet för att aktivera cookiebanner  */}
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

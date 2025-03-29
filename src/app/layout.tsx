import { Montserrat, Poppins } from "next/font/google";

import { AppContextProvider } from "@/contexts/app-context";

// styles
import "@/styles/globals.css";

const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monteserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monteserrat.variable} ${poppins.variable} antialiased`}
      >
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}

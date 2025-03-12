import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "../store/ReduxProvider";
import type AppProps from "next/app";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "../assets/css/globals.css";
import { GlobalProvider } from "../store/globalContext";
import {Toaster} from "./challenge/component/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviseWell",
  description: "Smarter Revision, Better Results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black bg-black/40 backdrop-blur-xl  h-full"}>
        <GlobalProvider>
          <ThemeProvider attribute="class" enableSystem>
            <ReduxProvider>
              {children}
              <Toaster />
            </ReduxProvider>
          </ThemeProvider>
          
        </GlobalProvider>
      </body>
    </html>
  );
}

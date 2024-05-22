
import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import Nav from "../components/navbar/Nav";
import ReduxProvider from "@/redux/ReduxProvider";
import ProfileNav from "@/components/navbar/ProfileNav";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Toast from "@/components/popups/Toast";

const inter = Fira_Sans({ subsets: ["latin"], weight: ["400", "700", "200"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ReduxProvider>
            <Toast />
            <Nav>
              <ProfileNav />
            </Nav>
            {children}
          </ReduxProvider>
      </body>
    </html>
  );
}

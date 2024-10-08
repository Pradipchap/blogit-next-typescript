import "./globals.css";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import Nav from "../components/navbar/Nav";
import ReduxProvider from "@/redux/ReduxProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProfileNav from "@/components/navbar/ProfileNav";
import "@fortawesome/fontawesome-svg-core/styles.css";
const Toast = dynamic(() => import("@/components/popups/Toast"), {
  ssr: false,
});
import { BASE_URL } from "@/utils/constants";
import { ReactNode } from "react";

const inter = Roboto_Flex({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
});

export const metadata: Metadata = {
  title: "Blog it",
  description: "A blog app , for custom blog writing,publishing for free",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href={`${BASE_URL}`} />
        <link rel="preconnect" href={`${BASE_URL}`} />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
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

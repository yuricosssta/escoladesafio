import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { cn } from "../lib/utils";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { AuthInitializer } from "@/lib/redux/AuthInitializer";
import { Footer } from "@/components/Footer";
import { SessionExpiredModal } from "@/components/SessionExpiredModal";
import { LandingPageHeader } from "@/components/LandingPage";
// import './global.css'

// const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Cazuá Tech | Gestão Inteligente de Obras",
  description: "Gerencie suas obras com eficiência, garantindo qualidade e segurança em cada etapa do processo construtivo.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(
        // "min-h-screen bg-backgroud font-sans antialiased max-w-6xl m-auto", 
        // fontSans.variable
      )}>
        <Providers>
          <ReduxProvider>
            <AuthInitializer />
            {/* <SessionExpiredModal /> */}
            {/* <Navbar /> */}
            <LandingPageHeader
              items={[
                { title: "Home", href: "/" },
                { title: "Criar (provisório)", href: "/posts/new" },
                { title: "Features", href: "/#features" },
                { title: "Pricing", href: "/#pricing" },
                { title: "Github", href: "https://github.com/stack-auth/stack-template", external: true },
              ]}
            />
            {children}
            {/* <Footer /> */}
          </ReduxProvider>
        </Providers>
      </body>

    </html>
  );
}
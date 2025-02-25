import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import NextAuthProvider from "@/ui/components/NextAuthProvider/NextAuthProvider";
import { LoginButton } from "@/ui/components/LoginButton/LoginButton";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TreinaBlog",
  description: "Aplicação desenvolvida no curso de Next.js Fundamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <header className={styles.headerTitle}>
          <h1 className={styles.title}>
            Treina
            <span className={styles.titleSecondWord}>Blog</span>
          </h1>
          <div className={styles.loginButtonContainer}>
            <LoginButton />
          </div>
        </header>
        {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

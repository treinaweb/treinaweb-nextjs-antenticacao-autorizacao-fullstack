import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import NextAuthProvider from "@/ui/components/NextAuthProvider/NextAuthProvider";


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
        <header>
          <h1 className={styles.title}>
            Treina
            <span className={styles.titleSecondWord}>Blog</span>
          </h1>
        </header>
        {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

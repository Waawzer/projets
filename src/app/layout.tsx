import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WebModels | Sites Web Professionnels",
  description: "Modèles de sites web professionnels à prix fixe. Studio d'enregistrement, studio de tatouage, vente artisanale, boulangerie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./provider/queryClientProvider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";


const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "FoodWagen - Find Meals Near You",
  description: "Discover and order delicious meals from nearby restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <Providers>
          <Header />
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
import HeaderProgress from "@/components/HeaderProgress";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { ProgressProvider } from "@/contexts/ProgressContext";

const inter = Inter({
  weight: ["200", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Meu App",
  description: "Descrição do meu aplicativo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head></head>
      <body className={inter.className}>
      <ProgressProvider>
        <Background />
        <HeaderProgress />
        {children} {/* Conteúdo principal */}
        <Footer />
      </ProgressProvider>
      </body>
    </html>
  );
}

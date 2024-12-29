import { Nunito } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import ClientOnly from "@/components/ClientOnly";

export const metadata = {
  title: "LinkToIt",
  description: "Link Engagement Tool",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
        </ClientOnly>
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}

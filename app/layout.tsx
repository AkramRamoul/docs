import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "sonner";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docs",
  description: "Create and edit documents online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}

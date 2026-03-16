import "../lib/patchFetchForRedirects";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BrowserLlmProvider } from "../contexts/BrowserLlmContext";
import { HostedActivityDriver } from "../components/HostedActivityDriver";
import { SessionProvider } from "../components/SessionProvider";
import { HeaderNav } from "../components/HeaderNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentBook",
  description:
    "AgentBook lets you create autonomous AI agents that form their own social network. Build, deploy, and watch your agents post, reply, and interact — all running locally.",
  openGraph: {
    title: "AgentBook",
    description:
      "AgentBook lets you create autonomous AI agents that form their own social network. Build, deploy, and watch your agents post, reply, and interact — all running locally.",
    images: ["/agentbook.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentBook",
    description:
      "AgentBook lets you create autonomous AI agents that form their own social network. Build, deploy, and watch your agents post, reply, and interact — all running locally.",
    images: ["/agentbook.jpg"],
  },
  icons: {
    icon: "/agentbook.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
        <BrowserLlmProvider>
        <HostedActivityDriver />
        <HeaderNav />
        <div className="pt-16">{children}</div>
        </BrowserLlmProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarComponent from "@/components/shared/SidebarComponent";
import SyncUser from "@/components/shared/SyncUser";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logistics Dashboard",
  description: `
    Logistics Dashboard is a modern web application designed to simplify logistics and transport management for growing businesses. 
    Built with Next.js, Drizzle ORM, and Neon Postgres, the platform enables logistics teams to manage shipments, track transport routes, and monitor performance in real time. 
    Users can view pending, delivered, delayed, and in-transit shipments, analyze transport efficiency, and gain insights through interactive KPI cards and data visualizations. 
    With secure authentication powered by Clerk, role-based access (admin, team leader, and staff), and responsive charts, Logistics Dashboard provides a complete digital solution for optimizing supply chain operations, improving team collaboration, and reducing delivery delays. 
    Perfect for logistics companies, freight forwarders, and transportation managers looking for a clean, data-driven dashboard built on modern web technologies.
      `,
  keywords: [
    "logistics dashboard",
    "shipment management",
    "transport analytics",
    "supply chain dashboard",
    "Next.js logistics app",
    "logistics KPI tracking",
    "freight management software",
    "delivery tracking system",
    "transport performance insights",
    "logistics analytics dashboard",
  ],
  openGraph: {
    title: "Logistics Dashboard | Smart Shipment & Transport Analytics",
    description:
      "A modern logistics management platform that helps teams track shipments, monitor transport activity, and analyze KPIs through interactive charts and data visualization.",
    url: "https://yourdomain.com",
    siteName: "Logistics Dashboard",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logistics Dashboard Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Dashboard | Smart Transport & Shipment Management",
    description:
      "Track shipments, manage transports, and analyze logistics performance using interactive dashboards built with Next.js and Drizzle ORM.",
    images: ["https://yourdomain.com/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <SidebarProvider>
            <SidebarComponent />
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <SyncUser />
            {children}

          </SidebarProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Dev OS Dashboard",
  description: "Interactive portfolio and metrics suite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
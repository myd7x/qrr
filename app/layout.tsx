import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

import { AuthProvider } from "@/context/AuthContext";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppSettingsProvider>
          <AuthProvider>
            <ScrollProgress />
            {/* <CustomCursor /> */}
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
          </AuthProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}

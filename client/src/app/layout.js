import "./globals.css";

export const metadata = {
    title: "codeshare 2.0 - Online Code Share",
    description: "Share, edit, and collaborate on code in real-time.",
};

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className="antialiased font-sans bg-white dark:bg-[#030712] text-gray-900 dark:text-purple-50 min-h-screen selection:bg-purple-500/30 flex flex-col transition-colors duration-300">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <Header />
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

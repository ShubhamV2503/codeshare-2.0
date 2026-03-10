"use client";

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const CustomLogo = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 68 35 L 80 25" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="88" cy="18" r="8" stroke="currentColor" strokeWidth="8" fill="none" />

        <path d="M 68 65 L 80 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="88" cy="82" r="8" stroke="currentColor" strokeWidth="8" fill="none" />

        <circle cx="45" cy="50" r="40" fill="#7E57C2" />

        <path d="M 32 35 L 18 50 L 32 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 48 30 L 38 70" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <path d="M 54 35 L 68 50 L 54 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#1f2937]/50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <CustomLogo className="h-8 w-8 text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-transform hover:scale-105" />
                    <span className="font-bold text-lg text-black dark:text-white">codeshare 2.0</span>
                </Link>
                <div className="flex items-center gap-6">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f2937] hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-in-out focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                                <Sun
                                    className={`absolute w-5 h-5 transition-all duration-500 transform ${theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                                        }`}
                                />
                                <Moon
                                    className={`absolute w-5 h-5 transition-all duration-500 transform ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                                        }`}
                                />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

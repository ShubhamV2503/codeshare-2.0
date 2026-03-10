import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-50 dark:bg-[#030712] relative mt-20 transition-colors duration-300">
            {/* Top Gradient Border */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4 lg:col-span-2 pr-0 lg:pr-12">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">codeshare 2.0</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">Experience coding without boundaries. A lightning-fast, zero-friction workspace built for modern pair programming.</p>
                        <div className="flex gap-4 pt-4">
                            <a href="https://github.com/ShubhamV2503" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 bg-gray-200 dark:bg-[#111827] text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-900 dark:hover:bg-[#1f2937] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/shubhamv2503/" target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 bg-gray-200 dark:bg-[#111827] text-gray-600 dark:text-gray-400 hover:text-white hover:bg-[#0077b5] dark:hover:bg-[#1f2937] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <Link href="/contact" className="rounded-full p-2.5 bg-gray-200 dark:bg-[#111827] text-gray-600 dark:text-gray-400 hover:text-white hover:bg-pink-600 dark:hover:bg-[#1f2937] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:justify-self-end">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/about" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">About codeshare 2.0</Link></li>
                            <li><Link href="/contact" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="lg:justify-self-end">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/faq" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">FAQ / Help Center</Link></li>
                            <li><Link href="/terms" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-200 dark:border-[#1f2937] flex justify-center items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} codeshare 2.0. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

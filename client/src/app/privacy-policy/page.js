"use client";

import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-700 dark:text-gray-300 pt-24 pb-20 transition-colors duration-300 selection:bg-pink-500/30">
            {/* Animated Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 select-none pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 pt-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Privacy Policy
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    {/* Sticky Sidebar Navigation (Desktop Only) */}
                    <div className="hidden lg:block w-64 flex-shrink-0 sticky top-32">
                        <nav className="flex flex-col space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Contents</h3>
                            <a href="#data-collection" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">1. Data Collection</a>
                            <a href="#data-usage" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">2. Data Usage</a>
                            <a href="#tracking-mechanisms" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">3. Tracking Mechanisms</a>
                            <a href="#third-party" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">4. Third-Party Integrations</a>
                            <a href="#information-security" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">5. Information Security</a>
                            <a href="#contact-information" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">6. Contact Information</a>
                        </nav>

                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                            <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Home
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-2xl shadow-xl dark:shadow-2xl">
                        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-12">

                            <p className="text-base sm:text-lg leading-relaxed mb-8">
                                At codeshare 2.0, we prioritize the protection of your personal information. This Privacy Policy details the types of data we collect and how we utilize, safeguard, and disclose that data when you interact with our collaborative platform.
                            </p>

                            <section id="data-collection" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Data Collection</h2>
                                <p className="leading-relaxed">
                                    To ensure the seamless delivery of our real-time synchronization services, we must collect specific data points. This includes temporary session identifiers necessary for collaborative coding environments, interaction metrics, and any direct information you voluntarily submit via our contact forms. We deliberately minimize data collection, gathering only what is strictly required to operate the platform.
                                </p>
                            </section>

                            <section id="data-usage" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Data Usage</h2>
                                <p className="leading-relaxed mb-4">
                                    The information we gather is employed exclusively to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li>Provide, maintain, and improve the core functionality and stability of the platform.</li>
                                    <li>Facilitate instantaneous, sub-millisecond real-time code synchronization between users.</li>
                                    <li>Analyze usage patterns and performance metrics to enhance the user experience.</li>
                                    <li>Detect, prevent, and address technical issues or security vulnerabilities.</li>
                                </ul>
                            </section>

                            <section id="tracking-mechanisms" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Tracking Mechanisms</h2>
                                <p className="leading-relaxed">
                                    We utilize standard operational cookies and similar anonymized tracking technologies to persist essential user preferences across sessions. These mechanisms do not track personal identifying information outside the scope of our domain. You may configure your browser software to refuse all cookies; however, doing so may restrict your ability to use certain features of the platform.
                                </p>
                            </section>

                            <section id="third-party" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Integrations</h2>
                                <p className="leading-relaxed">
                                    codeshare 2.0 heavily relies on trusted, industry-leading third-party services—such as cloud hosting infrastructure and real-time database providers—to power the application. While we transmit application state data to these providers solely for the purpose of executing the service, these entities are governed by their own stringent, independent privacy policies and data protection standards.
                                </p>
                            </section>

                            <section id="information-security" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Information Security</h2>
                                <p className="leading-relaxed">
                                    We employ robust, commercially reasonable security procedures—including encryption in transit—to protect your information from unauthorized access, alteration, disclosure, or destruction. Nevertheless, users must acknowledge that no method of electronic transmission over the internet or method of external data storage is entirely impervious to security breaches.
                                </p>
                            </section>

                            <section id="contact-information" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Policy Updates & Contact</h2>
                                <p className="leading-relaxed">
                                    We may revise this Privacy Policy periodically. All fundamental changes will be published here to ensure you are perpetually aware of what information we gather and how we utilize it. For questions or concerns regarding these privacy practices, please reach out to us directly through the dedicated <Link href="/contact" className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors">Contact page</Link>.
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-700 dark:text-gray-300 pt-24 pb-20 transition-colors duration-300 selection:bg-pink-500/30">
            {/* Animated Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 select-none pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 pt-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Terms of Service
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    {/* Sticky Sidebar Navigation (Desktop Only) */}
                    <div className="hidden lg:block w-64 flex-shrink-0 sticky top-32">
                        <nav className="flex flex-col space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Contents</h3>
                            <a href="#agreement-to-terms" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">1. Agreement to Terms</a>
                            <a href="#service-provision" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">2. Service Provision</a>
                            <a href="#acceptable-use" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">3. Acceptable Use Policy</a>
                            <a href="#intellectual-property" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">4. Intellectual Property</a>
                            <a href="#termination" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">5. Termination of Service</a>
                            <a href="#disclaimer" className="text-sm text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">6. Disclaimers</a>
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
                                Welcome to codeshare 2.0. These Terms of Service ("Terms") govern your access to and use of our real-time collaborative code editor platform. Please read these Terms carefully before utilizing the service.
                            </p>

                            <section id="agreement-to-terms" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
                                <p className="leading-relaxed">
                                    By accessing, browsing, or utilizing any portion of codeshare 2.0 (the "Platform"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree with any provision of these Terms, you must immediately cease all use of the Platform.
                                </p>
                            </section>

                            <section id="service-provision" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Service Provision</h2>
                                <p className="leading-relaxed mb-4">
                                    codeshare 2.0 provides a web-based environment for synchronized code editing ("the Service"). We reserve the right, at our sole discretion, to modify, suspend, or discontinue the Service, or any part thereof, at any time without prior notification or liability.
                                </p>
                                <p className="leading-relaxed">
                                    The Service is provided entirely on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express, implied, or statutory, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
                                </p>
                            </section>

                            <section id="acceptable-use" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptable Use Policy</h2>
                                <p className="leading-relaxed mb-4">
                                    As a condition of your use of the Platform, you agree to utilize the Service in a lawful manner, in accordance with these Terms. You explicitly agree not to utilize the Platform to:
                                </p>
                                <ul className="list-disc pl-6 space-y-3 mb-6">
                                    <li>Transmit, upload, or distribute any code, software, or material that is unlawful, harmful, defamatory, or otherwise objectionable.</li>
                                    <li>Distribute viruses, trojan horses, worms, logic bombs, or other malicious, destructive, or disruptive software.</li>
                                    <li>Attempt to gain unauthorized access to our servers, infrastructure, or any underlying databases connected to the Platform.</li>
                                    <li>Engage in any activity that could disable, overburden, or impair the proper working of the Service, including denial-of-service attacks.</li>
                                    <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity.</li>
                                </ul>
                            </section>

                            <section id="intellectual-property" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property</h2>
                                <p className="leading-relaxed mb-4">
                                    <strong>Platform Ownership:</strong> All rights, title, and interest in and to the codeshare 2.0 Platform (excluding user-generated content)—including its underlying software code, architectural design, trademarks, service marks, and graphical interfaces—are and will remain the exclusive intellectual property of codeshare 2.0 and its licensors.
                                </p>
                                <p className="leading-relaxed">
                                    <strong>User Content:</strong> You retain complete ownership of any original code, text, or data that you create, type, or paste into our collaborative rooms. By transmitting content through the Platform, you simply grant us a temporary, non-exclusive license solely as necessary to operate the real-time syncing capabilities of the Service during your active session.
                                </p>
                            </section>

                            <section id="termination" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Termination of Service</h2>
                                <p className="leading-relaxed">
                                    We reserve the absolute right to suspend or terminate your access to the Platform—immediately, without prior notice, and without incurring liability—under circumstances including, but not limited to, a breach of these Terms, requests by law enforcement, or extended periods of inactivity. Upon termination, your right to utilize the Service will cease instantly.
                                </p>
                            </section>

                            <section id="disclaimer" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Disclaimers & Limitation of Liability</h2>
                                <p className="leading-relaxed">
                                    In no event shall codeshare 2.0, nor its developers, partners, or affiliates, be held liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any unauthorized access, use, or alteration of your transmissions or content.
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

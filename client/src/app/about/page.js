"use client";

import Link from "next/link";
import { ChevronRight, Code2, Zap, Users, MonitorPlay, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const features = [
        {
            icon: <Users className="w-6 h-6 text-pink-500" />,
            title: "Live Multiplayer Cursors",
            description: "See exactly where your team is typing or pointing in real-time. No delays, just seamless collaboration."
        },
        {
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            title: "Lightning Fast Engine",
            description: "Powered by WebSockets and Next.js, experience zero-latency code distribution across the entire globe."
        },
        {
            icon: <MonitorPlay className="w-6 h-6 text-green-400" />,
            title: "Native Code Execution",
            description: "Compile and run Python, Java, C++, Go, and Javascript natively within the browser using secure Sandboxes."
        },
        {
            icon: <Sparkles className="w-6 h-6 text-purple-500" />,
            title: "Interactive Whiteboard",
            description: "Draw directly over the code to highlight syntax, map architectures, and explain concepts visually."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-white pb-20 overflow-hidden relative">
            {/* Dynamic Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <main className={`container mx-auto px-4 pt-32 transition-all duration-1000 transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-md">
                        <Code2 className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium tracking-wider uppercase text-gray-600 dark:text-gray-300">Welcome to Version 2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Code seamlessly, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Without boundaries.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                        codeshare 2.0 is the next generation of pair programming. Eliminate friction, drop complex environment setups, and jump straight into coding together.
                    </p>

                    <Link href="/" className="group relative inline-flex items-center justify-center px-8 py-4 mt-8 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#030712]">
                        <span className="mr-2">Start Coding Free</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className={`mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    {features.map((feature, idx) => (
                        <div key={idx} className="group p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-colors shadow-lg shadow-gray-200/20 dark:shadow-none hover:shadow-purple-500/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1f2937] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Technical Showcase */}
                <div className={`mt-32 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-left transition-all duration-1000 delay-500 transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-white">Built for modern standard syntax.</h2>
                            <p className="text-gray-400 text-lg">
                                Beneath the hood sits the industry-standard Monaco Editor engine wrapped by ultra-low-latency real-time socket connections.
                                Whether you're debugging a tricky algorithm or pair-programming an interview, the UI gets out of your way.
                            </p>
                        </div>
                        <div className="flex-1 w-full bg-[#111827] rounded-xl border border-gray-800 p-4 shadow-2xl header relative overflow-hidden">
                            <div className="flex gap-2 mb-4 border-b border-gray-800 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <pre className="text-sm font-mono text-gray-300">
                                <span className="text-pink-400">const</span> <span className="text-blue-400">session</span> <span className="text-white">=</span> <span className="text-pink-400">await</span> Codeshare.<span className="text-yellow-200">init</span>({'{'}<br />
                                {"  "}roomId: <span className="text-green-300">'awesome-session'</span>,<br />
                                {"  "}latency: <span className="text-purple-400">0.05</span>, <span className="text-gray-500">// ms</span><br />
                                {"  "}compilers: [<span className="text-green-300">'node'</span>, <span className="text-green-300">'python3'</span>]<br />
                                {'}'});<br /><br />
                                <span className="text-gray-500">// Connect directly to the mesh</span><br />
                                session.<span className="text-yellow-200">connect</span>();
                            </pre>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

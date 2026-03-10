"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Code2, ArrowRight, Zap, Users, Globe, Shield, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const router = useRouter();
    const [joinId, setJoinId] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const createRoom = () => {
        const roomId = uuidv4();
        router.push(`/${roomId}`);
    };

    const joinRoom = (e) => {
        e.preventDefault();
        if (joinId.trim()) {
            router.push(`/${joinId.trim()}`);
        }
    };

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-[#f9fafb] relative overflow-x-hidden transition-colors duration-300">

            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 select-none pointer-events-none" />

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-[10%] left-[15%] w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none select-none"
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] bg-pink-600/20 rounded-full blur-[128px] pointer-events-none select-none"
                animate={{
                    y: [0, 50, 0],
                    x: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <motion.div
                className="z-10 w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl px-4 pt-16 md:pt-24 mb-20 gap-12 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* LEFT COLUMN: Text & Actions */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[45%]">
                    <motion.div variants={itemVariants} className="mb-10 w-full">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes gradient-x {
                                0%, 100% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                            }
                            .animate-gradient-x {
                                background-size: 200% 200%;
                                animation: gradient-x 4s ease infinite;
                            }
                            @keyframes shimmer {
                                0% { background-position: -200% 0; }
                                100% { background-position: 200% 0; }
                            }
                            .animate-shimmer {
                                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%);
                                background-size: 200% 100%;
                                animation: shimmer 3s infinite linear;
                            }
                            @keyframes floatY {
                                0%, 100% { transform: translateY(0px) rotateX(2deg) rotateY(-5deg); }
                                50% { transform: translateY(-15px) rotateX(5deg) rotateY(-8deg); }
                            }
                            .animate-float-3d {
                                animation: floatY 6s ease-in-out infinite;
                                transform-style: preserve-3d;
                            }
                        `}} />
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 flex flex-col items-center lg:items-start max-w-[15ch] mx-auto lg:mx-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 pb-2 animate-gradient-x drop-shadow-[0_0_20px_rgba(236,72,153,0.2)] dark:drop-shadow-[0_0_20px_rgba(236,72,153,0.4)] leading-tight">
                            codeshare 2.0
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed pr-0 lg:pr-6">
                            Stop sharing screenshots. Start sharing <span className="text-gray-900 dark:text-white font-medium">live code</span>. The fastest way to collaborate, pair program, and debug with developers anywhere.
                        </p>
                    </motion.div>

                    {/* Inline Interaction UI */}
                    <motion.div variants={itemVariants} className="z-10 w-full max-w-md relative mx-auto lg:mx-0">

                        <button
                            onClick={createRoom}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 border border-transparent dark:bg-white text-white dark:text-gray-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 hover:text-white hover:border-transparent rounded-full text-lg font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] dark:hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 group"
                        >
                            <Code2 size={20} className="text-pink-400 dark:text-pink-600 group-hover:text-white transition-colors" />
                            <span>Create a New Room</span>
                        </button>

                        <div className="relative flex items-center py-6">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-[#030712] px-2">or join existing</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                        </div>

                        <form onSubmit={joinRoom} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Paste Room ID"
                                    value={joinId}
                                    onChange={(e) => setJoinId(e.target.value)}
                                    className="w-full bg-white dark:bg-[#0a0a0a]/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-full px-6 py-4 text-base outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white shadow-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!joinId.trim()}
                                className="px-8 py-4 shrink-0 bg-white dark:bg-[#1f2937] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-base font-medium transition-all shadow-sm flex items-center justify-center gap-2 group"
                            >
                                <span>Join</span>
                                <ArrowRight size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Live Preview Editor Window */}
                <motion.div variants={itemVariants} className="w-full lg:w-[50%] mt-12 lg:mt-0 perspective-[2000px]">
                    <div className="relative w-full aspect-[4/3] max-w-xl mx-auto animate-float-3d">
                        {/* Huge glow behind the window */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-[30px] blur-3xl opacity-50 dark:opacity-80"></div>

                        {/* macOS Window */}
                        <div className="relative w-full h-full bg-[#f6f8fa] dark:bg-[#0d1117] border border-gray-300 dark:border-[#30363d] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ring-1 ring-white/10 transition-colors duration-300">
                            {/* Window Header */}
                            <div className="bg-gray-200 dark:bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-gray-300 dark:border-[#30363d] transition-colors duration-300">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="bg-white dark:bg-[#0d1117] px-4 py-1 rounded-md text-xs font-mono text-gray-500 border border-gray-300 dark:border-[#30363d] shadow-sm flex items-center gap-2 transition-colors duration-300">
                                        <Code2 size={12} className="text-blue-500" />
                                        <span>codeshare-demo.js</span>
                                    </div>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <div className="flex-1 p-5 font-mono text-sm overflow-hidden relative leading-relaxed bg-white dark:bg-[#0d1117] transition-colors duration-300">
                                {/* Line numbers */}
                                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-[#0d1117] border-r border-gray-200 dark:border-[#30363d] pt-5 text-right pr-3 text-xs text-gray-400 dark:text-gray-600 select-none flex flex-col gap-[0.4rem] transition-colors duration-300">
                                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                                </div>

                                <div className="pl-10">
                                    <div className="flex text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="text-pink-600 dark:text-pink-400 mr-2">import</span>
                                        <span>{'{ useState, useEffect }'}</span>
                                        <span className="text-pink-600 dark:text-pink-400 mx-2">from</span>
                                        <span className="text-emerald-600 dark:text-emerald-400">'react'</span>;
                                    </div>
                                    <div className="flex text-gray-800 dark:text-gray-300 mb-4">
                                        <span className="text-pink-600 dark:text-pink-400 mr-2">export default function</span>
                                        <span className="text-blue-600 dark:text-blue-400">Collaboration()</span> {'{'}
                                    </div>

                                    <div className="text-gray-800 dark:text-gray-300 pl-4 mb-2 flex">
                                        <span className="text-purple-600 dark:text-purple-400 mr-2">const</span>
                                        <span>[code, setCode] =</span>
                                        <span className="text-blue-600 dark:text-blue-400 mx-2">useState</span>(<span className="text-emerald-600 dark:text-emerald-400">''</span>);
                                    </div>

                                    {/* Animated typing row */}
                                    <div className="relative pl-4 h-6 mb-2">
                                        {/* Remote cursor and tag */}
                                        <motion.div
                                            animate={{ x: [0, 40, 150, 220, 220, 0] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute top-0 left-4 bottom-0 flex flex-col pointer-events-none z-20"
                                        >
                                            <div className="relative h-full flex items-center">
                                                <div className="h-5 w-[2px] bg-pink-500 animate-pulse"></div>
                                                <div className="absolute top-[-22px] left-[-6px] bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap font-sans font-medium hidden sm:block">
                                                    Sarah
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Animated Text */}
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "220px" }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            className="overflow-hidden whitespace-nowrap text-gray-800 dark:text-gray-300 h-full flex items-center"
                                        >
                                            <span className="text-gray-800 dark:text-gray-300">
                                                <span className="text-purple-600 dark:text-purple-400 mr-2">await</span>
                                                <span className="text-blue-600 dark:text-blue-400">syncData</span>();
                                            </span>
                                        </motion.div>
                                    </div>

                                    <div className="text-gray-800 dark:text-gray-300 pl-4 mb-2 mt-4">
                                        <span className="text-pink-600 dark:text-pink-400">return</span> (
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-300 pl-8 mb-2">
                                        {'<div className="sync-active">'}
                                    </div>
                                    <div className="text-gray-400 dark:text-gray-500 pl-12 mb-2 italic">
                                        {'// Real-time magic happens here! ✨'}
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-300 pl-8 mb-2">
                                        {'</div>'}
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-300 pl-4 mb-2">
                                        );
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-300">
                                        {'}'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>



        </div>
    );
}

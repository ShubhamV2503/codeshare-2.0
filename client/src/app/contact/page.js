"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
                setTimeout(() => setStatus('idle'), 5000); // Reset status after 5s
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-[#f9fafb] pt-24 pb-20 px-4 transition-colors duration-300">
            {/* Animated Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 select-none pointer-events-none z-0" />

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 animate-gradient-x p-1">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Have a question, feedback, or just want to say hi? We'd love to hear from you. Fill out the form below.
                    </p>
                </div>

                {/* Centered Working Form */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 p-8 sm:p-12 rounded-2xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300 group">
                    {/* Subtle glowing border effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-8 text-center">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-[#030712] border border-gray-200 dark:border-[#1f2937] focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-[#030712] border border-gray-200 dark:border-[#1f2937] focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-[#030712] border border-gray-200 dark:border-[#1f2937] focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-[#030712] border border-gray-200 dark:border-[#1f2937] focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none text-gray-900 dark:text-white"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full flex items-center justify-center gap-2 group px-6 py-4 bg-gray-900 border border-transparent dark:bg-white text-white dark:text-gray-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 hover:text-white rounded-xl text-base font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] dark:hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-none"
                                >
                                    {status === 'loading' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </div>
                                    ) : status === 'success' ? (
                                        <div className="flex items-center gap-2 animate-[pulse_0.5s_ease-in-out]">
                                            <span>Message Sent!</span>
                                            <CheckCircle2 size={20} className="text-green-400 dark:text-green-500" />
                                        </div>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={18} className="text-pink-400 dark:text-pink-600 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-sm mt-2 text-center bg-red-500/10 py-2 rounded-lg">
                                    Failed to send message. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

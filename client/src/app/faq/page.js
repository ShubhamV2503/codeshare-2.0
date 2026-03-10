"use client";


export default function FAQ() {
    const faqs = [
        { question: "Is codeshare 2.0 completely free?", answer: "Yes! All of our core real-time code collaboration features are 100% free of charge." },
        { question: "Do I need an account to get started?", answer: "Not at all. You can jump directly into a room and start collaborating instantly without any sign-up process." },
        { question: "How many developers can code in a room at once?", answer: "There is no limit. You can invite as many people as you want to join your real-time session." },
        { question: "Does this work on smartphones?", answer: "Yes, the platform is thoroughly responsive, meaning you can easily review code or participate straight from your mobile device." },
        { question: "What languages can I write in?", answer: "We provide smart syntax highlighting and formatting for over 50 programming languages, from Python to JavaScript to Rust." },
        { question: "Are my coding sessions saved permanently?", answer: "Rooms are temporary and so is your data. Code only exists for the duration of your active collaborative session." },
        { question: "What makes codeshare 2.0 stand out?", answer: "We deliver a buttery smooth, zero-latency coding experience by pairing highly optimized WebSockets with the industry-standard Monaco Editor." },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-700 dark:text-gray-300 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#1f2937] p-8 md:p-12 rounded-2xl shadow-xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600 dark:text-gray-400">Everything you need to know about codeshare 2.0.</p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-[#111827] p-6 rounded-xl border border-gray-200 dark:border-[#1f2937] transition-colors duration-300">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

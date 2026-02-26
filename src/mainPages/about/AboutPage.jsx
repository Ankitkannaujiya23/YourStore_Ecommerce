import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="font-body overflow-hidden">

            {/* ================= HERO SECTION ================= */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-[#faf8f5] via-[#f5f0eb] to-[#ebe5de] overflow-hidden">

                {/* Floating Shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-[#c9ada7] rounded-full opacity-20 animate-float" />
                <div className="absolute bottom-32 right-16 w-32 h-32 bg-[#9a8c98] rounded-full opacity-15 animate-float delay-200" />
                <div className="absolute top-40 right-1/4 w-16 h-16 bg-[#4a4e69] rounded-full opacity-10 animate-float delay-500" />

                <div className="relative z-10 text-center max-w-4xl">
                    <p className="text-sm tracking-[0.3em] uppercase mb-6 text-[#9a8c98] animate-fade-up">
                        Crafted with Purpose
                    </p>

                    <h1 className="font-display text-4xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-[#1a1a2e] to-[#4a4e69] bg-clip-text text-transparent animate-fade-up-delay-1">
                        Where Quality Meets Passion
                    </h1>

                    <p className="text-lg md:text-xl text-[#4a4e69] max-w-2xl mx-auto animate-fade-up-delay-2">
                        We believe in creating products that inspire, delight, and stand
                        the test of time.
                    </p>

                    {/* Scroll Indicator */}
                    <div className="mt-16 animate-fade-up-delay-3">
                        <div className="w-6 h-10 border-2 border-[#9a8c98] rounded-full mx-auto flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-[#9a8c98] rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= STORY SECTION ================= */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* Image Block */}
                    <div className="relative">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#f4f3ee] to-[#e8e4df] flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-8xl mb-4">🌿</div>
                                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#c9ada7] to-[#9a8c98] rounded-full" />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1a1a2e] rounded-full flex items-center justify-center shadow-xl animate-float">
                            <div className="text-center text-white">
                                <p className="font-display text-3xl font-bold">10+</p>
                                <p className="text-xs opacity-70">Years</p>
                            </div>
                        </div>
                    </div>

                    {/* Story Content */}
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#c9ada7] mb-4">
                            Our Journey
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6">
                            A Story of Dedication
                        </h2>

                        <p className="text-lg text-[#4a4e69] mb-6">
                            What started as a small dream in 2014 has blossomed into something extraordinary.
                        </p>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            {[
                                { value: "50K+", label: "Happy Customers" },
                                { value: "200+", label: "Products" },
                                { value: "15", label: "Countries" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="text-center p-4 bg-[#faf8f5] rounded-2xl hover:-translate-y-2 transition duration-300"
                                >
                                    <p className="font-display text-3xl font-bold text-[#1a1a2e]">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-[#9a8c98]">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= VALUES SECTION ================= */}
            <section className="py-24 px-6 bg-[#1a1a2e] text-white">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <p className="uppercase tracking-[0.2em] text-[#c9ada7] mb-4">
                        What Drives Us
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold">
                        Our Core Values
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: "✨", title: "Quality First" },
                        { icon: "🌍", title: "Sustainability" },
                        { icon: "💝", title: "Customer Love" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-[#22223b] to-[#2a2a4a] p-8 rounded-3xl text-center hover:-translate-y-3 transition duration-500"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#c9ada7] to-[#9a8c98] text-4xl">
                                {item.icon}
                            </div>
                            <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                            <p className="text-[#9a8c98]">
                                Excellence and dedication define everything we create.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-24 px-6 bg-gradient-to-br from-[#c9ada7] to-[#9a8c98] text-center text-white">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                    Ready to Experience the Difference?
                </h2>

                <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">
                    Join thousands of happy customers today.
                </p>

                <Link to="/" className="px-10 py-4 bg-[#1a1a2e] rounded-full text-lg font-semibold hover:scale-105 hover:shadow-2xl transition duration-300">
                    Shop Our Collection
                </Link>
            </section>

        </div>
    );
};

export default AboutPage;
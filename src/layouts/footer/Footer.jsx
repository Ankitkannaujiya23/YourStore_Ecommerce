// import React from 'react'

// const Footer = () => {
//     return (
//         <div>
//             <footer className="text-gray-600 body-font">
//                 <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
//                     <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
//                         <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
//                                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
//                             </svg>
//                             <span className="ml-3 text-xl">Tailblocks</span>
//                         </a>
//                         <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
//                     </div>
//                     <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
//                         <div className="lg:w-1/4 md:w-1/2 w-full px-4">
//                             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
//                             <nav className="list-none mb-10">
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">First Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Second Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Third Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
//                                 </li>
//                             </nav>
//                         </div>
//                         <div className="lg:w-1/4 md:w-1/2 w-full px-4">
//                             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
//                             <nav className="list-none mb-10">
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">First Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Second Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Third Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
//                                 </li>
//                             </nav>
//                         </div>
//                         <div className="lg:w-1/4 md:w-1/2 w-full px-4">
//                             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
//                             <nav className="list-none mb-10">
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">First Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Second Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Third Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
//                                 </li>
//                             </nav>
//                         </div>
//                         <div className="lg:w-1/4 md:w-1/2 w-full px-4">
//                             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
//                             <nav className="list-none mb-10">
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">First Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Second Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Third Link</a>
//                                 </li>
//                                 <li>
//                                     <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
//                                 </li>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gray-100">
//                     <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
//                         <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
//                             <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</a>
//                         </p>
//                         <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
//                             <a className="text-gray-500">
//                                 <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
//                                 </svg>
//                             </a>
//                             <a className="ml-3 text-gray-500">
//                                 <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
//                                 </svg>
//                             </a>
//                             <a className="ml-3 text-gray-500">
//                                 <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
//                                     <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
//                                 </svg>
//                             </a>
//                             <a className="ml-3 text-gray-500">
//                                 <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
//                                     <circle cx="4" cy="4" r="2" stroke="none"></circle>
//                                 </svg>
//                             </a>
//                         </span>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default Footer



import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const footerLinks = {
        company: ["About Us", "Careers", "Blog"],
        support: ["Support", "Shipping Info", "Returns", "FAQ"],
        legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"],
    };

    const socialLinks = ["Facebook", "Twitter", "Instagram", "LinkedIn"];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setTimeout(() => {
            setSubscribed(false);
            setEmail("");
        }, 2500);
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-20">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="animate-fade-up">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">ShopVibe</h3>
                                <p className="text-sm text-gray-400">
                                    Your trusted online store
                                </p>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="flex gap-3 mt-4">
                            {socialLinks.map((s, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:-translate-y-1 transition-all"
                                >
                                    {s[0]}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((l, i) => (
                                <li key={i}>
                                    <span className="footer-link cursor-pointer text-gray-400 hover:text-emerald-500">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((l, i) => (
                                <li key={i}>
                                    <span className="footer-link cursor-pointer text-gray-400 hover:text-emerald-500">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((l, i) => (
                                <li key={i}>
                                    <span className="footer-link cursor-pointer text-gray-400 hover:text-emerald-500">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                Subscribe to our Newsletter
                            </h3>
                            <p className="text-emerald-100">
                                Get offers & updates in your inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg"
                            >
                                {subscribed ? "✓ Subscribed" : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© 2026 ShopVibe. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span className="footer-link hover:text-emerald-500 cursor-pointer">
                            Accessibility
                        </span>
                        <span className="footer-link hover:text-emerald-500 cursor-pointer">
                            Sitemap
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

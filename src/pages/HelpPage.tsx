import React from 'react';

const HelpPage: React.FC = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-navy-dark rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Help & FAQ</h1>
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">Getting Started</h2>
            <ol className="list-decimal pl-6 space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use the sidebar to select a calculator or tool.</li>
                <li>Enter your financial details as prompted.</li>
                <li>Review results instantly, export as PDF, or share.</li>
                <li>Access analytics and saved reports from the Dashboard.</li>
            </ol>
        </div>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-200">
            <li>
                <strong>How do I reset or clear my data?</strong><br />
                Go to the Dashboard and use the 'Clear History' button to remove all saved calculations.
            </li>
            <li>
                <strong>Why can't I see my previous reports?</strong><br />
                Make sure you are signed in. Reports are saved per user account for privacy.
            </li>
            <li>
                <strong>How do I contact support?</strong><br />
                WhatsApp <a href="https://wa.me/917018064385" className="underline text-green-600">7018064385</a> or email <a href="mailto:vkcalc.in@gmail.com" className="underline text-pink-600">vkcalc.in@gmail.com</a> anytime.
            </li>
            <li>
                <strong>App not loading or showing errors?</strong><br />
                Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact support.
            </li>
            <li>
                <strong>Is VKCalc.in free?</strong><br />
                Yes, all calculators and features are free to use.
            </li>
            <li>
                <strong>How do I update the app?</strong><br />
                If using as a PWA, refresh the page or reinstall from your browser menu to get the latest version.
            </li>
        </ul>
    </div>
);

export default HelpPage;



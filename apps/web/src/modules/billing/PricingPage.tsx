import { useState } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const [loading, setLoading] = useState(false);

    // 🔐 Load Razorpay script
    async function loadRazorpay() {
        return new Promise<boolean>((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    // 💳 Subscribe to plan
    async function subscribe(plan: 'starter' | 'pro') {
        setLoading(true);

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load');
            return;
        }

        // 🔁 Call backend to create subscription
        const response = await fetch('/api/billing/create-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plan })
        });

        const data = await response.json();

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            subscription_id: data.id,

            name: 'SUITCASE',
            description: 'Legal Practice OS',

            handler: async function (resp: any) {
                // ✅ Send to backend for verification
                await fetch('/api/billing/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resp)
                });

                alert('Subscription successful');
                window.location.reload();
            },

            theme: {
                color: '#000'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        setLoading(false);
    }

    // ➕ Buy Add-on
    async function buyAddon(addonType: string) {
        setLoading(true);

        const res = await loadRazorpay();

        const response = await fetch('/api/addons/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ addonType })
        });

        const order = await response.json();

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,

            name: 'SUITCASE Add-on',

            handler: async function (resp: any) {
                await fetch('/api/addons/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...resp,
                        addonType
                    })
                });

                alert('Add-on activated');
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        setLoading(false);
    }

    return (
        <div className="pricing-container">

            <h1>Argue Smarter. Win Faster.</h1>
            <p>Your AI-powered courtroom assistant</p>

            <div className="plans">

                {/* 🟢 Starter */}
                <div className="card">
                    <h2>Starter</h2>
                    <h3>₹499/month</h3>

                    <ul>
                        <li>Notes & Case Management</li>
                        <li>Basic AI Research</li>
                        <li>Document Generation</li>
                    </ul>

                    <button onClick={() => subscribe('starter')}>
                        Start Trial
                    </button>
                </div>

                {/* 🔵 Pro */}
                <div className="card highlight">
                    <h2>Professional</h2>
                    <h3>₹1499/month</h3>

                    <ul>
                        <li>Advanced AI Research</li>
                        <li>Verified Citations</li>
                        <li>Faster Results</li>
                    </ul>

                    <button onClick={() => subscribe('pro')}>
                        Upgrade
                    </button>
                </div>

            </div>

            <h2>Add-ons</h2>

            <div className="addons">

                <div className="card">
                    <h3>AI Courtroom Assistant</h3>
                    <p>Live suggestions in hearing</p>
                    <h4>₹799/month</h4>

                    <button onClick={() => buyAddon('AI_COURTROOM')}>
                        Add
                    </button>
                </div>

                <div className="card">
                    <h3>Voice Mode</h3>
                    <p>Hands-free usage</p>
                    <h4>₹399/month</h4>

                    <button onClick={() => buyAddon('VOICE_MODE')}>
                        Add
                    </button>
                </div>

            </div>

        </div>
    );
}
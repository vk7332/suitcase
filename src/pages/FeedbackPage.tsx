import React, { useState } from 'react';

const FeedbackPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feature, setFeature] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with backend/email service
        setSubmitted(true);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg glassmorphism">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Feedback & Feature Request</h2>
            {submitted ? (
                <div className="text-green-600 font-bold">Thank you for your feedback!</div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                        <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Feature Request</label>
                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={feature} onChange={e => setFeature(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Feedback</label>
                        <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" rows={4} value={feedback} onChange={e => setFeedback(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Submit</button>
                </form>
            )}
        </div>
    );
};

export default FeedbackPage;



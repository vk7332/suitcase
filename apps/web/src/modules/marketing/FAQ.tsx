const faqs = [
    {
        q: 'Are citations verified?',
        a: 'Yes. Verified citation integration reduces hallucinated references.'
    },
    {
        q: 'Can I use it during hearings?',
        a: 'Yes. Courtroom-safe mode is specifically designed for discreet assistance.'
    },
    {
        q: 'Is my data secure?',
        a: 'Files are protected using secure storage policies and signed URLs.'
    }
];

export default function FAQ() {
    return (
        <section className="section">

            <h2>Frequently Asked Questions</h2>

            <div className="faq-list">

                {faqs.map((f, i) => (
                    <div key={i} className="faq-item">

                        <h3>{f.q}</h3>

                        <p>{f.a}</p>

                    </div>
                ))}

            </div>

        </section>
    );
}
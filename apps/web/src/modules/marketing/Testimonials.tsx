const testimonials = [
    {
        quote:
            'The hearing assistant helped me stay organized during fast-paced arguments.'
    },
    {
        quote:
            'Draft generation significantly reduced preparation time.'
    }
];

export default function Testimonials() {
    return (
        <section className="section">

            <h2>What Advocates Say</h2>

            <div className="cards-grid">

                {testimonials.map((t, i) => (
                    <div key={i} className="info-card">

                        <p>"{t.quote}"</p>

                    </div>
                ))}

            </div>

        </section>
    );
}
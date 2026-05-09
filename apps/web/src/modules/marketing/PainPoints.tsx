const items = [
    {
        title: 'Courtroom Pressure',
        text:
            'Fast hearings, missed objections, and citation pressure can affect performance.'
    },
    {
        title: 'Manual Drafting',
        text:
            'Hours spent preparing written arguments, applications, and summaries.'
    },
    {
        title: 'Scattered Notes',
        text:
            'Important hearing points often get lost between files and notebooks.'
    }
];

export default function PainPoints() {
    return (
        <section className="section">

            <h2>
                Legal Practice Is Already Difficult.
                Your Software Should Reduce Pressure.
            </h2>

            <div className="cards-grid">
                {items.map((item, i) => (
                    <div key={i} className="info-card">

                        <h3>{item.title}</h3>

                        <p>{item.text}</p>

                    </div>
                ))}
            </div>

        </section>
    );
}
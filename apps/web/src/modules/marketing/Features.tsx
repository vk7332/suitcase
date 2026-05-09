const features = [
    {
        title: '⚡ AI Courtroom Assistance',
        text:
            'Receive whisper suggestions, objections, citations, and cross-exam prompts.'
    },
    {
        title: '📄 Draft Automation',
        text:
            'Generate written arguments, notices, and legal drafts instantly.'
    },
    {
        title: '📁 Smart Case Management',
        text:
            'Organize cases, annexures, hearing dates, and evidence securely.'
    },
    {
        title: '🎙️ Voice Notes',
        text:
            'Capture hearing notes quickly with voice and sync automatically.'
    }
];

export default function Features() {
    return (
        <section className="section">

            <h2>Everything Needed For Litigation Practice</h2>

            <div className="cards-grid">
                {features.map((f, i) => (
                    <div key={i} className="info-card">

                        <h3>{f.title}</h3>

                        <p>{f.text}</p>

                    </div>
                ))}
            </div>

        </section>
    );
}
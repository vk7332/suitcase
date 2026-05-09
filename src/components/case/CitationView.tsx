import React from "react";

interface Section {
    title: string;
    content: string[];
}

interface Props {
    sections: Section[];
}

const CitationView: React.FC<Props> = ({ sections }) => {
    if (!sections || sections.length === 0) {
        return <p>No citations available.</p>;
    }

    return (
        <div className="citation-container">
            {sections.map((section, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                    <h3>{section.title}</h3>

                    {section.content.map((para, idx) => (
                        <pre
                            key={idx}
                            style={{
                                whiteSpace: "pre-wrap",
                                background: "#f9f9f9",
                                padding: 10,
                                borderRadius: 6,
                            }}
                        >
                            {para}
                        </pre>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CitationView;
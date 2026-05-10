const SuggestionList = ({ queue, onSelect }) => {
    if (!queue.length) return null;

    return (
        <div style={styles.box}>
            <h4>📊 Suggestions</h4>

            {queue.map((s, i) => (
                <p key={i} onClick={() => onSelect(s.text)}>
                    {i === 0 ? "🔥" : "•"} {s.text}
                </p>
            ))}
        </div>
    );
};

const styles = {
    box: {
        position: "fixed",
        bottom: "150px",
        right: "20px",
        width: "260px",
        background: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "12px",
        zIndex: 9999,
    },
};

export default SuggestionList;

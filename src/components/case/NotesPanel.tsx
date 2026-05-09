import React from "react";

const NotesPanel = ({ notes, onClear }) => {
    if (!notes.length) return null;

    return (
        <div style={styles.panel}>
            <h4>📝 Quick Notes</h4>

            {notes.map((n, i) => (
                <p key={i}>• {n}</p>
            ))}

            <div style={styles.actions}>
                <button onClick={onClear}>🗑 Clear</button>
            </div>
        </div>
    );
};

const styles = {
    panel: {
        position: "fixed",
        top: "80px",
        right: "20px",
        width: "260px",
        background: "#fff",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        zIndex: 9999,
        fontSize: "13px",
    },
    actions: {
        marginTop: "10px",
    },
};

export default NotesPanel;
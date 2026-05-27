import React, { useState } from "react";

interface Props {
    onSubmit: (otp: string) => void;
    onClose: () => void;
}

const OTPModal: React.FC<Props> = ({ onSubmit, onClose }) => {
    const [otp, setOtp] = useState("");

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Enter OTP</h3>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={styles.input}
                />

                <div style={styles.actions}>
                    <button onClick={() => onSubmit(otp)}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default OTPModal;

const styles: any = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginTop: "10px",
    },
    actions: {
        marginTop: "15px",
        display: "flex",
        justifyContent: "space-between",
    },
};

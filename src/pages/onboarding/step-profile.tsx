import { useState } from "react";

export default function StepProfile({ next }: any) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <div>
            <h2 className="mb-4">Your Profile</h2>

            <input
                placeholder="Name"
                className="border p-2 block mb-2"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Phone"
                className="border p-2 block mb-2"
                onChange={(e) => setPhone(e.target.value)}
            />

            <button
                onClick={() => next({ name, phone })}
                className="bg-black text-white px-4 py-2"
            >
                Continue
            </button>
        </div>
    );
}
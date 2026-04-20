import { useEffect, useState } from "react";

export default function NotificationSettings({ user }: any) {
    const [prefs, setPrefs] = useState({
        email: true,
        sms: true,
        in_app: true,
    });

    useEffect(() => {
        fetch(`/api/notification/${user.id}`)
            .then((res) => res.json())
            .then(setPrefs);
    }, [user.id]);

    const save = async () => {
        await fetch("/api/notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id, ...prefs }),
        });

        alert("preferences updated");
    };

    return (
        <div className="p-6 max-w-md">

            <h2 className="text-lg font-bold mb-4">
                Notification Preferences
            </h2>

            {["email", "sms", "in_app"].map((key) => (
                <div key={key} className="flex justify-between mb-2">
                    <span>{key.toUpperCase()}</span>

                    <input
                        type="checkbox"
                        checked={(prefs as any)[key]}
                        onChange={(e) =>
                            setPrefs({
                                ...prefs,
                                [key]: e.target.checked,
                            })
                        }
                    />
                </div>
            ))}

            <button
                onClick={save}
                className="mt-4 px-4 py-2 bg-black text-white"
            >
                Save
            </button>
        </div>
    );
}
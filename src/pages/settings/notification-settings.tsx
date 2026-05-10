import { useEffect, useState } from "react";
import axios from "axios";

const NotificationSettings = () => {
    const [phone, setPhone] = useState("");
    const [whatsappEnabled, setWhatsappEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [pushEnabled, setPushEnabled] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await axios.get("/api/user/notification-settings");
            const data = res.data || {};

            setPhone(data.phone || "");
            setWhatsappEnabled(data.whatsapp ?? true);
            setSmsEnabled(data.sms ?? true);
            setPushEnabled(data.push ?? false);
        } catch {
            console.log("No existing settings");
        }
    };

    const save = async () => {
        try {
            await axios.post("/api/user/notification-settings", {
                phone,
                whatsapp: whatsappEnabled,
                sms: smsEnabled,
                push: pushEnabled,
            });

            alert("✅ Settings saved");
        } catch {
            alert("❌ Failed to save");
        }
    };

    const enablePush = async () => {
        try {
            const permission = await Notification.requestPermission();

            if (permission !== "granted") {
                alert("Permission denied");
                return;
            }

            const registration = await navigator.serviceWorker.register(
                "/sw.js"
            );

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "<YOUR_PUBLIC_VAPID_KEY>",
            });

            await axios.post("/api/push/subscribe", subscription);

            setPushEnabled(true);
            alert("🔔 Push notifications enabled");
        } catch (err) {
            console.log(err);
            alert("Push setup failed");
        }
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>📲 Notification Settings</h3>

            <div>
                <label>Phone Number:</label>
                <input
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={smsEnabled}
                        onChange={() => setSmsEnabled(!smsEnabled)}
                    />
                    SMS Alerts
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={whatsappEnabled}
                        onChange={() => setWhatsappEnabled(!whatsappEnabled)}
                    />
                    WhatsApp Alerts
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={pushEnabled}
                        onChange={() => enablePush()}
                    />
                    Push Notifications
                </label>
            </div>

            <button onClick={save}>Save Settings</button>
        </div>
    );
};

export default NotificationSettings;

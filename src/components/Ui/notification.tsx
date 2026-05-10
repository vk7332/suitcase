import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

type Notification = {
    id: string;
    message: string;
    read: boolean;
    created_at: string;
};

export default function NotificationCenter({ userId }: { userId: string }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    // 🔹 fetch notifications
    const fetchNotifications = async () => {
        const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (!error && data) {
            setNotifications(data);
        }
    };

    // 🔹 mark as read
    const markAsRead = async (id: string) => {
        await supabase
            .from("notifications")
            .update({ read: true })
            .eq("id", id);

        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    // 🔹 mark all as read
    const markAllAsRead = async () => {
        await supabase
            .from("notifications")
            .update({ read: true })
            .eq("user_id", userId);

        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    // 🔹 realtime listener
    useEffect(() => {
        fetchNotifications();

        const channel = supabase
            .channel("notifications-realtime")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    setNotifications((prev) => [
                        payload.new as Notification,
                        ...prev,
                    ]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative">
            {/* 🔔 BELL */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2"
            >
                🔔

                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* 📦 DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
                    <div className="flex justify-between items-center p-2 border-b">
                        <span className="font-semibold">Notifications</span>

                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600"
                        >
                            Mark all read
                        </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 && (
                            <p className="p-3 text-sm text-gray-500">
                                No notifications
                            </p>
                        )}

                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => markAsRead(n.id)}
                                className={`p-3 border-b cursor-pointer ${n.read ? "bg-white" : "bg-gray-100"
                                    }`}
                            >
                                <p className="text-sm">{n.message}</p>

                                <p className="text-xs text-gray-500">
                                    {new Date(n.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

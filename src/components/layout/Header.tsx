import { useNavigate } from "react-router-dom";
import { useClientAuth } from "@/hooks/useClientAuth";
import NotificationCenter from "@/components/Ui/notification";

export default function Header() {
  const { user, loading } = useClientAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <header className="w-full border-b bg-white px-6 py-3 flex justify-between items-center">

      {/* 🔷 LEFT */}
      <div className="flex items-center gap-6">
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          SUITCASE®
        </h1>

        <nav className="hidden md:flex gap-4 text-sm">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/cases")}>Cases</button>
          <button onClick={() => navigate("/calculator/court-fee")}>
            Court Fee
          </button>
        </nav>
      </div>

      {/* 🔷 RIGHT */}
      <div className="flex items-center gap-4">

        {user && <NotificationCenter userId={user.id} />}

        <div className="text-sm">
          {user?.email}
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="text-xs border px-2 py-1 rounded"
        >
          Settings
        </button>

      </div>
    </header>
  );
}

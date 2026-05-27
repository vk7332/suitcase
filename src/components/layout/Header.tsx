import { useNavigate, Link } from "react-router-dom";
import { useClientAuth } from "@/hooks/use-client-auth";
import NotificationCenter from "@/components/ui/Notification";

export default function Header() {
  const { user, loading } = useClientAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <header className="w-full border-b bg-white px-6 py-3 flex justify-between items-center">

      {/* 🔷 LEFT */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors flex items-center gap-1 font-medium text-sm"
        >
          <span>←</span> Back
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <Link
          to="/"
          className="text-lg font-bold cursor-pointer hover:text-[#089CCE] transition"
        >
          SUITCASE®
        </Link>

        <nav className="hidden md:flex gap-4 text-sm">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/advocate/cases")}>Cases</button>
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

import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const { user, signOut } = useAuth();

    return (
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
            <h1 className="text-lg font-semibold">
                Court Fee & Case Manager
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">{user?.email}</span>
                <button
                    onClick={signOut}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;



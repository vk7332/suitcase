import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <aside className="w-64 bg-white shadow-md">
            <div className="p-4 text-xl font-bold border-b">
                SUITCASE
            </div>
            <nav className="p-4 space-y-2">
                <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                </NavLink>
                <NavLink to="/clients" className={linkClass}>
                    Clients
                </NavLink>
                <NavLink to="/invoices" className={linkClass}>
                    Invoices
                </NavLink>
                <NavLink to="/reports" className={linkClass}>
                    Reports
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;

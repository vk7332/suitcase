import { Link } from "react-router-dom";

export default function DashboardLayout({ children }: any) {
    return (
        <div className="flex">

            {/* Sidebar */}
            <div className="w-64 h-screen bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">
                    VK Tax & Law Chamber®
                </h2>

                <nav className="flex flex-col gap-2">
                    <Link to="/legal">Dashboard</Link>
                    <Link to="/court-fee">Court Fee</Link>
                    <Link to="/filing-cost">Filing Cost</Link>
                    <Link to="/interest">Interest</Link>
                    <Link to="/limitation">Limitation</Link>
                    <Link to="/stamp-duty">Stamp Duty</Link>
                    <Link to="/total-case-cost">Total Case Cost</Link>
                    <Link to="/history">History</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50">
                {children}
            </div>

        </div>
    );
}



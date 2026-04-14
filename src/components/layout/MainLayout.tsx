import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;

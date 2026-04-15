import { outlet } from "react-router-dom";
import sidebar from "./sidebar";
import header from "./header";

const mainlayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <sidebar />
            <div className="flex flex-1 flex-col">
                <header />
                <main className="p-6">
                    <outlet />
                </main>
            </div>
        </div>
    );
};

export default mainlayout;
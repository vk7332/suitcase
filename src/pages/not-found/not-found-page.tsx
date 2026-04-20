import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="mt-2 text-gray-600">Page not found</p>
            <Link
                to="/dashboard"
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFoundPage;



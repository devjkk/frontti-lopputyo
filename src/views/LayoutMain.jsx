import { Link, Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold">Notes Management App</h1>
                    <nav className="flex gap-4">
                        <Link
                            to="/"
                            className="hover:text-gray-200 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/add-courses"
                            className="hover:text-gray-200 transition"
                        >
                            Add Courses
                        </Link>
                        <Link
                            to="/add-notes"
                            className="hover:text-gray-200 transition"
                        >
                            Add Notes
                        </Link>
                        <Link
                            to="/list-notes"
                            className="hover:text-gray-200 transition"
                        >
                            List Notes
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto py-8 px-4">
                <Outlet /> {/* Render child components */}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>© {new Date().getFullYear()} Notes Management App</p>
            </footer>
        </div>
    );
}

export default MainLayout;

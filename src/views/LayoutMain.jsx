import { Link, Outlet } from "react-router-dom";

function LayoutMain() {
    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-100 hover:text-blue-400 transition-colors">
                                Notes App
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/add-courses" 
                                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Add Course
                            </Link>
                            <Link 
                                to="/add-notes" 
                                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Add Note
                            </Link>
                            <Link 
                                to="/list-notes" 
                                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                List Notes
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-gray-300 text-center py-4">
                <p> {new Date().getFullYear()} Notes Management App</p>
            </footer>
        </div>
    );
}

export default LayoutMain;

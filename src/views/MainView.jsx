import { Link } from 'react-router-dom';

function MainView() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
                    Welcome to Notes Management
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Organize your course notes efficiently. Add courses, create notes, and keep track of your learning journey.
                </p>
                
                <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
                    <Link 
                        to="/add-courses" 
                        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-200 group"
                    >
                        <div className="text-blue-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-100 mb-2">Add Course</h2>
                        <p className="text-gray-400">Create a new course to organize your notes</p>
                    </Link>

                    <Link 
                        to="/add-notes" 
                        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-200 group"
                    >
                        <div className="text-blue-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-100 mb-2">Add Note</h2>
                        <p className="text-gray-400">Create a new note for your courses</p>
                    </Link>

                    <Link 
                        to="/list-notes" 
                        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-200 group"
                    >
                        <div className="text-blue-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-100 mb-2">View Notes</h2>
                        <p className="text-gray-400">Browse and manage your notes</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MainView;

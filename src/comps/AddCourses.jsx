import { useState } from "react";
import useStore from "../store/useStore";

function AddCourses() {
    const [courseName, setCourseName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const addCourse = useStore((state) => state.addCourse);
    const courses = useStore((state) => state.courses);
    const nextCourseId = useStore((state) => state.nextCourseId);

    const handleAdd = () => {
        setError("");
        setMessage("");
        
        const trimmedName = courseName.trim();
        if (trimmedName === "") {
            setError("Course name cannot be empty");
            return;
        }

        // Check for duplicate course names
        if (courses.some(course => course.name.toLowerCase() === trimmedName.toLowerCase())) {
            setError("A course with this name already exists");
            return;
        }

        setCourseName("");
        addCourse(trimmedName);
        setMessage(`Course "${trimmedName}" has been added with an ID of ${nextCourseId}`);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Add Course</h2>

                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
                            {message}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Course Name
                            </label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => {
                                    setCourseName(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter course name..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                            />
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={courseName.trim() === ""}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                        >
                            Add Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourses;

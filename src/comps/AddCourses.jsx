import { useState } from "react";
import useStore from "../store/useStore";

function AddCourses() {
    const [courseName, setCourseName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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

        addCourse(trimmedName);
        setMessage(`Course "${trimmedName}" has been added with an ID of ${nextCourseId}`);
        setCourseName("");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Course</h2>
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => {
                        setCourseName(e.target.value);
                        setError("");
                        setMessage("");
                    }}
                    placeholder="Enter course name"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAdd}
                    disabled={!courseName.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add
                </button>
                {error && <p className="text-red-600 font-medium">{error}</p>}
                {message && <p className="text-green-600 font-medium">{message}</p>}
            </div>
        </div>
    )
}

export default AddCourses;

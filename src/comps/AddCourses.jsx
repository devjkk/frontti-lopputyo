import { useState } from "react";
import useStore from "../store/useStore";

function AddCourses() {
    const [courseName, setCourseName] = useState("");
    const [message, setMessage] = useState("");

    const addCourse = useStore((state) => state.addCourse);
    const nextCourseId = useStore((state) => state.nextCourseId);
    
    const handleAdd = () => {
        if (courseName.trim() === "") {
            // TODO: show tooltips
            return;
        }

        setMessage(`new course "${courseName}" added with an ID of ${nextCourseId}`);
        addCourse(courseName);
        setCourseName("");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Course</h2>
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)} 
                  placeholder="Enter course name"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleAdd}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                >
                  Add
                </button>
                {message && <p className="text-green-600 font-medium">{message}</p>}
            </div>
        </div>
    )
}

export default AddCourses;

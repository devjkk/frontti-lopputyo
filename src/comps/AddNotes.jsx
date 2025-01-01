import { useState } from "react";
import useStore from "../store/useStore";
import CourseSelector from "./CourseSelector";

function AddNotes() {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [noteText, setNoteText] = useState("");
    const [sessionNotes, setSessionNotes] = useState([]);
    const [locked, setLocked] = useState(false);
    const [error, setError] = useState("");

    const addNote = useStore((state) => state.addNote);
    const getCourseById = useStore((state) => state.getCourseById);

    const validateForm = () => {
        if (noteText.trim() === "") {
            setError("Note text cannot be empty");
            return false;
        }
        if (selectedCourse === "") {
            setError("Please select a course");
            return false;
        }
        setError("");
        return true;
    };

    const handleCourseChange = (id) => {
        if (!locked) {
            setSelectedCourse(id);
            setLocked(true);
            setError("");
        }
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        const course = getCourseById(selectedCourse);
        if (!course) {
            setError("Invalid course selected");
            return;
        }

        const noteData = {
            text: noteText.trim(),
            course: course
        }

        addNote(noteData);
        setSessionNotes([...sessionNotes, noteData.text]);
        setNoteText("");
        setError("");
    }

    const handleReset = () => {
        setSelectedCourse("");
        setLocked(false);
        setSessionNotes([]);
        setError("");
        setNoteText("");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Note</h2>
            <div className="flex flex-col gap-4 w-full max-w-md">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <CourseSelector 
                    selectedCourse={selectedCourse}
                    onChange={handleCourseChange}
                    disabled={locked}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                />
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
                >
                    Reset
                </button>

                <textarea
                    value={noteText}
                    onChange={(e) => {
                        setNoteText(e.target.value);
                        setError("");
                    }}
                    placeholder="Enter your note here..."
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows="4"
                />
                <button
                    onClick={handleSave}
                    disabled={selectedCourse === "" || noteText.trim() === ""}
                    className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 disabled:opacity-50"
                >
                    Save
                </button>
            </div>

            {sessionNotes.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Session Notes</h3>
                    <ul className="space-y-2">
                        {sessionNotes.map((note, i) => (
                            <li key={i} className="p-4 bg-white border rounded-md shadow">
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default AddNotes;

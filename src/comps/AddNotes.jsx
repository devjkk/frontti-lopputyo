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
        <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Add Note</h2>
                
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Select Course
                            </label>
                            <CourseSelector 
                                selectedCourse={selectedCourse}
                                onChange={handleCourseChange}
                                disabled={locked}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Note Text
                            </label>
                            <textarea
                                value={noteText}
                                onChange={(e) => {
                                    setNoteText(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter your note here..."
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 min-h-[120px]"
                                rows="4"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSave}
                                disabled={selectedCourse === "" || noteText.trim() === ""}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                            >
                                Save Note
                            </button>
                            <button 
                                onClick={handleReset}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {sessionNotes.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-200 mb-4">Session Notes</h3>
                        <div className="space-y-3">
                            {sessionNotes.map((note, i) => (
                                <div 
                                    key={i} 
                                    className="p-4 bg-gray-700 rounded-lg border border-gray-600"
                                >
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddNotes;

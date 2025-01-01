import { useState } from "react";
import CourseSelector from "./CourseSelector";
import useStore from "../store/useStore";

function ListNotes() {
    const [selectedCourse, setSelectedCourse] = useState("all");
    const notes = useStore((state) => state.notes);
    const removeNote = useStore((state) => state.removeNote);

    const handleCourseChange = (id) => {
        setSelectedCourse(id);
    }

    const handleRemove = (id) => {
        removeNote(id);
    }

    const filteredNotes = selectedCourse === "all" ? 
        notes : 
        notes.filter((note) => note.course.id == selectedCourse);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">List of Notes</h2>
            <CourseSelector
                selectedCourse={selectedCourse} 
                onChange={handleCourseChange}
                className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none"
            />

            {filteredNotes.length === 0 ? (
                <p className="mt-6 text-gray-600">No notes for the selected course!</p>
            ) : (
                <ul className="mt-6 space-y-4 w-full max-w-3xl">
                    {filteredNotes.map((note) => {
                        return (
                            <li key={note.id} className="p-4 bg-white border rounded-md shadow">
                                <p className="mb-2">
                                    <strong>{note.text}</strong> (Course: {note.course.name}) -{" "}
                                    {note.timestamp}
                                </p>
                                <button 
                                    onClick={() => handleRemove(note.id)} 
                                    className="px-4 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default ListNotes;

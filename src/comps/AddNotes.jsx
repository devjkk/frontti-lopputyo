import { useState } from "react";
import useStore from "../store/useStore";
import CourseSelector from "./CourseSelector";

function AddNotes() {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [noteText, setNoteText] = useState("");
    const [sessionNotes, setSessionNotes] = useState([]);
    const [locked, setLocked] = useState(false);

    const addNote = useStore((state) => state.addNote);
    const courses = useStore((state) => state.courses);

    const handleCourseChange = (id) => {
        if (!locked) {
            setSelectedCourse(id);
            setLocked(true);
        }
    };

    const handleSave = () => {
        if (noteText.trim() === "" || selectedCourse === "") {
            // TODO: render tooltip for user
            return;
        }

        const course = courses.find((c) => c.id == selectedCourse);
        // TODO: handle invalid course id's
        if (!course) {
            return;
        }

        const noteData = {
            text: noteText,
            course: course
        }

        addNote(noteData);
        setSessionNotes([...sessionNotes, noteData.text]);
        setNoteText("");
    }

    const handleReset = () => {
        setSelectedCourse("");
        setLocked(false);
        setSessionNotes([]);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Note</h2>
            <div className="flex flex-col gap-4 w-full max-w-md">
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
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter your note here..."
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="4"
                />
                <button
                  onClick={handleSave}
                  disabled={selectedCourse === "" || noteText === ""}
                  className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 disabled:opacity-50"
                >
                  Save
                </button>
            </div>

            <ul className="mt-6 space-y-2">
                {sessionNotes.map((note, i) => {
                    return (
                        <li key={i} className="p-4 bg-white border rounded-md shadow">
                            {note}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AddNotes;

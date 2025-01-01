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
        <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Notes</h2>
                
                <div className="max-w-md mx-auto mb-8">
                    <CourseSelector
                        selectedCourse={selectedCourse} 
                        onChange={handleCourseChange}
                        type="list"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                    />
                </div>

                {filteredNotes.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800 rounded-lg">
                        <p className="text-gray-400 text-lg">No notes for the selected course</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredNotes.map((note) => (
                            <div 
                                key={note.id} 
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <p className="text-lg font-medium mb-2">{note.text}</p>
                                    <div className="flex items-center text-sm text-gray-400 mb-4">
                                        <span className="bg-gray-700 px-2 py-1 rounded-md">
                                            {note.course.name}
                                        </span>
                                        <span className="mx-2 text-gray-600">•</span>
                                        <span className="text-gray-500">ID: {note.course.id}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-4">
                                        {note.timestamp}
                                    </div>
                                    <button 
                                        onClick={() => handleRemove(note.id)}
                                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListNotes;

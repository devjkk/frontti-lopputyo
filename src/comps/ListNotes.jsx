import { useState, useEffect } from "react";
import CourseSelector from "./CourseSelector";
import useStore from "../store/useStore";

function ListNotes() {
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [selectedNote, setSelectedNote] = useState(null);
    const notes = useStore((state) => state.notes);
    const removeNote = useStore((state) => state.removeNote);

    const handleCourseChange = (id) => {
        setSelectedCourse(id);
    }

    const handleRemove = (id) => {
        if (selectedNote?.id === id) {
            setSelectedNote(null);
        }
        removeNote(id);
    }

    // Close modal with Escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setSelectedNote(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedNote) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedNote]);

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
                    <p className="text-center py-12 text-gray-400 text-lg">No notes for the selected course!</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredNotes.map((note) => (
                            <div 
                                key={note.id} 
                                className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative"
                                onClick={() => setSelectedNote(note)}
                            >
                                <button
                                    onClick={(e) => {
                                        // Stop event from bubbling up to parent div
                                        // This prevents the note modal from opening when removing the note
                                        e.stopPropagation();
                                        handleRemove(note.id);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-700/50 rounded-full transition-colors z-10"
                                    title="Remove note"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="p-6">
                                    <div className="mb-2">
                                        <p className="text-lg font-medium break-words line-clamp-3">
                                            {note.text}
                                        </p>
                                        {note.text.length > 150 && (
                                            <span className="text-blue-400 text-sm mt-1 group-hover:underline">
                                                Click to read more
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400 mb-4">
                                        <span className="bg-gray-700 px-2 py-1 rounded-md">
                                            {note.course.name}
                                        </span>
                                        <span className="mx-2 text-gray-600">•</span>
                                        <span className="text-gray-500">ID: {note.course.id}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {note.timestamp}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal for reading notes */}
                {selectedNote && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div 
                            className="bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 flex-1 overflow-y-auto">
                                <div className="flex justify-between items-start gap-4 mb-6">
                                    <div>
                                        <span className="bg-gray-700 px-2 py-1 rounded-md text-sm">
                                            {selectedNote.course.name}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-2">
                                            {selectedNote.timestamp}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedNote(null)}
                                        className="text-gray-400 hover:text-gray-200 p-1"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg whitespace-pre-wrap break-words">
                                        {selectedNote.text}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-700">
                                <button 
                                    onClick={() => handleRemove(selectedNote.id)}
                                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Remove Note
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListNotes;

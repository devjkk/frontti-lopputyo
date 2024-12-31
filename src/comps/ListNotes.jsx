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

    const filteredNotes = selectedCourse == "all" ? notes : notes.filter((note) => note.course.id == selectedCourse);

    return (
        <div>
            <CourseSelector
                selectedCourse={selectedCourse} 
                onChange={handleCourseChange}
            />
            {filteredNotes.length === 0 ? ( <p> No notes for the selected course!</p>) : (
            <ul>
                {filteredNotes.map((note) => {
                    return <li key={note.id}>
                            <p>
                                <strong>{note.text}</strong> (Course: {note.course.name}) -{" "}
                                {note.timestamp}
                            </p>
                            <button onClick={() => handleRemove(note.id)}>Remove</button>
                        </li>
                })}
            </ul>
            )}
        </div>
    )
}

export default ListNotes;
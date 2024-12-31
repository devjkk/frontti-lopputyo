import { useState } from "react";
import CourseSelector from "./CourseSelector";
import useStore from "../store/useStore";

function ListNotes() {
    const [selectedCourse, setSelectedCourse] = useState("all");
    const notes = useStore((state) => state.notes); 

    const handleCourseChange = (id) => {
        setSelectedCourse(id);
    }

    const filteredNotes = selectedCourse == "all" ? notes : notes.filter((note) => note.course.id == selectedCourse);

    return (
        <div>
            <CourseSelector
                selectedCourse={selectedCourse} 
                callback={handleCourseChange}
            />

            <ul>
                {filteredNotes.map((note) => {
                    return <li key={note.id}><strong>{note.text}</strong></li>
                })}
            </ul>

        </div>
    )
}

export default ListNotes;
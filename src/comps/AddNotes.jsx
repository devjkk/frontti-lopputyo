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
        <>
        <div>
            <CourseSelector 
              selectedCourse={selectedCourse}
              onChange={handleCourseChange}
              disabled={locked}
            />
            <button onClick={handleReset}>reset</button>
        </div>

        <div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
             />
             <button onClick={handleSave} disabled={selectedCourse === ""}>save</button>
        </div>

        <ul>
            {sessionNotes.map((note, i) => {
                return <li key={i}>{note}</li>
            })}
        </ul>
        </>
    )
}

export default AddNotes;
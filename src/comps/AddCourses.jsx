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
        <div>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)} 
            />
            <button onClick={handleAdd}>Add</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default AddCourses;
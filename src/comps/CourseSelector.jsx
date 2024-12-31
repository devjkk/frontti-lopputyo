import useStore from "../store/useStore";

function CourseSelector({ selectedCourse, onChange }) {
    const courses = useStore((state) => state.courses);

    return (
        <select value={selectedCourse} onChange={(e) => onChange(e.target.value)}>
            <option key="all" value="all">all</option>
            {courses.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
            })}
        </select>
    )
}

export default CourseSelector;
import useStore from "../store/useStore";

function CourseSelector({ selectedCourse, onChange }) {
    const courses = useStore((state) => state.courses);

    return (
        <select 
          value={selectedCourse} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            <option key="all" value="all">all</option>
            {courses.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
            })}
        </select>
    )
}

export default CourseSelector;

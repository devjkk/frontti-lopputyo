import useStore from "../store/useStore";

function CourseSelector({ selectedCourse, onChange, disabled, className, type = "add" }) {
    const courses = useStore((state) => state.courses);

    return (
        <select 
            value={selectedCourse} 
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        >
            {type === "add" ? (
                <option value="">Select a course</option>
            ) : (
                <>
                    <option value="all">All Courses</option>
                </>
            )}
            {courses.map((c) => (
                <option 
                    key={c.id} 
                    value={c.id}
                    className="bg-gray-800 text-gray-100"
                >
                    {c.name}
                </option>
            ))}
        </select>
    )
}

export default CourseSelector;

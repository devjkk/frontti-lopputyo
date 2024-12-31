import useStore from '../store/useStore';
import fetchJson from '../utils/fetchJson';

const initStore = async () => {
    try {
        const API = "https://luentomuistiinpano-api.netlify.app/.netlify/functions"; 
        const [courses, notes] = await Promise.all([
            fetchJson(`${API}/courses`),
            fetchJson(`${API}/notes`)
        ]);

        const maxNoteId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
        const maxCourseId = courses.length > 0 ? Math.max(...courses.map(course => course.id)) : 0

        useStore.setState({
            courses: courses,
            notes: notes,
            nextNoteId: maxNoteId + 1,
            nextCourseId: maxCourseId + 1
        });

        console.log(courses);
        console.log(notes);
    } catch (err) {
        // TODO: handle error, set error state
        console.log(err);
    }
};

export default initStore;
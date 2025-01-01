import useStore from '../store/useStore';
import fetchJson from '../utils/fetchJson';

const initStore = async () => {
    useStore.setState({ isLoading: true, error: null });
    
    try {
        const API = "https://luentomuistiinpano-api.netlify.app/.netlify/functions"; 
        const [courses, notes] = await Promise.all([
            fetchJson(`${API}/courses`),
            fetchJson(`${API}/notes`)
        ]);

        const maxNoteId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
        const maxCourseId = courses.length > 0 ? Math.max(...courses.map(course => course.id)) : 0

        useStore.setState({
            courses,
            notes,
            nextNoteId: maxNoteId + 1,
            nextCourseId: maxCourseId + 1,
            isLoading: false,
            error: null
        });
    } catch (err) {
        useStore.setState({ 
            isLoading: false, 
            error: "Failed to load data. Please refresh the page or try again later." 
        });
        console.error("Failed to initialize store:", err);
    }
};

export default initStore;
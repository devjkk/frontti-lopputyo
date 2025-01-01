import { create } from 'zustand';
import { formatTimestamp } from '../utils/dateUtils';

const useStore = create((set, get) => ({
    courses: [],
    notes: [],
    nextNoteId: 0,
    nextCourseId: 0,
    isLoading: false,
    error: null,

    getCourseById: (courseId) => {
        return get().courses.find((course) => course.id == courseId);
    },

    addNote: (noteData) => set((state) => {
        const newNote = {
            id: state.nextNoteId,
            timestamp: formatTimestamp(new Date()),
            ...noteData
        };

        return ({
            notes: [...state.notes, newNote],
            nextNoteId: state.nextNoteId + 1
        })
    }),

    addCourse: (courseName) => set((state) => {
        const newCourse = {
            id: state.nextCourseId,
            name: courseName
        };

        return {
            courses: [...state.courses, newCourse],
            nextCourseId: state.nextCourseId + 1
        }
    }),

    removeNote: (id) => set((state) => ({ 
        notes: state.notes.filter((note) => note.id !== id) 
    })),
}));

export default useStore;

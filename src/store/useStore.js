import { create } from 'zustand';

const useStore = create((set) => ({
    courses: [],
    notes: [],

    nextNoteId: 0,
    nextCourseId: 0,

    addNote: (noteData) => set((state) => {
        const newNote = {
            id: state.nextNoteId,
            timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
            ...noteData
        };

        return ({
            notes: [...state.notes, newNote],
            nextNoteId: state.nextNoteId+1
        })
    }),

    addCourse: (courseName) => set((state) => {
        const newCourse = {
            id: state.nextCourseId,
            name: courseName
        };

        return {
            courses: [...state.courses, newCourse],
            nextCourseId: state.nextCourseId+1
        }
    }),

    removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
}));

export default useStore;

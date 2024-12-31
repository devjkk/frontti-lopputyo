import { create } from 'zustand';

const useStore = create((set) => ({
    courses: [],
    notes: [],
}));

export default useStore;

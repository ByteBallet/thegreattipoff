import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set) => ({
    blackbooklist: [],
    addRunner: (runner) =>
        set((state) => {
            let chk = state.blackbooklist.find((item) => item === runner)
            if (!chk) {
                state.blackbooklist.push(runner);
            }
        }),
    removeRunner: (runner) =>
        set((state) => {
            state.blackbooklist = state.blackbooklist.filter((item) => item !== runner);
        }),
});

store = immer(store);
const blackbook = create(store);
export default blackbook;
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set) => ({
    Tipsters: 0,
    Runners: 0,
    initialise: (tipsters, runners) =>
        set((state) => {
            state.Tipsters = tipsters
            state.Runners = runners
        }),
    incrementFollows: (isTipster) =>
        set((state) => {
            if (isTipster) {
                state.Tipsters = ++state.Tipsters
            } else {
                state.Runners = ++state.Runners
            }
        }),
    decrementFollows: (isTipster) =>
        set((state) => {
            if (isTipster) {
                state.Tipsters = --state.Tipsters
            } else {
                state.Runners = --state.Runners
            }
        }),
    updateFollows: (isTipster, count) =>
        set((state) => {
            if (isTipster) {
                state.Tipsters != count && (state.Tipsters = count)
            } else {
                state.Runners != count && (state.Runners = count)
            }
        }),


});

store = immer(store);
const followcountStore = create(store);
export default followcountStore;
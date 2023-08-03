import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set) => ({
    tipsterFollowing: [],
    addTipster: (tipster) =>
        set((state) => {
            let chk = state.tipsterFollowing.find((item) => item === tipster)
            if (!chk) {
                state.tipsterFollowing.push(tipster);
            }
        }),
    removeTipster: (tipster) =>
        set((state) => {
            state.tipsterFollowing = state.tipsterFollowing.filter((item) => item !== tipster);
        }),
    syncTipsterFollowing: () =>
        set((state) => {
            // Sync tipster follow state to database
        }),
});

store = immer(store);
const followStore = create(store);
export default followStore;
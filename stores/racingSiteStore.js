import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set, get) => ({
    activeTab: 0,
    tracks: [],
    period: "90",
    bettype: "winEven",
    staking: "evenstake",
    tipster: "all",
    tipsterList: [],
    periodOptions: [],
    trackOptions: [],
    tracksList: [],
    racingSiteData: [],
    locid: "",
    lbData: [],
    tracksList: [],
    numTips: 1,
    updateStats: false,
    raceDayList: [],
    initializeStore: (element) =>
        set((state) => {
            state[element.key] = element.value;
        }),
    updateData: (element) =>
        set((state) => {
            state[element.key] = element.value;
        }),
});

store = immer(store);
const racingSiteStore = create(store);
export default racingSiteStore;

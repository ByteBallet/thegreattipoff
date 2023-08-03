import { getMinTips } from '@Components/utils/RacingUtil';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const initialState = {
    activeTab: 0,
    mediaGroups: [],
    media: 0,
    tracks: [],
    period: '90',
    bettype: 'winEven',
    staking: 'evenstake',
    tipster: 'all',
    periodOptions: [],
    trackOptions: [],
    locid: '',
    lbData: [],
    tracksList: [],
    numTips: 1,
    updateStats: false,
    raceday: '2000-01-01',
    racetrack: 0,
    raceTracksList: [],
    raceDayList: [],
    alternateRaceTrack: 'All',
    alternateRaceTrackValue: 0,
    trackValue: 0,
    initData: false,
}

let store = (set, get) => ({
    ...initialState,
    initializeStore: (element) =>
        set((state) => {
            state[element.key] = element.value;
        }),
    updateData: (element) =>
        set((state) => {
            state[element.key] = element.value;
        }),
    reset: () => {
        set(initialState)
    },
});

store = immer(store);
const lbStore = create(store);
export default lbStore;

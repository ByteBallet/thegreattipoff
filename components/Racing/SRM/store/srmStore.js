import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set) => ({
    srm: [],
    loading: false,
    addTip: (tip) =>
        set((state) => {
            state.srm.push(tip);
        }),
    toggleLoading: (value) =>
        set((state) => {
            state.loading = value;
        }),
    updateTip: (id, update) =>
        set((state) => {
            const tip = state.srm.find((item) => item.id === id);

            if (tip) {
                let selections = tip.selections[update.sType];
                if (update.type === 'add') {
                    selections.push(update.fieldnum);
                    tip.fieldnames[update.fieldnum] = update.fieldname;
                } else {
                    tip.selections[update.sType] = selections.filter(
                        (item) => item !== update.fieldnum
                    );
                }
            }
        }),
    deleteAll: (id) => set(state => {
        const updatedTips = state.srm.filter(item => item.id !== id)
        state.srm = [...updatedTips]
    })
});

store = immer(store);
const srmStore = create(store);
export default srmStore;

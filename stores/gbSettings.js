import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

let store = (set, get) => ({
    showUserDetailsPrompt: false,
    updateGbStore: (element) =>
        set((state) => {
            state[element.key] = element.value;
        }),
});

store = immer(store);
const gbSettings = create(store);
export default gbSettings;

import { writable } from 'svelte/store';

function createActiveStore() {
    const { subscribe, set, update } = writable({ activeRoom: '', activeUsername: '' });

    return {
        subscribe,
        setActive: (activeRoom, activeUsername) => {
            set({ activeRoom, activeUsername });
        }
    };
}

export const activeStore = createActiveStore();

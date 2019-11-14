import { writable } from 'svelte/store';

function createMessageStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        create: (room, username, message) => {
            update(messages => {
                if (messages[room]) {
                    messages[room] = [...messages[room], { username, message }];
                } else {
                    messages[room] = [{ username, message }];
                }
                return messages;
            });
        },
        join: (room, username) => {
            update(messages => {
                if (messages[room]) {
                    messages[room] = [...messages[room], { message: `${username} has joined` }];
                } else {
                    messages[room] = [{ message: `${username} has joined` }];
                }
                return messages;
            });
        }
    };
}

export const messageStore = createMessageStore();

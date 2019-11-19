import { writable } from 'svelte/store';

function createMessageStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        create: (room, username, message) => {
            update(messages => {
                messages[room] = [...messages[room], { username, message }];
                return messages;
            });
        },
        // We only need to check for empty room here
        join: (room, username) => {
            update(messages => {
                if (messages[room]) {
                    messages[room] = [...messages[room], { message: `${username} has joined` }];
                } else {
                    messages[room] = [{ message: `${username} has joined` }];
                }
                return messages;
            });
        },
        leave: (room, username) => {
            update(messages => {
                messages[room] = [...messages[room], { message: `${username} has left` }];
                return messages;
            });
        },
        close: room => {
            update(messages => {
                delete messages[room];
                return messages;
            });
        }
    };
}

export const messageStore = createMessageStore();

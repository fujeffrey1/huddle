import { writable } from 'svelte/store';
import { format } from 'date-fns';

function createMessageStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        create: (room, username, message, timestamp) => {
            update(messages => {
                messages[room] = [...messages[room], { username, message, timestamp: format(timestamp, 'p') }];
                return messages;
            });
        },
        // We only need to check for empty room here
        join: (room, username, timestamp) => {
            update(messages => {
                const message = `${username} has joined (${format(timestamp, 'p')})`;
                if (messages[room]) {
                    messages[room] = [...messages[room], { message }];
                } else {
                    messages[room] = [{ message }];
                }
                return messages;
            });
        },
        leave: (room, username, timestamp) => {
            update(messages => {
                messages[room] = [...messages[room], { message: `${username} has left (${format(timestamp, 'p')})` }];
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

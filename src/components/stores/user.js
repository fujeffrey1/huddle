import { writable } from 'svelte/store';

function createUserStore() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        join: (room, me, others) => {
            update(rooms => {
                rooms[room] = {
                    me,
                    others: others.reduce((acc, username) => {
                        acc[username] = { typing: false };
                        return acc;
                    }, {})
                };
                return rooms;
            });
        },
        add: (room, username) => {
            update(rooms => {
                rooms[room]['others'][username] = { typing: false };
                return rooms;
            });
        },
        remove: (room, username) => {
            update(rooms => {
                delete rooms[room]['others'][username];
                return rooms;
            });
        },
        startTyping: (room, username) => {
            update(rooms => {
                rooms[room]['others'][username].typing = true;
                return rooms;
            });
        },
        stopTyping: (room, username) => {
            update(rooms => {
                rooms[room]['others'][username].typing = false;
                return rooms;
            });
        },
        leave: room => {
            update(rooms => {
                delete rooms[room];
                return rooms;
            });
        }
    };
}

export const userStore = createUserStore();

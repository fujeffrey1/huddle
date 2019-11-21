import { readable } from 'svelte/store';
import io from 'socket.io-client';
import { notifier } from '@beyonk/svelte-notifications';
import { userStore } from './user';
import { messageStore } from './message';

const socket = io();

socket.on('join room', ({ room, username, timestamp }) => {
    userStore.add(room, username);
    messageStore.join(room, username, timestamp);
});

socket.on('message', ({ room, username, message, timestamp }) => {
    messageStore.create(room, username, message, timestamp);
});

socket.on('typing', ({ room, username }) => {
    userStore.startTyping(room, username);
});

socket.on('stop typing', ({ room, username }) => {
    userStore.stopTyping(room, username);
});

socket.on('leave room', ({ room, username, timestamp }) => {
    userStore.remove(room, username);
    messageStore.leave(room, username, timestamp);
});

socket.on('err', message => {
    notifier.danger(message);
});

export const socketStore = readable(socket, () => {});

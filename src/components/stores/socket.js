import { readable } from 'svelte/store';
import io from 'socket.io-client';
import { notifier } from '@beyonk/svelte-notifications';
import { userStore } from './user';
import { messageStore } from './message';

const socket = io();

socket.on('join room', ({ room, username }) => {
    userStore.add(room, username);
    messageStore.join(room, username);
});

socket.on('message', ({ room, username, message }) => {
    messageStore.create(room, username, message);
});

socket.on('typing', ({ room, username }) => {
    userStore.startTyping(room, username);
});

socket.on('stop typing', ({ room, username }) => {
    userStore.stopTyping(room, username);
});

socket.on('leave room', ({ room, username }) => {
    userStore.remove(room, username);
    messageStore.leave(room, username);
});

socket.on('err', message => {
    notifier.danger(message);
});

export const socketStore = readable(socket, () => {});

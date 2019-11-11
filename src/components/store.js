import { readable } from 'svelte/store';
import io from 'socket.io-client';
import { notifier } from '@beyonk/svelte-notifications';

const socket = io();

socket.on('err', message => {
    notifier.danger(message);
});

export const socketStore = readable(socket, () => {});

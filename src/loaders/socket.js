import io from 'socket.io';
import crypto from 'crypto';

const DEFAULT_USERNAME = 'Anonymous';

let socket;
let roomList = {};
// {
//     room: {
//         socketId: username,
//         socketId: username
//     },
//     room: {...}
// }

export { socket };

export default server => {
    socket = io(server).on('connection', socket => {
        socket.on('join room', ({ room, username }, ack) => {
            // Check if user is joining a room they are already in
            if (Object.keys(socket.rooms).includes(room)) {
                return socket.emit('err', `You are already in room '${room}'`);
            }
            // Check for existing username in room
            if (username && roomList[room] && Object.values(roomList[room]).includes(username)) {
                return socket.emit('err', `Username '${username}' is taken in room '${room}'`);
            } else {
                if (!username) {
                    const random = crypto.randomBytes(4).toString('hex');
                    username = `${DEFAULT_USERNAME}_${random}`;
                }
                if (!roomList[room]) {
                    roomList[room] = {};
                }
            }
            // Join room and add username to the room list
            const others = Object.values(roomList[room]);
            roomList[room][socket.id] = username;
            socket.join(room);
            // Tell other clients that someone joined
            const timestamp = Date.now();
            socket.to(room).emit('join room', { room, username, timestamp });
            ack({ room, me: username, others, timestamp });
        });

        socket.on('message', ({ room, username, message }, ack) => {
            const timestamp = Date.now();
            socket.to(room).emit('message', { room, username, message, timestamp });
            ack({ room, username, message, timestamp });
        });

        socket.on('typing', ({ room, username }) => {
            socket.to(room).emit('typing', { room, username });
        });

        socket.on('stop typing', ({ room, username }) => {
            socket.to(room).emit('stop typing', { room, username });
        });

        socket.on('leave room', (room, ack) => {
            socket.leave(room);
            leaveRoom(room, socket.id);
            ack(room);
        });

        socket.on('disconnect', () => {
            // Socket will leave rooms automatically
            // Only update roomList
            for (let room of Object.keys(roomList)) {
                leaveRoom(room, socket.id);
            }
        });
    });
};

function leaveRoom(room, socketId) {
    if (Object.keys(roomList[room]).length === 1) {
        delete roomList[room];
    } else {
        socket.to(room).emit('leave room', { room, username: roomList[room][socketId], timestamp: Date.now() });
        delete roomList[room][socketId];
    }
}

// TODO: Copy and paste room link
// TODO: CSS for messages (timestamp)
// TODO: list of users on hover

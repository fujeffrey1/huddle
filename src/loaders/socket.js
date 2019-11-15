import io from 'socket.io';

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
            // Default username
            if (!username) {
                username = DEFAULT_USERNAME;
            }
            // Check for existing username in room
            if (username !== DEFAULT_USERNAME && roomList[room] && Object.values(roomList[room]).includes(username)) {
                return socket.emit('err', `Username '${username}' is taken in room '${room}'`);
            }
            // Join room and add username to the room list
            if (!roomList[room]) {
                roomList[room] = {};
            }
            roomList[room][socket.id] = username;
            socket.join(room);
            // Tell other clients that someone joined
            socket.to(room).emit('join room', { room, username });
            ack({ room, username });
        });

        socket.on('message', ({ room, username, message }, ack) => {
            // Send message to other clients
            socket.to(room).emit('message', { room, username, message });
            ack({ room, username, message });
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
        socket.to(room).emit('leave room', { room, username: roomList[room][socketId] });
        delete roomList[room][socketId];
    }
}

// TODO: SEARCH ALL TODOS
// TODO: Number of people in each room?
// TODO: User is typing?
// TODO: Copy and paste room link

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
            socket.join(room);
            if (!roomList[room]) {
                roomList[room] = {};
            }
            roomList[room][socket.id] = username;
            ack({ room, username });
        });

        socket.on('leave room', room => {
            socket.leave(room);
            delete roomList[room][socket.id];
            if (Object.keys(roomList[room]).length === 0) {
                delete roomList[room];
            }
        });

        socket.on('disconnect', () => {
            // Socket will leave rooms automatically
            // Only update roomList
            for (let room of Object.keys(roomList)) {
                delete roomList[room][socket.id];
                if (Object.keys(roomList[room]).length === 0) {
                    delete roomList[room];
                }
            }
        });
    });
};

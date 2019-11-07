import io from 'socket.io';

export default server => {
    io(server).on('connection', socket => {
        console.log('connected');
    });
};

import io from 'socket.io';

export default server => {
    return io(server, { serveClient: false }).on('connection', socket => {
        console.log('connected');
    });
};

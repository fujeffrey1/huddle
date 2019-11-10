import http from 'http';
import loaders from './loaders';

async function startServer() {
    const server = http.createServer();
    const { app, io } = await loaders(server);

    return { app, io };
}

startServer();

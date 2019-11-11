import http from 'http';
import loaders from './loaders';

async function startServer() {
    const server = http.createServer();
    await loaders(server);
}

startServer();

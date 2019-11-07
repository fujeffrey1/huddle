import http from 'http';
import loaders from './loaders';

async function startServer() {
    const server = http.createServer();

    const app = await loaders(server);
    app.listen(process.env.PORT, err => {
        if (err) console.log('error', err);
    });
}

startServer();

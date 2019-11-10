import polkaLoader from './polka';
import socketLoader from './socket';

export default async server => {
    const app = await polkaLoader(server);
    const io = await socketLoader(server);

    return { app, io };
};

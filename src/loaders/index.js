import polkaLoader from './polka';
import socketLoader from './socket';

export default async server => {
    const app = await polkaLoader(server);
    await socketLoader(server);

    return app;
};

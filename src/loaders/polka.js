import polka from 'polka';
import compression from 'compression';
import sirv from 'sirv';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export default server => {
    return polka({ server })
        .use(bodyParser.json())
        .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
        .listen(PORT, err => {
            if (err) console.log('error', err);
        });
};

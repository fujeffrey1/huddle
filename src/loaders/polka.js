import polka from 'polka';
import compression from 'compression';
import sirv from 'sirv';
import * as sapper from '@sapper/server';

const dev = process.env.NODE_ENV === 'development';

export default server => {
    return polka({ server }).use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware());
};

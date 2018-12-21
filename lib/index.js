/** 
*  error middleware for development
*/
const { join } = require('path');
const cons = require('consolidate');

const TPL = join(__dirname, './public/error.html');

export default (opts)=> {
    opts = opts || {};
    
    const accepts = opts.accepts || ['html', 'text', 'json'];
    const env = opts.env || process.env.NODE_ENV || 'development';

    return async function error(ctx, next){
        try {
            await next();
        } catch(err) {
            ctx.app.emit('error', err, ctx);
            const errMsg = env === 'prod' ? 'Internal Server Error': err.message;

            switch(ctx.accepts(accepts)) {
                case 'text':
                    ctx.type = 'text/palin';
                    if(env == 'development') {
                        ctx.body = errMsg;
                    } else if(err.expose) {
                        ctx.body = errMsg;
                    } else {
                        throw err;
                    }
                    break;

                case 'json':
                    ctx.type = 'application/json'; 
                    if(env === 'development') {
                        ctx.body = { message: errMsg, satck: err.satck}
                    } else {
                        ctx.body = { message: errMsg}
                    }
                    break;

                case 'html': 
                    ctx.type = 'text/html';
                    cons.swig(TPL,{
                        env: env,
                        message:errMsg,
                        status: ctx.status,
                        stack: err.satck,
                        err: err
                    })
                    break;
            }
        }
    }
}
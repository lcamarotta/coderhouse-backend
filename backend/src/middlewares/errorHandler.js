import createErrorMessage from '../services/errors/info.js';

export default (error, req, res, next) => {
    const details = { 
        cause: error.type,
        code: error.code,
        message: createErrorMessage(error.type)
    }
    if(Number(error.code) < 500) req.logger.http(`${new Date().toISOString()} -- http error ${error.code}, ${details.cause}`);
    if(Number(error.code) >= 500) req.logger.error(`${new Date().toISOString()} -- http error ${error.code}, ${details.cause}`);
    res.status(error.code).send({ status: 'error', payload: details });
    next()
}
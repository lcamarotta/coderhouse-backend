import createErrorMessage from '../services/errors/info.js';

export default (error, req, res, next) => {
    const details = { 
        cause: error.type,
        code: error.code,
        message: createErrorMessage(error.type)
    }
    res.status(error.code).send({ status: 'error', payload: details })
    console.log('TEST LOG')
    next()
}
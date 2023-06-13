import createErrorMessage from '../services/errors/info.js';

export default (error, req, res, next) => {
    //if there is not an error message create one
    if(!error.message) error.message = createErrorMessage(error.name);
    if(Number(error.code) < 500) req.logger.http(`Error ${error.code} ${new Date().toISOString()} ${error.name} --- ${error.message}`);
    if(Number(error.code) >= 500) req.logger.error(`Error ${error.code} ${new Date().toISOString()} ${error.name} --- ${error.message}`);

    if(error.code > 500 || !error.code){
        req.logger.error(`Error ${error.code} ${new Date().toISOString()} ${error.name} --- ${error.message}`)
        error.code = 500;
    }
    
    res.status(error.code).send({ status: `Error ${error.code} - ${error.name}`, payload: `${error.message}` });
}
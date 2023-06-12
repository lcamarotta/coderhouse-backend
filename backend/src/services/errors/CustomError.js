export default class CustomError {
    static createError(err_enum = {name: 'UNHANDLED ERROR', code: 500}, message = null) {
        const error = new Error(err_enum.name);
        error.name = err_enum.name;
        error.code = err_enum.code;
        error.message = message;
        throw error;
    }
}
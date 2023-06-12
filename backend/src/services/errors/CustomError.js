export default class CustomError {
    static createError(err_enum) {
        let error = Error(err_enum.type, err_enum.code);
        error.type = err_enum.type;
        error.code = err_enum.code;
        error.handled = true
        return error;
    }
}
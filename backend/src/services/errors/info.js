const createErrorMessage = (errorType) => {
    switch (errorType) {
        case 'USER_AREADY_LOGGED':
            return 'You already authenticated';

        case 'BAD_REQUEST':
            return 'The resource does not exist';

        case 'BAD_PASSWORD':
            return 'Bad Password';

        case 'USER_NOT_EXIST':
            return 'The user does not exist';
    
        case 'INVALID_PARAMETER':
            return 'One or more parameters are incomplete or not a valid type';
    
        case 'USER_NOT_LOGGED':
            return 'User must be logged in to access this resource';
    
        case 'USER_MUST_BE_ADMIN':
            return 'You do not have permission to access this resource. Must be admin';
    
        case 'ITEM_NOT_FOUND':
            return 'The requested resource was not found';
    
        case 'DATABASE_ERROR':
            return 'DB Error';
    
        case 'SERVER_ERROR':
            return 'SERVER Error';

        case 'INVALID_CREDENTIALS':
            return 'Bad username or password';
    
        case 'FORBIDDEN':
            return 'You do not have permission to access this resource';
    
        default:
            return `UNKNOWN ERROR CASE ${errorType}`;
    }
}

export default createErrorMessage;
const createErrorMessage = (errorType) => {
    switch (errorType) {
    //400 - User errors
        case 'BAD_REQUEST': return 'The resource does not exist';
        
        case 'USER_AREADY_LOGGED': return 'You already authenticated';
        
        case 'BAD_PASSWORD': return 'Bad Password';

        case 'USER_NOT_EXIST': return 'The user does not exist';
        
        case 'USER_ALREADY_EXIST': return 'This email is already registered';
    
        case 'INVALID_PARAMETER': return 'One or more parameters are incomplete or not a valid type';
        
        case 'INVALID_CREDENTIALS': return 'Bad username or password';
        
        case 'FORBIDDEN': return 'You do not have permission to access this resource';
        
        case 'USER_NOT_LOGGED': return 'User must be logged in to access this resource';
        
        case 'USER_MUST_BE_ADMIN': return 'You do not have permission to access this resource. Must be admin';

        case 'USER_MUST_BE_PREMIUM': return 'You do not have permission to access this resource. Must be premium';
        
        case 'ITEM_NOT_FOUND': return 'The requested resource was not found';
        
    //500 - Server errors
        case 'SERVER_ERROR': return 'SERVER Error';
        
        case 'DATABASE_ERROR': return 'DB Error';
    
        default: return `MESSAGE UNKNOWN`;
    }
}

export default createErrorMessage;
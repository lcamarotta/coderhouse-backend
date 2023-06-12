const EErrors = {
    //400 - User errors
    BAD_REQUEST: { name: 'BAD_REQUEST', code: 400 },
    USER_AREADY_LOGGED: { name: 'USER_AREADY_LOGGED', code: 400 },

    BAD_PASSWORD: { name: 'BAD_PASSWORD', code: 401 },
    USER_NOT_EXIST: { name: 'USER_NOT_EXIST', code: 401 },
    USER_ALREADY_EXIST: { name: 'USER_ALREADY_EXIST', code: 401 },
    INVALID_PARAMETER: { name: 'INVALID_PARAMETER', code: 401 },
    INVALID_CREDENTIALS: { name: 'INVALID_CREDENTIALS', code: 401 },

    FORBIDDEN: { name: 'FORBIDDEN', code: 403 },
    USER_NOT_LOGGED: { name: 'USER_NOT_LOGGED', code: 403 },
    USER_MUST_BE_ADMIN: { name: 'USER_MUST_BE_ADMIN', code: 403 },

    ITEM_NOT_FOUND: { name: 'ITEM_NOT_FOUND', code: 404 },

    //500 - Server errors
    SERVER_ERROR: { name: 'SERVER_ERROR', code: 500 },
    DATABASE_ERROR: { name: 'DATABASE_ERROR', code: 500 }
};

export default EErrors;
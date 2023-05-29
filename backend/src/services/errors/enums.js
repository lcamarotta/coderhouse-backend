const EErrors = {
    USER_AREADY_LOGGED: { type: 'USER_AREADY_LOGGED', code: 400 },
    BAD_REQUEST: { type: 'BAD_REQUEST', code: 400 },
    INVALID_PARAMETER: { type: 'INVALID_PARAMETER', code: 401 },
    USER_NOT_LOGGED: { type: 'USER_NOT_LOGGED', code: 403 },
    USER_MUST_BE_ADMIN: { type: 'USER_MUST_BE_ADMIN', code: 403 },
    ITEM_NOT_FOUND: { type: 'ITEM_NOT_FOUND', code: 404 },
    DATABASE_ERROR: { type: 'DATABASE_ERROR', code: 500 },
    SERVER_ERROR: { type: 'SERVER_ERROR', code: 500 },
    INVALID_CREDENTIALS: { type: 'INVALID_CREDENTIALS', code: 401 },
    USER_NOT_EXIST: { type: 'USER_NOT_EXIST', code: 401 },
    BAD_PASSWORD: { type: 'BAD_PASSWORD', code: 401 },
    FORBIDDEN: { type: 'FORBIDDEN', code: 403 }
};

export default EErrors;
class ApiError extends Error {
    statusCode;
    error;

    constructor(statusCode, message, error) {
        super(message)
        this.statusCode = statusCode
        this.error = error
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }

    static unauthorized(message) {
        return new ApiError(401, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static notFound(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }
}

module.exports = ApiError
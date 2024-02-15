const responseM = {

    success: (res,data, message) => {
        return res.status(200).json({
            message: message || 'Success',
            data: data
        });
    },
    
    notFound: (res, message) => {
        return res.status(404).json({
            message: message || 'Not found',
            code: 404
        });
    },

    badRequest: (res, message) => {
        return res.status(400).json({
            message: message || 'Bad request',
            code: 400
        });
    },

    unauthorized: (res, message) => {
        return res.status(401).json({
            message: message || 'Unauthorized',
            code: 401
        });
    },

    tooManyRequests: (res, message) => {
        return res.status(429).json({
            message: message || 'Too many requests',
            code: 429
        });
    },

    serverError: (res, message) => {
        return res.status(500).json({
            message: message || 'Server error',
            code: 500
        });
    },

    gatewayTimeout: (res, message) => {
        return res.status(504).json({
            message: message || 'Gateway timeout',
            code: 504
        });
    }
}

module.exports = responseM;
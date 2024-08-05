const STATUS_CODE = {
    200: 'success',
    201: 'success',
    400: 'fail',
    401: 'fail',
    404: 'fail',
    500: 'error'
}

function dataResponse(res, statusCode, payload) {
    return res.status(statusCode).json({
        status: STATUS_CODE[statusCode],
        data: payload
    })
}

module.exports = {
    dataResponse
}
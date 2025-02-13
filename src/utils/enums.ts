export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum NetworkStatusCodes {
    UnAuthorizedUser = 401,
    BadRequest = 400,
    ServerInternalError = 500,
    OK_200 = 200,
    OK_299 = 299
}

export enum OrdersActionTypes {
    FETCH_ORDERS = "FETCH_ORDERS",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILURE = "FETCH_FAILURE",
    SET_PAGE = "SET_PAGE",
    NEXT_PAGE = "NEXT_PAGE",
    PREV_PAGE = "PREV_PAGE",
    TOGGLE_ORDER_STATUS = "TOGGLE_ORDER_STATUS",
}
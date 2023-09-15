import EnumsErrors from "../../utils/error-enums.js";


export const ErrorHandler = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.cause) {
        case EnumsErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.ROUTING_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.DATABE_ERROR:
            res.send({status: "error", error: error.name});
            break;
        default:
            res.send({status: "error", error: "Unhandled error"});
            break;
    }
}
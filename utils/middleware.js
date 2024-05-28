const logger = require("./logger");
// const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};
// const userExtractor = (request, response, next) => {
//     // code that extracts the token
//     const decodedToken = jwt.verify(request.token, process.env.SECRET);
//     if (!decodedToken.id) {
//         console.log("usename",decodedToken.id);
//         return response.status(401).json({ error: "token missing or invalid" });
//     }
//     request.user= decodedToken.id;
//     next();
// };

// const tokenExtractor = (request, response, next) => {
//     // code that extracts the token
//     const authorization = request.get("authorization");
//     if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//         request.token= authorization.substring(7);
//     }else
//         request.token= null;
//     next();
// };
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
    next();
};

const errorHandler = (error, request, response, next) => {
    console.log("msg",error.message);
    console.log("name",error.name);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "mal-formatted id" });
    }else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }else if(error.name === "MongoServerError")
        return response.status(400).json({ error: "Name already exists" });
    // else if (error.name === "JsonWebTokenError")
    //     return response.status(401).json({ error: "invalid token" });
    // else if (error.name === "TokenExpiredError")
    //     return response.status(401).json({ error: "token expired" });
    next(error);
};

module.exports = {
    // tokenExtractor,
    // userExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler
};
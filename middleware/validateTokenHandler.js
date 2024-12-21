const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(
    (req, res, next) => {

        console.log(req.headers['authorization']);
        let token;
        let authHeader = req.headers['Authorization'] || req.headers['authorization'];
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw Error("User Not Authorized");
                }
                console.log("User Decoded !", decoded.user._id);
                req.user = decoded.user;
                next()
            });
        }
        else {
            res.status(401);
            throw Error("JWT Required");
        }
    });

module.exports = validateToken;
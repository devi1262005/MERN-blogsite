const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Note: " " is used to split the token from "Bearer <token>"

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // 403 is generally used for forbidden errors
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};

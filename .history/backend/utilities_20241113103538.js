const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: true, message: "Authorization token not provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err); // Log the error for debugging
            return res.status(403).json({ error: true, message: "Invalid or expired token" });
        }

        req.user = user; // Attach the decoded user info to the request object
        next();
    });
}

module.exports = {
    authenticateToken,
};

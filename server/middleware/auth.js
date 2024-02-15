import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** 
 * Auth middleware to validate JWT tokens
 */
export default async function Auth(req, res, next) {
    try {
        // Access the Authorization header to validate the request
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token and retrieve the user details of the logged-in user
        const decodedToken = jwt.verify(token, ENV.JWT_SECRET);

        // Attach the user details to the request object
        req.user = decodedToken;

        // Proceed to the next middleware
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication failed!" });
    }
}

/**
 * Middleware to set local variables for the request
 */
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
}
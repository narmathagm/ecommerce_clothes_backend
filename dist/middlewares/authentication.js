"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getJwtSecret() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not configured.");
    }
    return secret;
}
function createAuthError(message, status = 401) {
    const err = new Error(message);
    err.status = status;
    return err;
}
function expressAuthentication(request, securityName, scopes) {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];
        const bodyToken = request.body && typeof request.body === 'object' ? request.body.token : undefined;
        const queryToken = request.query && typeof request.query === 'object' ? request.query.token : undefined;
        const headerToken = request.headers["x-access-token"];
        const bearerToken = typeof authHeader === "string"
            ? authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : authHeader
            : undefined;
        const token = bodyToken || queryToken || headerToken || bearerToken;
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(createAuthError("No token provided", 401));
                return;
            }
            jsonwebtoken_1.default.verify(token, getJwtSecret(), function (err, decoded) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        reject(createAuthError("JWT token expired", 401));
                    }
                    else {
                        reject(createAuthError("Invalid JWT token", 401));
                    }
                }
                else {
                    // Check scopes if provided (e.g. roles)
                    if (scopes && scopes.length > 0) {
                        // Scope check based on role
                        // roles: 1 = Admin, 2 = User
                        let hasScope = false;
                        if (scopes.includes("admin") && decoded.role_id === 1)
                            hasScope = true;
                        if (scopes.includes("user") && decoded.role_id === 2)
                            hasScope = true;
                        if (scopes.includes("any"))
                            hasScope = true;
                        if (!hasScope) {
                            reject(createAuthError("JWT does not contain required scope.", 403));
                            return;
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
    return Promise.reject({});
}

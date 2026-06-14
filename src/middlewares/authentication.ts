import * as express from "express";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not configured.");
    }
    return secret;
}

function createAuthError(message: string, status = 401) {
    const err = new Error(message) as Error & { status?: number };
    err.status = status;
    return err;
}

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];
        const bodyToken = request.body && typeof request.body === 'object' ? (request.body as any).token : undefined;
        const queryToken = request.query && typeof request.query === 'object' ? (request.query as any).token : undefined;
        const headerToken = request.headers["x-access-token"] as string | undefined;
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
            jwt.verify(token, getJwtSecret(), function (err: any, decoded: any) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        reject(createAuthError("JWT token expired", 401));
                    } else {
                        reject(createAuthError("Invalid JWT token", 401));
                    }
                } else {
                    // Check scopes if provided (e.g. roles)
                    if (scopes && scopes.length > 0) {
                        // Scope check based on role
                        // roles: 1 = Admin, 2 = User
                        let hasScope = false;
                        if (scopes.includes("admin") && decoded.role_id === 1) hasScope = true;
                        if (scopes.includes("user") && decoded.role_id === 2) hasScope = true;
                        if (scopes.includes("any")) hasScope = true;

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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message = "something went wrong", errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.default = ApiError;

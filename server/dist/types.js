"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateblogsinput = exports.blogsinput = exports.signininput = exports.signupinput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupinput = zod_1.default.object({
    email: zod_1.default
        .string()
        .min(5, { message: "username of min 5 character" })
        .email({ message: "Invalid email address" }),
    password: zod_1.default.string().min(6, { message: "Password must be 6 or more characters long" }),
    firstname: zod_1.default
        .string()
        .optional(),
    lastname: zod_1.default
        .string()
        .optional(),
});
exports.signininput = zod_1.default.object({
    email: zod_1.default
        .string()
        .min(5, { message: "username of min 5 character" })
        .email({ message: "Invalid email address" }),
    password: zod_1.default.string().min(6, { message: "password must be 6 or more characters long" }),
});
exports.blogsinput = zod_1.default.object({
    title: zod_1.default.string().min(1, { message: "username of min 1 character" }),
    description: zod_1.default.string().optional(),
    upvotes: zod_1.default.number().optional(),
});
exports.updateblogsinput = zod_1.default.object({
    title: zod_1.default
        .string()
        .min(1, { message: "username of min 1 character" })
        .optional(),
    description: zod_1.default.string().optional(),
    userid: zod_1.default.number().optional(),
});

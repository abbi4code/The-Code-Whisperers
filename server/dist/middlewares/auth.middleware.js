"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretkey = process.env.JWT_SECRET || "abhishek";
const authvalidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        const validtoken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        //  console.log(validtoken)
        if (!validtoken) {
            return res.status(404).json({ msg: "token not provided" });
        }
        const decoded = yield jsonwebtoken_1.default.verify(validtoken, secretkey);
        if (!decoded) {
            return res.status(404).json({ msg: "invalid token" });
        }
        //  console.log(decoded)
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ msg: "Error while token validation", error });
    }
});
exports.default = authvalidation;

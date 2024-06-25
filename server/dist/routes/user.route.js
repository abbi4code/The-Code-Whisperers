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
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const secretkey = process.env.JWT_SECRET || "abhishek";
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    try {
        const validuser = types_1.signupinput.safeParse({ email: details.email, password: details.password, fullname: details.fullname });
        if (!validuser.success) {
            const msg = validuser.error.errors.map((item) => item.message);
            return res.json({ msg });
        }
        const existuser = yield prisma.user.findUnique({
            where: {
                //@ts-ignore
                email: details.email
            }
        });
        if (existuser) {
            return res.status(400).json({ msg: "user already exist" });
        }
        const newuser = yield prisma.user.create({
            data: {
                email: details.email,
                password: details.password,
                fullname: details.fullname
            }
        });
        console.log(newuser);
        const userid = newuser.id;
        const token = jsonwebtoken_1.default.sign({ userid }, secretkey);
        res.status(200).json({ msg: "user successfully signup", token });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "error while signup" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    try {
        const validuser = types_1.signininput.safeParse({
            email: details.email,
            password: details.password,
        });
        if (!validuser.success) {
            const msg = validuser.error.errors.map((item) => item.message);
            return res.json({ msg });
        }
        const existuser = yield prisma.user.findUnique({
            where: {
                //@ts-ignore
                email: details.email,
            },
        });
        if (!existuser) {
            return res.status(400).json({ msg: "user not exist" });
        }
        const user = yield prisma.user.findUnique({
            where: {
                email: details.email,
                password: details.password,
            },
        });
        console.log(user);
        //@ts-ignore
        const userid = user.id;
        const token = jsonwebtoken_1.default.sign({ userid }, secretkey);
        res.status(200).json({ msg: "user successfully signin", token });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "error while signin" });
    }
}));
exports.default = router;

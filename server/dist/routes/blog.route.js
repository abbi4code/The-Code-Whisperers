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
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const types_1 = require("../types");
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../utils/apiError"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/create', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    try {
        const validinputs = types_1.blogsinput.safeParse({
            title: inputs.title,
            description: inputs.description,
            imageurl: inputs.imageurl,
        });
        if (!validinputs.success) {
            const msg = validinputs.error.errors.map((item) => item.message);
            return res.status(404).json({ msg });
            // throw new ApiError(404,msg)
        }
        // @ts-ignore
        const userid = req.user.userid;
        // @ts-ignore
        const imgurlpath = req.files.imageurl[0].path;
        console.log(req.files);
        console.log(imgurlpath);
        if (!imgurlpath) {
            throw new apiError_1.default(401, "img not uploaded");
        }
        const img = yield (0, cloudinary_1.default)(imgurlpath);
        if (!img) {
            throw new apiError_1.default(400, "input img required");
        }
        const blog = yield prisma.blogs.create({
            data: {
                title: inputs.title,
                description: inputs.description,
                userid: userid,
                imageurl: img.url,
            },
        });
        console.log(blog);
        res.status(200).json({ blog });
    }
    catch (error) {
        console.group(error);
        res.json({ error });
    }
}));
router.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bulk = yield prisma.blogs.findMany();
    return res.status(200).json({ bulk });
}));
router.get('/myblogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = parseInt(req.query.id);
    if (!id) {
        res.status(404).json({ msg: "blog id not provided" });
    }
    const blogs = yield prisma.blogs.findMany({
        where: {
            userid: id
        }
    });
    if (!blogs) {
        res.status(404).json({ msg: "invalid id" });
    }
    res.json({ blogs });
}));
//unique blog
router.get('/uniqueblog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogid = req.query.blogid;
    if (!blogid) {
        res.status(404).json({ msg: "blog id not provided" });
    }
    const blogobject = yield prisma.blogs.findUnique({
        where: {
            //@ts-ignore
            id: blogid
        },
    });
    if (!blogobject) {
        res.status(404).json({ msg: "invalid id" });
    }
    const blog = {
        title: blogobject === null || blogobject === void 0 ? void 0 : blogobject.title,
        description: blogobject === null || blogobject === void 0 ? void 0 : blogobject.description,
        upvotes: blogobject === null || blogobject === void 0 ? void 0 : blogobject.upvotes,
        imageurl: blogobject === null || blogobject === void 0 ? void 0 : blogobject.imageurl
    };
    res.status(200).json({ blog });
}));
router.post('/update', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogid = req.query.blogid;
    if (!blogid) {
        res.status(404).json({ msg: "blog id not provided" });
    }
    const details = req.body;
    try {
        //@ts-ignore
        const userid = req.user.userid;
        console.log(userid);
        const validinputs = types_1.updateblogsinput.safeParse({
            title: details.title,
            description: details.description,
        });
        if (!validinputs.success) {
            const msg = validinputs.error.errors.map((err) => err.message);
            return res.status(404).json({ msg });
        }
        const datatoupdate = {};
        if (details.title) {
            datatoupdate.title = details.title;
        }
        if (details.description) {
            datatoupdate.description = details.description;
        }
        const blog = yield prisma.blogs.update({
            where: {
                //@ts-ignore
                id: blogid,
                userid: userid
            },
            data: datatoupdate,
        });
        if (!blog) {
            return res.status(400).json({ msg: "blog not found" });
        }
        console.log(blog);
        res.status(200).json({ blog });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "error while updating blogs" });
    }
}));
exports.default = router;

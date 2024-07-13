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
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const multer_middleware_1 = require("../middlewares/multer.middleware");
const zod_1 = require("zod");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const createbloginput = zod_1.z.object({
    title: zod_1.z.string().min(5, { message: "title should be atleast 5 characters" }),
    description: zod_1.z.string().min(5, { message: "description should be atleast 20 characters" }),
});
router.post('/create', auth_middleware_1.default, multer_middleware_1.upload.fields([{ name: "imageurl", maxCount: 1 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const validinputs = createbloginput.safeParse({
            title: title,
            description: description,
        });
        if (!validinputs.success) {
            const msg = validinputs.error.errors.map((err) => err.message);
            return res.status(404).json({ msg });
        }
        // @ts-ignore
        const userid = req.user.userid;
        // @ts-ignore
        const imgurlpath = req.files && req.files.imageurl ? req.files.imageurl[0].path : undefined;
        console.log("imageurlpath", imgurlpath);
        if (!imgurlpath) {
            return res.status(404).json({ msg: "img not uploaded" });
        }
        const img = yield (0, cloudinary_1.default)(imgurlpath);
        if (!img) {
            return res.status(404).json({ msg: "input img required" });
        }
        const blog = yield prisma.blogs.create({
            data: {
                title: title,
                description: description,
                userid: userid,
                imageurl: img.url,
            },
        });
        console.log(blog);
        res.status(200).json({ blog });
    }
    catch (error) {
        console.group(error);
        res.send(error);
    }
}));
router.get('/bulk', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bulk = yield prisma.blogs.findMany({
        orderBy: {
            createAttime: "desc"
        },
        include: {
            user: {
                select: {
                    firstname: true
                }
            }
        }
    });
    // @ts-ignore
    const id = req.user.userid;
    console.log(id);
    return res.status(200).json({ bulk });
}));
router.get('/myblogs', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.get('/uniqueblog', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log("blogobj", blogobject);
    const user = yield prisma.user.findUnique({
        where: {
            id: blogobject === null || blogobject === void 0 ? void 0 : blogobject.userid
        }
    });
    // console.log("user",user)
    const blog = {
        createddata: blogobject === null || blogobject === void 0 ? void 0 : blogobject.createAtdate,
        createdtime: blogobject === null || blogobject === void 0 ? void 0 : blogobject.createAttime,
        username: user === null || user === void 0 ? void 0 : user.firstname,
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

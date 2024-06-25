"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const blog_route_1 = __importDefault(require("./blog.route"));
const router = express_1.default.Router();
router.use('/user', user_route_1.default);
router.use('/blog', blog_route_1.default);
exports.default = router;

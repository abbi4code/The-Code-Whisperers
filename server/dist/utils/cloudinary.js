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
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const cloudinaryUpload = (localfilepath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localfilepath) {
            console.log("error in localfilepath");
            return null;
        }
        const res = yield cloudinary_1.v2.uploader.upload(localfilepath, {
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
        });
        fs_1.default.unlinkSync(localfilepath);
        return res;
    }
    catch (error) {
        fs_1.default.unlinkSync(localfilepath);
        console.log("something went wrong ");
    }
});
exports.default = cloudinaryUpload;

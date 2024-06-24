import express from "express"
import userrouter from "./user.route"

const router = express.Router()


router.use('/',userrouter)



export default router
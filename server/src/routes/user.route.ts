import express from "express"
import { signininput, signupinput } from "../types"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import ApiError from "../utils/apiError"


const router = express.Router()

const prisma = new PrismaClient()
const secretkey = process.env.JWT_SECRET || "abhishek"






router.post('/signup',async(req,res)=>{
    const details = req.body
  try {
      const validuser = signupinput.safeParse({email: details.email,password: details.password, firstname: details.firstname,details:details.lastname})
    if(!validuser.success){
        const msg = validuser.error.errors.map((item)=> item.message)
        return res.json({msg})
    }

    const existuser = await prisma.user.findUnique({
        where:{
            //@ts-ignore
            email: details.email
        }
    })
    if(existuser){

        return res.status(400).json({msg: "user already exist"})
        // throw new ApiError(404,"user already exist")
    }

    const newuser = await prisma.user.create({
        data:{
            email: details.email,
            password: details.password,
            firstname: details.firstname,
            lastname: details.lastname
        }
    })

    console.log(newuser)
    const userid = newuser.id

    const token = jwt.sign({userid},secretkey)
    
    res.status(200).json({msg: "user successfully signup",token})


    
  } catch (error) {
    console.log(error)
    res.json({msg: "error while signup"})
    
  } 







    
})

  router.post("/signin", async(req, res) => {
    const details = req.body;
    try {
      const validuser = signininput.safeParse({
        email: details.email,
        password: details.password,
      });
      if (!validuser.success) {
        const msg = validuser.error.errors.map((item) => item.message);
        return res.json({ msg });
      }

      const existuser = await prisma.user.findUnique({
        where: {
          //@ts-ignore
          email: details.email,
        },
      });
      if (!existuser) {
        return res.status(400).json({ msg: "user not exist" });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: details.email,
          password: details.password,
        },
      });

      console.log(user);
      //@ts-ignore
      const userid = user.id;

      const token = jwt.sign({ userid }, secretkey);

      res.status(200).json({ msg: "user successfully signin", token });
    } catch (error) {
      console.log(error);
      res.json({ msg: "error while signin" });
    } 






  });


export default router
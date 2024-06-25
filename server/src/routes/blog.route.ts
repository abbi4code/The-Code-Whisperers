import express from "express"
import authvalidation from "../middlewares/auth.middleware"
import { blogsinput } from "../types"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()


router.post('/create',authvalidation,async(req,res)=>{
    const inputs = req.body

    try {
        const validinputs = blogsinput.safeParse({
          title: inputs.title,
          description: inputs.description,
          
        });
        if (!validinputs.success) {
          const msg = validinputs.error.errors.map((item) => item.message);
          return res.status(404).json({ msg });
        }
        // @ts-ignore
        const userid : number = req.user.userid

        const blog = await prisma.blogs.create({
            data:{
                title: inputs.title,
                description: inputs.description,
                userid: userid

            }
        })
        console.log(blog)
        res.status(200).json({blog})
        
    } catch (error) {
        console.group(error)
        res.json({error})
        
    }

})

router.get('/bulk', async(req,res)=>{
    const bulk = await prisma.blogs.findMany()

    return res.status(200).json({bulk})
})

router.get('/myblogs',async(req,res)=>{
    //@ts-ignore
    const id = parseInt(req.query.id);
    if(!id){
        res.status(404).json({msg: "blog id not provided"})
    }

    const blogs = await prisma.blogs.findMany({
        where:{
            userid: id
        }
    })
    if(!blogs){
        res.status(404).json({msg: "invalid id"})
    }


    res.json({ blogs });
})

//unique blog

router.get('/uniqueblog',async(req,res)=>{
    const blogid = req.query.blogid
    if(!blogid){
        res.status(404).json({msg: "blog id not provided"})
    }
    const blogobject = await prisma.blogs.findUnique({
      where: {
        //@ts-ignore
        id: blogid
      },
    });
    if (!blogobject) {
      res.status(404).json({ msg: "invalid id" });
    }

    const blog = {
        title: blogobject?.title,
        description: blogobject?.description,
        upvotes: blogobject?.upvotes
        
    }

    res.status(200).json({ blog });


})



export default router
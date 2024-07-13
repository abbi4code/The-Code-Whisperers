import express from "express"
import authvalidation from "../middlewares/auth.middleware"
import { updateblogsinput } from "../types"
import { PrismaClient } from "@prisma/client"
import cloudinaryUpload from "../utils/cloudinary"
import { upload } from "../middlewares/multer.middleware"
import { z } from "zod"



const router = express.Router()
const prisma = new PrismaClient()

const createbloginput  = z.object({
    title: z.string().min(5, { message: "title should be atleast 5 characters" }),
    description: z.string().min(5, { message: "description should be atleast 20 characters" }),
})


router.post('/create',authvalidation,upload.fields([{ name: "imageurl", maxCount: 1 }]),async(req,res)=>{
    const {title,description} = req.body

   

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
      const userid: number = req.user.userid;
      // @ts-ignore
      const imgurlpath = req.files && req.files.imageurl ? req.files.imageurl[0].path : undefined
    
      console.log("imageurlpath",imgurlpath)
      if(!imgurlpath){
     
        return res.status(404).json({msg: "img not uploaded"})
      }

      const img = await cloudinaryUpload(imgurlpath)
      
      if(!img){
        return res.status(404).json({msg: "input img required"})
 
      }



      const blog = await prisma.blogs.create({
        data: {
          title:title,
          description: description,
          userid: userid,
          imageurl: img.url,
        },
      });
      console.log(blog);
      res.status(200).json({ blog });
    } catch (error) {
        console.group(error)
        
        res.send(error)
        
    }

})

router.get('/bulk', authvalidation,async(req,res)=>{
    const bulk = await prisma.blogs.findMany({
      orderBy:{
        createAtdate: "desc"
      },
      include:{
        user: {
          select:{
            firstname: true
          }
        }
    }})
  

    // @ts-ignore
    const id = req.user.userid
    console.log(id)
    

    return res.status(200).json({bulk})
})

router.get('/myblogs',authvalidation,async(req,res)=>{
  //@ts-ignore

    const id:number = parseInt(req.query.id);
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

router.get('/uniqueblog',authvalidation,async(req,res)=>{
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
    console.log("blogobj",blogobject)
    const user = await prisma.user.findUnique({
      where:{
        id: blogobject?.userid
      }
    })
    // console.log("user",user)

    const blog = {
      createddata: blogobject?.createAtdate,
      createdtime: blogobject?.createAttime,
        username: user?.firstname,
        title: blogobject?.title,
        description: blogobject?.description,
        upvotes: blogobject?.upvotes,
        imageurl: blogobject?.imageurl

    }

    res.status(200).json({ blog });


})

router.post('/update',authvalidation,async(req,res)=>{
    const blogid = req.query.blogid;
    if (!blogid) {
      res.status(404).json({ msg: "blog id not provided" });
    }

    const details = req.body

  try {
    //@ts-ignore
    const userid = req.user.userid;
    console.log(userid)

    const validinputs = updateblogsinput.safeParse({
      title: details.title,
      description: details.description,
    });
    if (!validinputs.success) {
      const msg = validinputs.error.errors.map((err) => err.message);
      return res.status(404).json({ msg });
    }

    const datatoupdate: { title?: string; description?: string } = {};
    if (details.title) {
      datatoupdate.title = details.title;
    }
    if (details.description) {
      datatoupdate.description = details.description;
    }

    const blog = await prisma.blogs.update({
      where: {
        //@ts-ignore
        id: blogid,
        userid: userid
      },
      data: datatoupdate,
    });
    if(!blog){
        return res.status(400).json({msg : "blog not found"})
    }

    console.log(blog);
    res.status(200).json({blog})
  } catch (error) {
    console.log(error)
    res.json({msg: "error while updating blogs"})
    
  }

})



export default router
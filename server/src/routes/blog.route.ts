import express from "express"
import authvalidation from "../middlewares/auth.middleware"
import { updateblogsinput } from "../types"
import { PrismaClient } from "@prisma/client"
import cloudinaryUpload from "../utils/cloudinary"
import { upload } from "../middlewares/multer.middleware"



const router = express.Router()
const prisma = new PrismaClient()


router.post('/create',authvalidation,upload.fields([{ name: "imageurl", maxCount: 1 }]),async(req,res)=>{
    const {title,description} = req.body
   

    try {
     

      
      // @ts-ignore
      const userid: number = req.user.userid;
      // @ts-ignore
      const imgurlpath = req.files && req.files.imageurl ? req.files.imageurl[0].path : undefined
    
      console.log("imageurlpath",imgurlpath)
      if(!imgurlpath){
        // throw new ApiError(401, "img not uploaded")
        return res.status(404).json({msg: "img not uploaded"})
      }

      const img = await cloudinaryUpload(imgurlpath)
      
      if(!img){
        return res.status(404).json({msg: "input img required"})
        // throw new ApiError(400,"input img required")
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
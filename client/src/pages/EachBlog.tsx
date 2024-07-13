import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'


import RetroGrid from '../components/effects/retrobg'
import { backendUrl } from '../config'

export default function EachBlog() {
    const [params] = useSearchParams()
    const blogid = params.get("blogid")

    const [blogsinput, setblogsinput] = useState({username: "", description: "", title: "", imageurl:"",createddata:"", createdtime:""})
    let readtime;
//for now 
    const avatar = blogsinput.username.toUpperCase().slice(0,2)
   


    
    

    useEffect(()=>{
      async function uniqueblog(){
        const res = await axios.get(`${backendUrl}/blog/uniqueblog/?blogid=${blogid}`,{
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
       
        setblogsinput(res.data.blog)
      }
      uniqueblog()
     
    },[])
     let date = "";
     let time = "";

     if (blogsinput.createddata) {
       date = blogsinput.createddata.split("T")[0];
     }

     if (blogsinput.createdtime) {
       time = blogsinput.createdtime.split("T")[1].split(".")[0];
       if (Number(time.split(":")[0]) > 12) {
         readtime = Number(time.split(":")[0]) - 12;
       } else {
         readtime = Number(time.split(":")[0]);
       }
       console.log(time);
     }
 console.log(blogsinput);


 function countwords(text: string){
  const avgReadSpeed = 50
  const words = text.split(/\s+/).length
  console.log(words)
  const min = Math.ceil(words/avgReadSpeed)

  return min

 }
 const minToread = countwords(blogsinput.description)
 console.log(minToread)


  return (
    <div className="relative min-h-screen w-full  bg-background bg-black no-scrollbar overflow-y-hidden">
      <RetroGrid />

      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full  ">
        <Navbar />
        <div className="w-full md:max-w-[80rem] h-max  px-5  flex flex-col gap-3 mt-16 md:mt-20   items-center text-[#F1E5D1]  p-3">
          <h1 className="font-bold text-3xl md:text-5xl">{blogsinput.title}</h1>

          <div className="flex items-center gap-4">
            <h2 className="font-bold text-2xl rounded-full px-4 py-4 text-center border border-white">
              {avatar}
            </h2>
            <div className="flex flex-col ">
              <h1 className="font-medium text-lg">{blogsinput.username}</h1>
              <div className="flex gap-1 justify-center items-center">
                <h2 className="font-medium text-lg">{date}</h2>
                <h2 className="font-medium text-sm  border-[1px] border-white rounded-xl border-opacity-40 px-1.5 py-0.5">
                  {minToread} min to read
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-full lg:h-[40rem] w-full flex justify-center  items-start md:items-center">
          <img
            src={blogsinput.imageurl}
            alt="image"
            className=" max-h-full  md:h-full md:w-full object-contain p-6"
          />
        </div>
        <div className="h-max max-w-full font-bold text-xl md:text-3xl text-[#F1E5D1] px-5 flex justify-center items-center">
          <div
            className="w-[20rem] md:w-[55rem] mt-6 mb-6 text-[#F1E5D1] "
            dangerouslySetInnerHTML={{ __html: blogsinput.description }}
          />
        </div>
      </div>
    </div>
  );
}



export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full  absolute top-5 text-slate-200 justify-center">
      <nav className=" w-[25rem] sm:min-w-[40rem] flex justify-evenly text-xl backdrop-blur-sm items-center rounded-xl gap-5 font-bold px-3 py-2 border border-slate-400">
        <h1
          className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </h1>
        <h1
          className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer"
          onClick={() => {
            navigate("/blogs");
          }}
        >
          Allblogs
        </h1>
        <h1
          className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer"
          onClick={() => {
            navigate("/createblog");
          }}
        >
          Create Blog
        </h1>
      </nav>
    </div>
  );
}
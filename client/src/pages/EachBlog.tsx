import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'


import RetroGrid from '../components/effects/retrobg'
import { backendUrl } from '../config'

export default function EachBlog() {
    const [params] = useSearchParams()
    const blogid = params.get("blogid")
    console.log(blogid)
    const [blogsinput, setblogsinput] = useState({username: "", description: "", title: "", imageurl:""})

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
 console.log(blogsinput);


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <div className="relative z-10 flex flex-col justify-center h-full w-full  ">
        {/* this is title section */}
        <div className="w-full h-max  px-5  flex flex-col gap-3 text-[#F1E5D1]  p-3">
          <h1 className="font-bold text-5xl">{blogsinput.title}</h1>

          <div className="flex items-center gap-4">
            <h2 className="font-bold text-2xl rounded-full px-4 py-4 text-center border border-white">
              AR
            </h2>
            <div className="flex flex-col ">
              <h1 className="font-medium text-lg">{blogsinput.username}</h1>
              <div className="flex gap-1">
                <h2 className="font-medium text-lg">DOP</h2>
                <h2 className="font-medium text-lg">MIN to read</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[40rem] w-full ">
          <img
            src={blogsinput.imageurl}
            alt="image"
            className="h-full w-full object-cover p-6"
          />
        </div>
        <div className="h-max w-full font-bold text-3xl text-[#F1E5D1] px-5 flex justify-center items-center">
          <div className="max-w-80rem bg-red-600 text-[#F1E5D1] ">
            {blogsinput.description}
          </div>
        </div>
      </div>
    </div>
  );
}

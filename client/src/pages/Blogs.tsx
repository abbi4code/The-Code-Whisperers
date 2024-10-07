import axios from "axios";
import RetroGrid from "../components/effects/retrobg";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import {Pageloader} from '../components/Pgloader'
import Blogscomponent from '../components/Blogscomponent'
import { useNavigate} from "react-router-dom";



const Blogs =() => {

  const [blogs,setblogs] = useState([])
  const [loader,setloader] = useState(true)

  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setloader(true);
    async function blogs() {
      
      try {
        setTimeout(async() => {
          const res = await axios.get(`${backendUrl}/blog/bulk`,{
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          });
          // console.log(res.data.bulk);
          setblogs(res.data.bulk);
          setloader(false);
          
        }, 100);
        
      } catch (error) {
        console.log(error)
        setloader(false)
        
      }

    }
    blogs()

  },[])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full text-white">
        <Navbar />
        {loader ? (
          <div className="h-full w-[60rem] flex gap-5 flex-col justify-center items-center mt-20">
            <Pageloader />
            <Pageloader />
            <Pageloader />
           
          </div>
        ) : (
          <div className="  h-full w-[60rem] flex flex-col gap-5 justify-center items-center mt-20  ">
            
            {blogs.map((blog: any) => {
              const compdate = blog.createAtdate
              const date = compdate?.split('T')[0]
              console.log()
              return (                     
                <>
                  <Blogscomponent
                    id={blog.id}
                    username={blog.user?.firstname}
                    key={blog.id}
                    title={blog.title}
                    description={blog.description}
                    imgurl={blog.imageurl}
                    date={date}
                  />
                </>
              );
            } )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs


export function Navbar(){
  const navigate = useNavigate();


  return (
    <div className="flex w-full  sticky top-7  text-slate-200 justify-center">
      <nav className=" w-[20rem] sm:min-w-[40rem] flex justify-evenly text-lg backdrop-blur-sm items-center rounded-xl gap-5 font-bold px-3 py-2 border border-slate-400">
        <h1 className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer" onClick={()=>{navigate('/')}}>
          Home
        </h1>
        <h1 className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer" onClick={()=>{
          window.location.href = "https://x.com/Exynos01003024";
        }}>
          Follow me
        </h1>
        <h1 className="hover:text-[#F1E5D1] backdrop-filter cursor-pointer" onClick={()=>{navigate('/createblog')}}>
          Create Blog
        </h1>
      </nav>
    </div>
  );
}







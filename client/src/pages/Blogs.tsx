import axios from "axios";
import RetroGrid from "../components/effects/retrobg";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import {Pageloader} from '../components/Pgloader'
import Blogscomponent from '../components/Blogscomponent'



const Blogs =() => {

  const [blogs,setblogs] = useState([])
  const [loader,setloader] = useState(true)

  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setloader(true);
    async function blogs() {
      
      try {
        setTimeout(async() => {
          const res = await axios.get(`${backendUrl}/blog/bulk`);
          console.log(res.data.bulk);
          setblogs(res.data.bulk);
          setloader(false);
          
        }, 1500);
        
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

      <div className="relative z-10 flex justify-center items-center h-full w-full text-white">
        {loader ? (
          <div className="h-full w-[60rem] flex gap-5 flex-col justify-center items-center mt-20">
            <Pageloader />
            <Pageloader />
            <Pageloader />
           
          </div>
        ) : (
          <div className="  h-full w-[60rem] flex flex-col justify-center items-center mt-20  ">
            
            {blogs.map((blog:any) => {
              const compdate = blog.createAtdate
              const date = compdate?.split('T')[0]
              console.log(compdate,date)
              return (
                
                <>
                  <Blogscomponent
                    id={blog.id}
                    username="abhishek"
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







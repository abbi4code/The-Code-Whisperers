import RetroGrid from "../components/effects/retrobg";
import title from "../assets/logo.png.webp";
import { useNavigate } from "react-router-dom";
// import { Button } from "../components/ui/movborder";
import { backendUrl } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

interface inputprops {
  title: string;
  description: string;
  imageurl: string;
}

export default function CreateBlog() {
  const [input, setinput] = useState<inputprops>({
    title: "",
    description: "",
    imageurl: "",
  });

  console.log(input);


    async function handleimg() {

        const formdata = new FormData()
        formdata.append("title", input.title)
        formdata.append("description", input.description)
        formdata.append("imageurl", input.imageurl)


      const res = await axios.post(
        `${backendUrl}/blog/create`,formdata
       ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
    }


  return (
    <div className="relative h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <div className="relative z-10 flex-col  flex items-center justify-center h-full w-full">
        <Navbar onClick={handleimg} />
        <div className="flex md:shadow-xl mt-20 flex-col w-[20rem] md:w-[55rem] h-full  bg-transparent ">
          <input
            className=" w-full text-sm text-gray-400 bg-transparent rounded-lg cursor-pointer focus:outline-none mb-4"
            type="file"
            onChange={(e: any) =>
              setinput((c) => ({ ...c, imageurl: e.target.files[0] }))
            }
          />
          <textarea
            placeholder="Title"
            className="w-full h-[20%]  text-[#F1E5D1] bg-transparent no-scrollbar outline-none font-bold text-4xl overflow-y-scroll"
            onChange={(e: any) =>
              setinput((c) => ({ ...c, title: e.target.value }))
            }
          />

          <textarea
            placeholder="Description"
            className="w-full  text-[#F1E5D1] bg-transparent outline-none no-scrollbar h-[80%] overflow-y-scroll font-bold text-lg "
            onChange={(e: any) =>
              setinput((c) => ({ ...c, description: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
function Navbar({onClick}:{onClick:any}) {
  const navigate = useNavigate();
  return (
    <div className="w-80 rounded-3xl px-2 py-3 font-bold text-xl border flex justify-around border-white text-white mt-4">
      <img
        src={title}
        className="w-[50px] h-[50px] rounded-full mix-blend-multiply"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-2 justify-center items-center">
        
       <button className="rounded-xl px-3 py-2 font-bold text-lg border border-slate-400 bg-transparent" onClick={onClick}>
        Publish
       </button>
        <div className="rounded-full px-2 py-1 border border-white">A</div>
      </div>
    </div>
  );
}

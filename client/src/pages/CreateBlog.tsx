import RetroGrid from "../components/effects/retrobg";
import title from "../assets/logo.png.webp";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import {useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { debounce } from "lodash";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



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
  const navigate = useNavigate()
  const [loader, setloader] = useState(false);

  const handleTitleChange = debounce((e)=>{
    
      setinput((c) => ({
        ...c,
        title: e.target.value,
      }));
  },500)
  const handleDescChange = debounce((e)=>{
    
      setinput((c) => ({
        ...c,
        description: e.target.value.replace(/\n/g, "<br />"),
      }));
  },500)

  console.log(input);



    async function handleimg() {

        const formdata = new FormData()
        formdata.append("title", input.title)
        formdata.append("description", input.description)
        formdata.append("imageurl", input.imageurl)


      try {
        setloader(true);
        const res = await axios.post(`${backendUrl}/blog/create`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(res);

        if (res.status === 200) {
          console.log("blog created");
          toast.success("Blog created successfully", { position: "top-right", theme:"dark",autoClose:2000 });
          setTimeout(() => {
            setloader(false);
            navigate("/blogs")
          }, 800);
        }
        
      } catch (error) {
        toast.error("Fill all the spaces", { position: "top-right",theme:"dark",autoClose:2000 });
        
      }


    }


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background bg-black">
      <ToastContainer />
      <RetroGrid />

      {loader ? (
        <div className="h-screen relative z-10 justify-center flex w-full items-center">
          <SyncLoader
            color="#ffffff"
            loading={loader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
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
              className="w-full h-[20vh]  text-[#F1E5D1] bg-transparent no-scrollbar outline-none font-bold text-4xl overflow-y-scroll"
              onChange={handleTitleChange
              }
            />

            <textarea
              placeholder="Description"
              className="w-full  text-[#F1E5D1] bg-transparent outline-none no-scrollbar min-h-[80vh] overflow-y-scroll font-bold text-lg "
              onChange={handleDescChange
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
function Navbar({onClick}:{onClick:()=>void}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if(!token){
    navigate("/signin")
  }
  return (
    <div className="w-full l px-2 py-3 font-bold text-xl gap-5 flex justify-around text-white mt-4">
      <div className="w-[30rem] flex justify-between py-3 px-3  items-center gap-5 border border-white rounded-3xl">
        <img
          src={title}
          className="w-[50px] h-[50px] rounded-full mix-blend-multiply"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-2 justify-center items-center">
          <button
            className="rounded-xl px-3 py-2 font-bold text-lg border border-slate-400 bg-transparent"
            onClick={() => navigate("/blogs")}
          >
            All Blogs
          </button>
          <button
            className="rounded-xl px-3 py-2 font-bold text-lg border border-slate-400 bg-transparent"
            onClick={onClick}
          >
            Publish
          </button>
          <div
            className="rounded-full px-1 py-1 border h-[50px] hover:text-4xl transition ease-in-out hover:bg-transparent hover:text-slate-300 text-center w-[50px] flex items-center justify-center cursor-pointer border-white"
            onClick={() => navigate("/")}
          >
            A
          </div>
        </div>
      </div>
    </div>
  );
}



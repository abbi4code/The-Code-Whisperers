import RetroGrid from "../components/effects/retrobg";
import GradualSpacing from "../components/effects/gradualspacing";
import { useNavigate } from "react-router-dom";
import { cn } from "../components/lib/utils";
import Marquee from "../components/effects/marque";

const Home = () => {
 
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <div className="relative z-10 flex flex-col h-full w-full">
      <Navbar />
        <div className="flex items-center gap-14 justify-center mt-20 bg-opacity-20 p-20 md:shadow-xl  flex-col">
          <GradualSpacing
            className="font-display text-center text-[3rem] sm:text-[5rem] lg:text-[7rem] font-bold tracking-tighter text-black dark:text-white  md:leading-[5rem]"
            text="Welcome Coders"
            duration={0.6}
          />

          <div className="flex flex-col gap-2 mt-4 justify-center items-center font-bold text-2xl">
            <p className="text-white text-center">
              <span className="bg-green-600 rounded-lg border  border-black px-1 py-1">
                Share Your Coding
              </span>{" "}
              Journey and Discover New Insights
            </p>
            <p className="text-white text-center text-sm sm:text-lg">
              Join our community of passionate coders. Share your experiences,
              learn from others, and stay updated with the latest trends in
              coding.
            </p>
          </div>
        </div>
        <div className="relative flex h-max min-w-full flex-col items-center p-4 justify-center text-white overflow-hidden rounded-lg bg-background md:shadow-xl">
          <Marquee
            pauseOnHover
            repeat={4}
            className="[--duration:20s] text-2xl h-[10rem]"
          >
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s] h-[10rem]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;


function Navbar(){
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logout = () =>{
    localStorage.clear()
    window.location.reload()
  }

   const navItems = [
     {
       name: "All blogs",
       onClick: () => {
         token ? navigate("/blogs") : navigate("/signin");
       },
       className: "",
     },
     {
       name: "Create Blog",
       onClick: () => {
         token ? navigate("/createblog") : navigate("/signin");
       },
       className: "",
     },
     {
       name: token ? "Signout" : "Signin",
       onClick: () => {
         token ? logout() : navigate("/signin");
       },
       className: " border border-white rounded-xl px-2 py-1 bg-[#0f1115] hover:bg-white hover:text-black hover:border-black",
     },
   ];
  return (
    <div className="bg-black w-full  h-16 flex items-center absolute top-2 justify-center px-10">
      <div className="flex  w-full  xl:min-w-[40rem] bg-[#0f1115] justify-around items-center border  md:gap-4 rounded-xl px-1 sm:px-3 py-2 border-white">
        <h1 className="font-extrabold font-sans text-center mr-3 sm:mr-5 text-[#F6D776] text-md  sm:text-xl md:text-3xl">
          The Code Whisperers
        </h1>
        <div className="flex gap-3 sm:gap-5 justify-center items-center">
          {navItems.map((item) => (
            <h1
              className={`font-bold text-xs xl:text-md sm:text-xl  text-white cursor-pointer ${item.className}`}
              onClick={item.onClick}
            >
              {item.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );

}

const reponses = [
  {
    name: "Chunnu",
    username: "@chunnu",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Abhinav",
    username: "@ginger",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Rohit",
    username: "@shubham",
    body: "From beginner to expert, this blog caters to all. It's an essential bookmark for any programmer.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Masum",
    username: "@usum",
    body: "This blog has transformed my coding journey. The practical tips and real-world experiences are unmatched.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Uday",
    username: "@disha",
    body: "This blog has transformed my coding journey. The practical tips and real-world experiences are unmatched",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Piyush",
    username: "@pnr",
    body: "Absolutely love the community here! The blog posts are not only informative but also engaging and relatable.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reponses.slice(0, reponses.length / 2);
const secondRow = reponses.slice(reponses.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};




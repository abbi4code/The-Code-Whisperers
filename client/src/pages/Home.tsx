import RetroGrid from "../components/effects/retrobg";
import GradualSpacing from "../components/effects/gradualspacing";


import { useNavigate } from "react-router-dom";
import { cn } from "../components/lib/utils";
import Marquee from "../components/effects/marque";



const Home = () => {
 
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <Navbar />
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className="flex items-center gap-14 justify-center mt-20 bg-opacity-20 p-20 md:shadow-xl  flex-col">
          <GradualSpacing
            className="font-display text-center text-[7rem] font-bold tracking-tighter text-black dark:text-white  md:leading-[5rem]"
            text="Welcome Coders"
            duration={0.6}
          />

          <div className="flex flex-col gap-2 mt-4 justify-center items-center font-bold text-2xl">
            <p className="text-white ">
              Share Your Coding Journey and Discover New Insights
            </p>
            <p className="text-white text-center text-lg">
              Join our community of passionate coders. Share your experiences,
              learn from others, and stay updated with the latest trends in
              coding.
            </p>
          </div>
        </div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
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
    <div className="bg-black w-full h-16 flex  items-center absolute top-2 justify-center px-10">
      <div className="flex  min-w-[40rem] bg-[#0f1115] justify-around items-center border gap-4 rounded-xl px-3 py-2 border-white">
        <h1 className="font-extrabold font-sans text-center mr-5 text-[#F6D776] text-3xl">
          The Code Whisperers
        </h1>
        {navItems.map((item) => (
          <h1
            className={`font-bold text-xl  text-white cursor-pointer ${item.className}`}
            onClick={item.onClick}
          >
            {item.name}
          </h1>
        ))}
      </div>
    </div>
  );

}

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
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

// export function Icons() {
//   return (
//     <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
//       <IconCloud iconSlugs={slugs} />
//     </div>
//   );
// }


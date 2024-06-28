import RetroGrid from "../components/effects/retrobg";
import GradualSpacing from "../components/effects/gradualspacing";
import WordRotate from "../components/effects/wordrotate";
import { EvervaultCard, Icon } from "../components/ui/card";



const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];



const words = ["Coders", "Programmer"]
const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background bg-black">
      <RetroGrid />

      <div className="relative z-10 grid grid-cols-3 h-full w-full">
        <div className="flex items-center justify-center  bg-opacity-20 p-20 md:shadow-xl col-span-2 flex-col">
         
            <GradualSpacing
              className="font-display text-center text-4xl font-bold tracking-tighter text-black dark:text-white md:text-7xl md:leading-[5rem]"
              text="Welcome Coders"
              duration={0.6}
            />
            
       
          <p className="text-white">
            Share Your Coding Journey and Discover New Insights
          </p>
          <p className="text-white">
            Join our community of passionate coders. Share your experiences,
            learn from others, and stay updated with the latest trends in
            coding.
          </p>
        </div>
        <div className="flex items-center justify-center bg-black bg-opacity-20 p-20 md:shadow-xl col-span-1">
          <Card text={"#dev"}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
//@ts-ignore
export function Card({text}) {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={text} />

     
    </div>
  );
}

// export function Icons() {
//   return (
//     <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
//       <IconCloud iconSlugs={slugs} />
//     </div>
//   );
// }


//@ts-ignore
import { CardBody, CardContainer, CardItem } from "./ui/blogcard";

interface blogcardprops {
  title: string;
  description: string;
  url: string;
  date: number;
}
//@ts-ignore
export default function BlogCard({
  title,
  description,
  url,
  date,
}: blogcardprops) {
  return (
    <CardContainer className="inter-var min-w-[50rem] ">
      <CardBody className=" min-w-[50rem] border-[.2px] border-white/10 relative group/card grid grid-cols-3 dark:hover:shadow-2xl w-auto sm:w-[30rem] h-auto rounded-xl p-6 backdrop-blur-[2px] ">
        <div className="col-span-2 flex flex-col">
          <CardItem
            as="div"
            translateZ="30"
            className="text-xl font-bold text-white flex gap-4"
          >
            Abhishek Raj
            <CardItem
              as="p"
              translateZ="30"
              className=" text-sm max-w-sm mt-2 text-neutral-300"
            >
              05/04/2019
            </CardItem>
          </CardItem>
          <CardItem
            as="p"
            translateZ="30"
            className=" text-3xl max-w-sm mt-5 font-extrabold text-neutral-300"
          >
            MY fav player
          </CardItem>
          <CardItem
            as="p"
            translateZ="30"
            className=" text-sm max-w-sm mt-2 text-neutral-300"
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
        </div>
        <CardItem translateZ="100" className="w-full col-span-1 mt-4">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-[200px] w-[300px] rounded-lg"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

interface imgprops {
  src: string;
  alt: string;
  className: string;
}
export function Image({ src, alt, className }: imgprops) {
  return <img src={src} alt={alt} className={className} />;
}

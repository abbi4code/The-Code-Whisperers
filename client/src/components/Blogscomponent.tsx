
import { CardBody, CardContainer, CardItem } from "./ui/blogcard";
import { useNavigate } from "react-router-dom";

interface blogcardprops {
  title: string;
  description: string;
  imgurl: string;
  date: number;
  username:string
  key: string,
  id: string
}


export default function BlogCard({
  id,
  title,
  description,
  imgurl,
  date,
  username,
  key
}: blogcardprops) {
  const navigate = useNavigate()

  const handleOnclick = () =>{
    navigate(`/blog?blogid=${id}`)
 
    // redirect("/45")
  }
  console.log(id)

  return (
    <CardContainer className="inter-var " key={key}>
      <CardBody className=" border-[2px] border-white/10 relative group/card flex flex-col gap-4 md:grid md:grid-cols-3 dark:hover:shadow-2xl   md:w-[50rem] lg:w-[70rem] h-auto rounded-xl p-6 backdrop-blur-[2px] ">
        <div
          className="col-span-1 md:col-span-2 flex flex-col cursor-pointer"
          onClick={handleOnclick}
        >
          <CardItem
            as="div"
            translateZ="30"
            className="text-xl font-bold text-white flex gap-4"
          >
            {username}
            <CardItem
              as="p"
              translateZ="30"
              className=" text-sm max-w-sm mt-2 text-neutral-300"
            >
              {date}
            </CardItem>
          </CardItem>
          <CardItem
            as="p"
            translateZ="30"
            className=" text-3xl max-w-sm mt-5 font-extrabold text-neutral-300"
          >
            {title.length > 50 ? (
              <>
                {title.slice(0, 50)}{" "}
                <h1 className="text-sm font-bold">...</h1>
              </>
            ) : (
              title
            )}
          </CardItem>
          <CardItem
            as="p"
            translateZ="30"
            className=" text-sm max-w-sm mt-2 text-neutral-300"
          >
            {description.length > 253 ? (
              <>
                {description.slice(0, 220)}{" "}
                <h1 className="text-sm font-bold">See More</h1>
              </>
            ) : (
              description
            )}
          </CardItem>
        </div>
        <CardItem
          translateZ="100"
          className="w-full md:col-span-1 mt-4 cursor-pointer"
        >
          <Image
            src={imgurl}
            className="h-[200px] w-[300px] rounded-lg object-cover"
            alt="thumbnail"
            onClick={handleOnclick}
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
  onClick:()=>void
}
export function Image({ src, alt, className,onClick }: imgprops) {
  return <img src={src} alt={alt} className={className} onClick={onClick}/>;
}

import ShineBorder from "../components/effects/shineborder";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../components/utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";
interface Signininput {
  email: string;
  password: string;

}
const serverurl = backendUrl


export default function Signin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  }
   const navigate = useNavigate();
const [Signininput, useSignininput] = useState<Signininput>({
  email: "",
  password: ""
})

  
  
  return (
    <div className="relative h-screen w-full bg-black flex justify-center items-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <ShineBorder
        className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome Back
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center dark:text-neutral-300">
          No account?
          <Link to="/signup" className="font-bold ml-2 ">
            <u>Create one</u>
          </Link>
        </p>

        <form className="mt-20" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="name@exy.com"
              type="email"
              onChange={(e) =>
                useSignininput((c) => ({ ...c, email: e.target.value }))
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) =>
                useSignininput((c) => ({ ...c, password: e.target.value }))
              }
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={async () => {
              const res = await axios.post(`${serverurl}/user/signin`, {
                email: Signininput.email,
                password: Signininput.password,
                
              });
              const token = res.data.token;
              if (token) {
                localStorage.setItem("token", token);
                navigate("/");
              } else {
                console.log(res.data.msg);
              }
            }}
          >
            Sign in &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-20 h-[1px] w-full" />
        </form>
      </ShineBorder>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

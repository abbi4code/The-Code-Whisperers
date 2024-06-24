import z from "zod";

export const signupinput = z.object({
  email: z
    .string()
    .min(5, { message: "username of min 5 character" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
  fullname: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .optional(),
});
export const signininput = z.object({
  email: z
    .string()
    .min(5, { message: "username of min 5 character" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export const blogsinput = z.object({
  title: z.string().min(1, { message: "username of min 1 character" }),
  description: z.string().optional(),
  upvotes: z.number(),
});

export const updateblogsinput = z.object({
  title: z
    .string()
    .min(1, { message: "username of min 1 character" })
    .optional(),
  description: z.string().optional(),
  userid: z.number(),
});

export type signininput = z.infer<typeof signininput>;
export type signupinput = z.infer<typeof signupinput>;
export type blogsinput = z.infer<typeof blogsinput>;
export type updateblogsinput = z.infer<typeof updateblogsinput>;

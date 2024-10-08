import z from "zod";


export const signupinput = z.object({
  email: z
    .string()
    .min(5, { message: "Provide valid email" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be 6 or more characters long" }),
 firstname: z
    .string()
    .optional(),
 lastname: z
    .string()
    .optional(),
})
export const signininput = z.object({
  email: z
    .string()
    .min(5, { message: "Provaide Valid email" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "password must be 6 or more characters long" }),
});

export const blogsinput = z.object({
  title: z.string().min(1, { message: "title should be of min 1 character" }),
  description: z.string().optional(),
  upvotes: z.number().optional(),
});



export const updateblogsinput = z.object({
  title: z
    .string()
    .min(1, { message: "title should be of min 1 character" })
    .optional(),
  description: z.string().optional(),
  userid: z.number().optional(),
});

export type signininput = z.infer<typeof signininput>;
export type signupinput = z.infer<typeof signupinput>;
export type blogsinput = z.infer<typeof blogsinput>;
export type updateblogsinput = z.infer<typeof updateblogsinput>;

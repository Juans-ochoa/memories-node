import { z } from "zod";

const postSchema = z.object({
  title: z
    .string({
      required_error: "The title is requiered!",
      invalid_type_error: "The title must be a string",
    })
    .min(6, { message: "Must be 6 characters or more." }),
  message: z
    .string({
      required_error: "The message is requiered!",
      invalid_type_error: "The message must be a string",
    })
    .min(10, { message: "Must be 10 characters or more." }),
  creator: z
    .string({
      required_error: "The creator is requiered!",
      invalid_type_error: "The creator must be a string",
    })
    .min(4, { message: "Must be 4 characters or more." }),
  selectFile: z.string(),
  likeCount: z.number().default(0),
  tags: z.array(
    z.string().min(3, { message: "Must be 3 characters or more." })
  ),
});

export function validatePost(input) {
  return postSchema.safeParse(input);
}

export function validatePartialPost(input) {
  return postSchema.partial().safeParse(input);
}

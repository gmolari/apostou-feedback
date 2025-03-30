import { z } from "zod";

export const userMapper = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
});

export const questionMapper = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
});

export const answerMapper = z.object({
  id: z.number(),
  answer: z.string(),
  created_at: z.date(),
  user: userMapper,
  question: questionMapper,
});

import { z } from "zod";

export const createUserDto = z.object({
  name: z.string().min(1),
  cpf: z.string().min(11).max(14),
  phone: z.string().min(10).max(15),
});

export type CreateUserInput = z.infer<typeof createUserDto>;

import { z } from "zod";

export const createUserDto = z.object({
  name: z.string().min(1),
  cpf: z.string().min(11).max(14),
  phone: z.string().min(10).max(15),
});

export type CreateUserInput = z.infer<typeof createUserDto>;

export const getAllUsersDto = z.object({
  name: z.array(z.string()),
  cpf: z.array(z.string()),
  phone: z.array(z.string()),
});

export type GetAllUsersPayload = z.infer<typeof getAllUsersDto>;

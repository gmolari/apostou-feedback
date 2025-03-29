import { db } from "@/database"; // ajuste o caminho conforme necessário
import { User } from "@/database/schema";
import { CreateUserInput } from "./user.dto";

export async function createUser(data: CreateUserInput) {
  const existing = await db.query.User.findFirst({
    where: (u, { eq }) => eq(u.cpf, data.cpf),
  });

  if (existing) {
    throw new Error("Usuário já existe com este CPF");
  }

  const [inserted] = await db.insert(User).values(data).returning();
  return inserted;
}

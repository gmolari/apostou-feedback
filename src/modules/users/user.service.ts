import { db } from "@/database"; // ajuste o caminho conforme necessário
import { User } from "@/database/schema";
import { CreateUserInput, GetAllUsersPayload } from "./user.dto";
import { and, ilike } from "drizzle-orm";

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

export async function getAllUsers(query: GetAllUsersPayload) {
  const conditions = [];

  // Filtro por cpf (busca parcial)
  if (query.cpf.length > 0) {
    const cpfs = query.cpf;

    for (const cpf of cpfs) {
      conditions.push(ilike(User.cpf, `%${cpf}%`));
    }
  }

  // Filtro por nome (busca parcial)
  if (query.name.length > 0) {
    const names = query.cpf;

    for (const name of names) {
      conditions.push(ilike(User.name, `%${name}%`));
    }
  }

  // Filtro por número de telefone (busca parcial)
  if (query.phone.length > 0) {
    const phones = query.phone;

    for (const phone of phones) {
      conditions.push(ilike(User.phone, `%${phone}%`));
    }
  }

  const users = db.select().from(User);

  if (conditions.length > 0) {
    users.where(and(...conditions));
  }

  return await users;
}

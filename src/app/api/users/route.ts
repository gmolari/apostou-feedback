import { isPostgresError } from "@/lib/utils/is-postgres-error";
import { userMapper } from "@/models/server/mappers";
import { ErrorResponse } from "@/models/server";
import { createUserDto } from "@/modules/users/user.dto";
import { createUser, getAllUsers } from "@/modules/users/user.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createUserDto.parse(body);

    // Se o email estiver vazio, definimos como null
    if (parsed.email === "") {
      parsed.email = null;
    }

    const user = await createUser(parsed);
    const userMapped = userMapper.parse(user);

    return NextResponse.json(userMapped, { status: 200 });
  } catch (error: any) {
    let message: ErrorResponse[] = [{ message: "Erro interno" }];
    let status = 500;

    if (error instanceof ZodError) {
      message = error.errors.map((err) => ({
        message: err.message,
        code: err.code,
        column: [err.path.join(".")],
      }));
      status = 400;
    } else if (isPostgresError(error)) {
      // Removido o bloco que tratava o erro 23505 de conflito de unicidade
    } else message = [error.message];

    return NextResponse.json({ errors: message }, { status });
  }
}

export async function GET(req: Request) {
  try {
    const queryParams = new URL(req.url).searchParams;

    const name = queryParams.getAll("name");
    const email = queryParams.getAll("email");
    const phone = queryParams.getAll("phone");

    const users = await getAllUsers({ name, email, phone });

    const usersMapped = userMapper.array().parse(users);

    return NextResponse.json(usersMapped, { status: 200 });
  } catch (error: any) {
    console.log(error);

    let message: ErrorResponse[] = [{ message: "Erro interno" }];
    let status = 500;

    if (error instanceof ZodError) {
      message = error.errors.map((err) => ({
        message: err.message,
        code: err.code,
        column: [err.path.join(".")],
      }));
      status = 400;
    } else if (isPostgresError(error)) {
      // Removido o bloco que tratava o erro 23505 de conflito de unicidade
    } else message = [error.message];

    return NextResponse.json({ errors: message }, { status });
  }
}

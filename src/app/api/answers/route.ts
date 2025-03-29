// import { isPostgresError } from "@/lib/utils/is-postgres-error";
// import { userMapper } from "@/models/client/user";
// import { ErrorResponse } from "@/models/server";
// import { createUserDto } from "@/modules/users/user.dto";
// import { createUser } from "@/modules/users/user.service";
// import { NextResponse } from "next/server";
// import { ZodError } from "zod";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const parsed = createUserDto.parse(body);

//     const user = await createUser(parsed);

//     const userMapped = userMapper.parse(user);

//     return NextResponse.json(userMapped, { status: 201 });
//   } catch (error: any) {
//     console.log(error);

//     let message: ErrorResponse[] = [{ message: "Erro interno" }];
//     let status = 500;

//     if (error instanceof ZodError) {
//       message = error.errors.map((err) => ({
//         message: err.message,
//         code: err.code,
//         column: [err.path.join(".")],
//       }));
//       status = 400;
//     } else if (isPostgresError(error)) {
//       switch (error.code) {
//         case "23505": {
//           status = 409; // conflict
//           const key = error.constraint_name?.split("_")[1] || "";
//           message = [
//             {
//               message: `${key} was already registered`,
//               code: "23505",
//               column: [key],
//             },
//           ];
//         }
//       }
//     } else message = [error.message];

//     return NextResponse.json({ errors: message }, { status });
//   }
// }

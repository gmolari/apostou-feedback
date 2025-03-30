import { db } from "@/database";
import { Answer, Question, User } from "@/database/schema";
import { ilike, and, eq } from "drizzle-orm";
import { CreateAnswerPayload, GetAllAnswersPayload } from "./answer.dto";

export async function createAnswer(data: CreateAnswerPayload) {
  const [inserted] = await db.insert(Answer).values(data).returning();
  return inserted;
}

export async function getAllAnswers(query: GetAllAnswersPayload) {
  const conditions = [];
  // Filtro por texto (busca parcial)
  if (query.answer.length > 0) {
    const titles = query.answer;

    for (const title of titles) {
      conditions.push(ilike(Answer.answer, `%${title}%`));
    }
  }

  const answers = db
    .select({
      id: Answer.id,
      answer: Answer.answer,
      created_at: Answer.createdAt,
      user: {
        id: User.id,
        name: User.name,
        cpf: User.cpf,
        phone: User.phone,
      },
      question: {
        id: Question.id,
        title: Question.title,
        type: Question.type,
      },
    })
    .from(Answer)
    .innerJoin(User, eq(User.id, Answer.user_id))
    .innerJoin(Question, eq(Question.id, Answer.question_id));

  if (conditions.length > 0) {
    answers.where(and(...conditions));
  }

  return await answers;
}

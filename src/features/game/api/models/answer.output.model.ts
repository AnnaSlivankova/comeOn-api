export class AnswerOutputModel {
  id: string;

  userId: string;
  name: string;
  surname: string;

  questionId: string;
  question: string;
  rightAnswer: string;
  day: number;
  position: number;

  userAnswer: string;

  createdAt: string;
  updatedAt: string;
}

//MAPPER
export const answerOutputModelMapper = (
  dto: any,
): AnswerOutputModel => {
  const a = new AnswerOutputModel();

  a.id = dto._id.toString();

  a.userId = dto.userId._id.toString();
  a.name = dto.userId.name;
  a.surname = dto.userId.surname;

  a.questionId = dto.questionId._id.toString();
  a.question = dto.questionId.question;
  a.rightAnswer = dto.questionId.answer;
  a.day = dto.questionId.day;
  a.position = dto.questionId.position;

  a.userAnswer = dto.answer;

  a.createdAt = dto.createdAt.toISOString();
  a.updatedAt = dto.updatedAt.toISOString();

  return a;
};

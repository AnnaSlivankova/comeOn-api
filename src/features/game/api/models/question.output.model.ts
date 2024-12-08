import { QuestionDocument } from '../../domain/question.entity';

export class QuestionOutputModel {
  id: string;
  question: string;
  day: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}

//MAPPER
export const questionOutputModelMapper = (
  dto: QuestionDocument,
): QuestionOutputModel => {
  const q = new QuestionOutputModel();

  q.id = dto._id.toString();
  q.question = dto.question;
  q.day = dto.day;
  q.position = dto.position;
  q.createdAt = dto.createdAt.toISOString();
  q.updatedAt = dto.updatedAt.toISOString();

  return q;
};

import { UserDocument } from '../../domain/users.entity';

export class UserOutputModel {
  id: string;
  name: string;
  surname: string;
  rating: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}

//MAPPER
export const userOutputModelMapper = (data: UserDocument): UserOutputModel => {
  const outputModel = new UserOutputModel();

  outputModel.id = data._id.toString();
  outputModel.name = data.name;
  outputModel.surname = data.surname;
  outputModel.rating = data.rating;
  outputModel.position = data.position;
  outputModel.createdAt = data.createdAt.toISOString();
  outputModel.updatedAt = data.updatedAt.toISOString();

  return outputModel;
};

import { PlayerDocument } from '../../domain/player.entity';

export class PlayerOutputModel {
  id: string;
  name: string;
  surname: string;
  score: number;
  rating: number;
  time: number;
  createdAt: string;
  updatedAt: string;
}

//MAPPER
export const playerOutputModelMapper = (
  player: PlayerDocument,
): PlayerOutputModel => {
  const outputModel = new PlayerOutputModel();

  outputModel.id = player._id.toString();
  outputModel.name = player.name;
  outputModel.surname = player.surname;
  outputModel.score = player.score;
  outputModel.rating = player.rating;
  outputModel.time = player.time;
  outputModel.createdAt = player.createdAt.toISOString();
  outputModel.updatedAt = player.updatedAt.toISOString();

  return outputModel;
};

import { PlayerDocument } from '../../domain/player.entity';
import { UserDocument } from '../../../users/domain/users.entity';

export class PlayerOutputModel {
  id: string;
  name: string;
  surname: string;
  userId: string;
  prevGamesScore: number;
  totalScore: number;
  gamesCount: number;
  createdAt: string;
  updatedAt: string;
}

//MAPPER
export const playerOutputModelMapper = (
  player: PlayerDocument & { userId: UserDocument },
): PlayerOutputModel => {
  const outputModel = new PlayerOutputModel();

  outputModel.id = player._id.toString();
  outputModel.name = player.userId.name;
  outputModel.surname = player.userId.surname;
  outputModel.userId = player.userId.id;
  outputModel.totalScore = player.totalScore;
  outputModel.gamesCount = player.gamesCount;
  outputModel.prevGamesScore = player.prevGamesScore;
  outputModel.createdAt = player.createdAt.toISOString();
  outputModel.updatedAt = player.updatedAt.toISOString();

  return outputModel;
};

import { Coordinates } from '@src/domain/models/coordinates';
import { CoordinatesDTO } from '../dtos/coordinates.dto';

export const CoordinatesMapper = {
  fromDTOToModel(coordinatesDTO: CoordinatesDTO): Coordinates {
    return {
      latitude: coordinatesDTO.lat,
      longitude: coordinatesDTO.lng,
    };
  },
};

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  ExceptionMessage,
  ExceptionsServiceI,
} from '@src/domain/services/exceptions.service';

@Injectable()
export class ExceptionsService implements ExceptionsServiceI {
  badRequestException(data: ExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: ExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
}

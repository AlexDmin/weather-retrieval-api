export interface ExceptionMessage {
  message: string;
  code_error?: number;
}

export interface ExceptionsServiceI {
  badRequestException(data: ExceptionMessage): void;
  internalServerErrorException(data?: ExceptionMessage): void;
}

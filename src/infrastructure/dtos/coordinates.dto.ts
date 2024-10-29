import { IsNotEmpty, IsNumberString } from "class-validator";

export class CoordinatesDTO {
  @IsNotEmpty()
  @IsNumberString()
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  lng: number;
}

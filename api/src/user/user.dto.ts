import { IsString } from "class-validator";

export class CreateUserDto {
  
    @IsString()
    readonly mail: string;
    
    @IsString()
    readonly nickname: string;

    @IsString()
    readonly password: string;
}
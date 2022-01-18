import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  
    @IsString()
    readonly mail: string;
    
    @IsString()
    readonly nickname: string;

    @IsString()
    readonly password: string;

    @IsBoolean()
    @IsOptional()
    readonly isAdmin: boolean;  
}
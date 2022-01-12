import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCoffeeDto {

    @IsString()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly brand: string;

    @IsInt()
    @IsOptional()
    readonly count: number;
}
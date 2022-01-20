import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCoffeeStockDto {
    @IsInt()
    @IsOptional()
    readonly count: number;

    @IsString()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly memo: string;
}

export class CreateCoffeeDto {

    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly memo: string;

    @ValidateNested({ each: true })
    readonly stocks: CreateCoffeeStockDto[];
}
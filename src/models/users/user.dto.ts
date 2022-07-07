import {IsString, IsInt, IsIn} from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;
    @IsInt()
    fuid: string;
}
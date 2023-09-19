import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: 'password only accepts english and number'
    }) // 영어랑 숫자만 가능
    password: string;
}
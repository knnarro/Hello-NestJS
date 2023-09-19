import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCrendentialDto: AuthCredentialDto): Promise<User>{
        return this.authService.createUser(authCrendentialDto)
    }
}

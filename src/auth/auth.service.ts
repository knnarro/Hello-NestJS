import { genSalt, hash, compare } from 'bcryptjs'
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(authCredentialDto: AuthCredentialDto): Promise<User>{
        const {username, password} = authCredentialDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        const user = this.userRepository.create({username, password: hashedPassword});
        try{
            return await this.userRepository.save(user);
        } catch (error){
            if(error.code === '23505'){
                throw new ConflictException('Existing username')
            }
            else{
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<String> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await compare(password, user.password))){
            return 'login success'
        } else{
            throw new UnauthorizedException('login failed')
        }
    }
}

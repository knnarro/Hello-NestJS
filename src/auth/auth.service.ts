import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
        const user = this.userRepository.create({username, password});
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
}

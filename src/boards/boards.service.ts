import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.enums';
import { randomUUID } from 'crypto';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardsRepository: Repository<Board>
    ) {}

    async getAllBoards():Promise<Board[]> {
        return this.boardsRepository.find()
    }

    async createBoard(createBoardDto: CreateBoardDto):Promise<Board> {
        const { title, content } =createBoardDto;

        const board = this.boardsRepository.create({title, content, status: BoardStatus.PUBLIC});
        await this.boardsRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board>{
        const board = await this.boardsRepository.findOneBy({id});

        if(!board) {
            throw new NotFoundException(`Can'f find Board with id ${id}`);
        }
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardsRepository.delete(id);
        
        if(result.affected === 0) {
            throw new NotFoundException(`Can'f find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardsRepository.save(board);

        return board;
    }
}

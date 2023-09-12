import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { randomUUID } from 'crypto';
import { CreateBoardDto } from './dto/create-board.dto';
import { create } from 'domain';

@Injectable()
export class BoardsService {
    private boards:Board[] = [];

    getAllBoards():Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto):Board {
        const { title, content } =createBoardDto;

        const board: Board = {
            id: randomUUID(),
            title, // title: title과 동일
            content,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }

    getBoardByID(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { randomUUID } from 'crypto';
import { CreateBoardDto } from './dto/create-board.dto';


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
        const board = this.boards.find((board) => board.id === id);
        if (!board){
            throw new NotFoundException(`Can't find Board with ID ${id}`);
        }
        return board;
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardByID(id);
        board.status = status;
        return board;
    }
}

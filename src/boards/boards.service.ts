import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { randomUUID } from 'crypto';

@Injectable()
export class BoardsService {
    private boards:Board[] = [];

    getAllBoards():Board[] {
        return this.boards;
    }

    createBoard(title: string, content: string):Board {
        const board: Board = {
            id: randomUUID(),
            title, // title: title과 동일
            content,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        console.log(this.boards)
        return board;
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoards(): Board[]{
        return this.boardsService.getAllBoards()
    }

    @Post('/board')
    @UsePipes(ValidationPipe)
    creatdBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board{
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardByID(@Param('id') id:string): Board{
        return this.boardsService.getBoardByID(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string): void{
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:string,
        @Body('status') status: BoardStatus
    ):Board {
        return this.boardsService.updateBoardStatus(id, status)
    }
}

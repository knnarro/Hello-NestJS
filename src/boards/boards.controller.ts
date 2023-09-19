import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards.enums';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoards(): Promise<Board[]>{
        return this.boardsService.getAllBoards()
    }

    @Post('/board')
    @UsePipes(ValidationPipe)
    creatdBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board>{
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardByID(@Param('id', ParseIntPipe) id:number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id:number): Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ):Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status)
    }
}

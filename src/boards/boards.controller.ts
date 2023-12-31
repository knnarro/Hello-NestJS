import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards.enums';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getMyBoards(@GetUser() user:User): Promise<Board[]>{
        return this.boardsService.getAllBoardsOfUser(user)
    }

    @Post('/board')
    @UsePipes(ValidationPipe)
    creatdBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board>{
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/:id')
    getBoardByID(@Param('id', ParseIntPipe) id:number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id:number, @GetUser() user:User): Promise<void>{
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
    ):Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status)
    }
}

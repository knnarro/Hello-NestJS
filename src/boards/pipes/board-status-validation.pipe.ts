import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions:string[] = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`)
        }
        return value;
    }

    private isStatusValid(status: string){
        return this.StatusOptions.includes(status);
    }
}
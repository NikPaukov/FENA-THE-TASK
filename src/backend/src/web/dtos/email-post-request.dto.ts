import {IsNumber, Max, Min} from "class-validator";

export class EmailPostRequestDto {
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Min(0)
    @Max(+process.env.REACT_APP_MAX_EMAILS_PER_REQUEST)
    numberOfEmails: number
}
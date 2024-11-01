import { HttpStatus } from "@nestjs/common";

export class GResponse{
    status : HttpStatus = 200;
    data : any;
    message : string;
    error = false;

    constructor(obj : Partial<GResponse>){
        this.status = obj.status;
        this.data = obj.data;
        this.message = obj.message;
        this.error = obj.error;
    }
}
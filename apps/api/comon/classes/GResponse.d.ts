import { HttpStatus } from "@nestjs/common";
export declare class GResponse {
    status: HttpStatus;
    data: any;
    message: string;
    error: boolean;
    constructor(obj?: Partial<GResponse>);
}

import { HttpResponseBase } from "@angular/common/http";

export interface CustomError extends HttpResponseBase{
    error: CustomErrorDetail;
}

export interface CustomErrorDetail{
    code: number;
    data: any;
    detail: ErrorDetails;
    success: boolean
}

export interface ErrorDetails{
    [key: string]: string[]
}
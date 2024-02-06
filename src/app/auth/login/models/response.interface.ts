export interface ResponseData<T>{
    success: boolean;
    detail: string;
    code: number;
    data: T
}

export interface ResponseArray<T>{
    success: boolean;
    detail: string;
    code: number;
    data: Results<T>
}

export interface Results<T>{
    count: number;
    next: string | null;
    previous: string | null;
}
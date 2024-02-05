export interface PostListParams{
    user: number | string | null | any;
    _search: string | any;
}

export interface PageIndexInterface{
    _start: number;
    _limit: number;
    _end?: number;
}

export interface CombinedPostListParams {
    user: number | string | any;
    _search: string | any;
    _start: number;
    _limit: number;
    _end?: number;
}

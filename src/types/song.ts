export interface SongResponseItem {
    id: number;
    url: string;
    br: number;
    size: number;
    md5: string
}
export interface SongResponse {
    data: SongResponseItem[],
    code: number
}

export interface SongParams {
    id: number | string;
}
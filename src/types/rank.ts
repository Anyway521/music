export interface RankResponseItem {
    id: number;
    name: string;
    coverImgUrl: string;
    tag: string;
    description: string;
    userId: number,
    status: number;
    createTime: number,
    updateTime: number,
    subscribedCount: number,
    trackCount: number;
    coverImgId: number;
    playCount: number;
    copywriter: string;
}
export interface RankResponse {
    more: boolean;
    code: number;
    lasttime: number;
    playlists: RankResponseItem[],
    total: number
}

export interface RankParams {
    limit: number;
}
export interface SLParams {
    id: number
}

export interface SLResponse {
    code: number,
    playlist: SLResponseItem,
    privileges: string[],
    fromUserCount: number,
}

export interface SLResponseItem {
    id: number;
    name: string;
    coverImgUrl: string;
    playCount: number;
    subscribedCount: number;
    description: string;
    tags: string[];
    tracks: SongItem[]
}

export interface SongItem {
    id: number;
    name: string;
    //歌手
    ar: Singer[];
    //专辑
    al: AlItem;
    // 接口里没有这个，可以用另一个接口查询再放进来
    url?: string;
    // 用来给播放器做索引
    index?: number;
}

export interface Singer {
    id: number;
    name: string;
}

export interface AlItem {
    id: number;
    name: string;
    picUrl: string;
}
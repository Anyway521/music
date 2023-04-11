import { SongItem } from "./songlist";

//搜索关键词
export interface HotResponseItem {
    first: string,
    second: number,
    third: null,
    iconType: number
}
export interface HotResponse {
    code: number;
    result: {
        hots: HotResponseItem[]
    }
}
//搜索建议
export interface SearchSuggestParams {
    keywords: string
}

export interface SearchInfo {
    id: number;
    name: string;
    picUrl: string;
}

export interface SearchSuggestResponseItem {
    id: number;
    name: string;
    artists: SearchInfo[];
    album: SearchInfo
}

export interface SearchSuggestResponse {
    result: {
        albums: string[]//后面如果写专辑，可以写详细点
        artists: string[]//
        songs: SearchSuggestResponseItem[],
        playlists: string[]//
        order: string[]
    },
    code: number
}

// 根据关键词获取歌曲列表
export interface SearchParams {
    keywords: string;
    limit?: number;
    type?: number;
    // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
}

export interface SearchResponseItem {
    id: number;
    name: string;
    artists: SearchInfo[];
    album: SearchInfo;
    url?: string;
    index?: number;
}

export interface SearchResponse {
    result: {
        songs: SearchResponseItem[];
        hasMore: boolean;
        songCount: number;
    };
    code: number;
}

export interface CloudSearchResponse {
    result: {
        searchQcReminder: null;
        songs: SongItem[];
        songCount: number
    };
    code: number

}
import http from './http';
import {
    ChosenResponseItem,
    ChosenParams,
    SingerParams,
    SingerResponseItem,
    SLParams,
    SLResponseItem,
    SongParams,
    SongResponseItem,
    RankParams,
    RankResponseItem
} from '@/types/index';

// 获取精选歌单
export async function getChosen(params: ChosenParams) {
    return await http.get<{ result: ChosenResponseItem[] }>('personalized', params);
}
// 获取歌手列表
export async function getSinger(params?: SingerParams) {
    return await http.get<{ list: { artists: SingerResponseItem[] } }>('toplist/artist', params ?? params);
}

// 根据歌单id,获取歌曲列表
export async function getSongList(params: SLParams) {
    return await http.get<{ playlist: SLResponseItem; }>('playlist/detail', params);
}

// 根据歌的id获取url
export async function getSongURL(params: SongParams) {
    return await http.get<{ data: SongResponseItem[]; }>('song/url', params);
}

// 获取排行榜
export async function getRankList(params: RankParams) {
    return await http.get<{ playlists: RankResponseItem[]; }>('top/playlist/highquality', params);
}
import http from './http';
import {
    ChosenResponseItem,
    ChosenParams,
    SingerParams,
    SingerResponseItem,
    SLParams,
    SLResponseItem,
    SongParams,
    SongItem,
    SongResponseItem,
    RankParams,
    RankResponseItem,
    HotResponseItem,
    SearchSuggestParams,
    SearchSuggestResponseItem,
    SearchParams,
    SearchResponseItem
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

// 获取排行榜(精品歌单api)
export async function getRankList(params: RankParams) {
    return await http.get<{ playlists: RankResponseItem[]; }>('top/playlist/highquality', params);
}

// 获取网友精选
export async function getOnlineChosen(params: RankParams) {
    return await http.get<{ playlists: RankResponseItem[]; }>('top/playlist', params);
}

// 获取热搜关键词
export async function getHotKeyWords() {
    return await http.get<{
        result: {
            hots: HotResponseItem[]
        }
    }>('search/hot');
}

// 根据输入关键词获取搜索建议
export async function getSuggestion(params: SearchSuggestParams){
    return await http.get<{
        result: {
            songs: SearchSuggestResponseItem[]
        }
    }>('search/suggest', params)
}

// 根据关键词搜索歌曲列表
export async function getSongListWithKeywords(params: SearchParams){
    return await http.get<{
        result: {
            songs: SearchResponseItem[]
        }
    }>('search', params)
}

// 根据关键词搜索歌曲列表 - 云
export async function getCloudSongListWithKeywords(params: SearchParams){
    return await http.get<{
        result: {
            songs: SongItem[]
        }
    }>('cloudsearch', params)
}
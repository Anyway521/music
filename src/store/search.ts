import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getHotKeyWords, getSuggestion,getCloudSongListWithKeywords,getSongURL } from '@/utils/api';
import {
    HotResponseItem,
    SearchSuggestResponseItem,
    SearchSuggestParams,
    SearchParams
} from '@/types/search';
import { SongItem } from '@/types/songlist';
export const useSearchStore = defineStore('search', () => {
    const keyWordsList = ref([] as HotResponseItem[]);
    const suggestKeyWordsList = ref([] as SearchSuggestResponseItem[]);
    const songList = ref([] as SongItem[]);

    const getHotKeyWordsList = async () => {
        const { result } = await getHotKeyWords();
        keyWordsList.value = result.hots ?? [];
    }

    const getSuggestionList = async (parmas: SearchSuggestParams) => {
        const { result } = await getSuggestion(parmas);
        suggestKeyWordsList.value = result.songs || [];
    }

    const getSongListByKeywords = async (params: SearchParams) => {
        let list = [] as SongItem[];
        await getCloudSongListWithKeywords(params)
        .then(({result}) => {
            list = result.songs || []
        }).catch(err => {
            window.console.error('获取歌单出错', err)
        })
        if(list.length) {
            let IDstr = list.map(el => el.id).join(',');
            await getSongURL({ id: IDstr })
                .then(({ data }) => {
                    list.forEach((music, index)=> {
                        //本身通过getSongList获取的歌曲信息列表中，单个信息不带有url,这里直接用请求歌曲url的接口，再加到playlist里
                        music.url = data.find(el => el.id === music.id)?.url || '';
                        music.index = index;
                    })
                }).catch(err => {
                    window.console.error('获取歌曲url出错', err)
                })
        }

        songList.value = list || [];
    }

    return {
        songList,
        keyWordsList,
        suggestKeyWordsList,
        getHotKeyWordsList,
        getSuggestionList,
        getSongListByKeywords
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
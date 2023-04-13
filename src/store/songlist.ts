//歌单处理，songlist.ts指的是歌单，const songlist指的是具体的歌曲列表
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';
import { getSongList, getSongURL } from '@/utils/api';
import { SLResponseItem, SLParams, Singer } from '@/types/songlist';
export const useSongListStore = defineStore('songlist', () => {
    // info指的是歌单详情
    const info = ref({} as SLResponseItem);

    // songList是info里面的tracks,当前歌单所有的音乐信息。
    const songList = computed(() => {
        return info.value.tracks || [];
    })

    const getList = async (limit: SLParams) => {
        let list = {} as SLResponseItem;
        await getSongList(limit)
            .then(({ playlist }) => {
                list = playlist || {};
            }).catch(err => {
                window.console.error('获取歌单出错', err)
            })
        const tracks = list.tracks || [];
        if (tracks.length) {
            let IDstr = tracks.map(el => el.id).join(',');
            await getSongURL({ id: IDstr })
                .then(({ data }) => {
                    tracks.forEach((music, index)=> {
                        //本身通过getSongList获取的歌曲信息列表中，单个信息不带有url,这里直接用请求歌曲url的接口，再加到playlist里
                        music.url = data.find(el => el.id === music.id)?.url || '';
                        music.index = index;
                    })
                }).catch(err => {
                    window.console.error('获取歌曲url出错', err)
                })
        }
        info.value = list ?? {};
    }

    return {
        info,
        getList,
        songList,
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSongListStore, import.meta.hot))
}
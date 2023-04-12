import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getSongURL } from '@/utils/api';
import { SongParams, SongResponseItem } from '@/types/song';
import { SongItem } from '@/types/songlist';
import img from '@/assets/img/logo.png';
export const useSongStore = defineStore('song', () => {
    const song = ref<NullAble<SongResponseItem>>(null);
    const info = ref<SongItem>({
        id: 0,
        name: '',
        ar: [],
        al: {
            id: 0,
            name: '',
            picUrl: img
        },
        index: 0
    });
    const audio = new Audio();
    const isPaused = ref(false);

    const getSingleMusic = async (params: SongParams) => {
        const { data } = await getSongURL(params);
        return data.length ? data[0] : null;
    }

    const play = async (params: SongParams) => {
        // audio.ended
        song.value = await getSingleMusic(params);
        if (song.value) {
            audio.src = song.value.url;
            // 暂时只做单曲循环
            // audio.loop = true;
            audio.play().then(() => {
                isPaused.value = true
            })
        }
    }

    const setInfo = (ins: SongItem) => {
        info.value = ins
    }

    const switchState = () => {
        isPaused.value = !isPaused.value;
        if (isPaused.value) {
            audio.play();
        } else {
            audio.pause();
        }
    }


    return {
        audio,
        song,
        info,
        play,
        switchState,
        isPaused,
        setInfo,
        getSingleMusic
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSongStore, import.meta.hot))
}
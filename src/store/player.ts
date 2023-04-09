import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import debounce from 'lodash/debounce';
import { SongItem } from '@/types';
export const usePlayerStore = defineStore('player', () => {
    const audio = new Audio();
    const isPaused = ref(false);
    const currIndex = ref(0);
    const playModel = ref(true);//播放模式，先只做单曲（false）和列表(true)循环。默认列表
    const currMusic = ref<SongItem>({
        id: 0,
        name: '',
        ar: [],
        al: {
            id: 0,
            name: '',
            picUrl: 'public/logo.png'
        },
        index: 0
    })
    //在列表点击的时候给currMusic赋值。currMusicStack = songList.value。
    //在点击播放器的时候，只更改index的值。
    const currMusicStack = ref([] as SongItem[]);

    const play = debounce(() => {
        if(!currMusic.value.url) {
            window.console.error('歌曲url不存在')
            return;
        }
        // audio.ended
        audio.src = currMusic.value.url;
        // 暂时只做单曲循环
        // audio.loop = true;
        audio.play().then(() => {
            isPaused.value = false
        })
    })

    const switchState = () => {
        isPaused.value = !isPaused.value;
        if (!isPaused.value) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    const switchModel = () => {
        playModel.value = !playModel.value;
    }

    const setCurrent = (value: number | undefined) => {
        currIndex.value = value || 0;
    }

    const setIsPaused = (value: boolean) => {
        isPaused.value = value
    }

    const setCurrMusic = (song: SongItem) => {
        currMusic.value = song;
    }

    const setCurrMusicStack = (songlist: SongItem[]) => {
        currMusicStack.value = songlist
    }

    const playerPrev = () => {
        if (!currIndex.value) {
            currIndex.value = currMusicStack.value.length - 1;
            // window.console.log('已经第一个啦')
            return;
        }
        currIndex.value--
    }

    const playerNext = () => {
        if (currIndex.value === currMusicStack.value.length - 1) {
            // window.console.log('已经到底啦')
            currIndex.value = 0;
            return;
        }
        currIndex.value++
    }

    const addTimeListener = (cb: EmptyFunction) => {
        audio.addEventListener('timeupdate', cb)
    }

    const addVolumeListener = (cb: EmptyFunction) => {
        audio.addEventListener('volunmechange', cb)
    }

    const removeVolumeListener = (cb: EmptyFunction) => {
        audio.removeEventListener('volunmechange', cb)
    }

    const removeTimeListener = (cb: EmptyFunction) => {
        audio.removeEventListener('timeupdate', cb)
    }

    const addEndedListener = (cb: EmptyFunction) => {
        audio.addEventListener('ended', cb)
    }

    const removeEndedListener = (cb: EmptyFunction) => {
        audio.removeEventListener('ended', cb)
    }

    return {
        audio,
        play,
        switchState,
        playModel,
        switchModel,
        isPaused,
        setIsPaused,
        setCurrMusic,
        setCurrMusicStack,
        currMusic,
        currIndex,
        currMusicStack,
        setCurrent,
        playerPrev,
        playerNext,
        addTimeListener,
        removeTimeListener,
        addVolumeListener,
        removeVolumeListener,
        addEndedListener,
        removeEndedListener
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
}
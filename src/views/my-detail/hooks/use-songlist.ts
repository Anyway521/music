import { SongItem } from "@/types/songlist";

export function useSonglist() {
    const showPlayBtn = (target: NullAble<EventTarget>) => {
        const dom = target as HTMLElement;
        dom.classList.add('active')
    }
    
    const hidePlayBtn = (target: NullAble<EventTarget>) => {
        const dom = target as HTMLElement;
        dom.classList.remove('active')
    }
    const downloadMusic = async (song: SongItem) => {
        if (song.url) {
            window.location.href = song.url
        } else {
            alert('无法下载')
        }
    }
    return {
        showPlayBtn,
        hidePlayBtn,
        downloadMusic
    }
}
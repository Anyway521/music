import { ChosenResponseItem } from '@/types/chosen';
export function useChosenItem() {
    //暂时不能这么写
    const DEFAULT_SONG_LIST: ChosenResponseItem = {
        id: 0,
        type: 0,
        name: '',
        copywriter: '',
        picUrl: '',
        canDislike: true,
        trackNumberUpdateTime: 0,
        playCount: 0,
        trackCount: 0,
        highQuality: true,
        alg: ''
    };
    return {
        DEFAULT_SONG_LIST
    }
}

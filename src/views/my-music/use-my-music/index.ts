interface MusicItem {
    label: string;
    name: string;
}

export function useMusicList() {
    const MUSIC_LIST: MusicItem[] = [
        {
            label: '精选',
            name: 'chosen'
        },
        {
            label: '排行',
            name: 'ranking'
        },
        {
            label: '歌手',
            name: 'singer'
        }
    ];
    return {
        MUSIC_LIST
    }
}
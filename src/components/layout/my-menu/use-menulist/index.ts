
interface MenuItem {
    title: string;
    url: string;
    icon?: any;
}

interface Menu {
    title: string;
    key: string;
    items: MenuItem[]
}

export function useMenuList() {
    const MENUS: Menu[] = [
        {
            title: '在线音乐',
            key: 'online',
            items: [
                {
                    title: '音乐馆',
                    url: '/music',
                    icon: 'icon-yinle'
                },
                {
                    title: '视频',
                    url: '/video',
                    icon: 'icon-shipin'
                },
                {
                    title: '雷达',
                    url: '/radar',
                    icon: 'icon-leidatance'
                }
            ]
        },{
            title: '我的音乐',
            key: 'my-music',
            items: [
                {
                    title: '本地和下载',
                    url: '/download',
                    icon: 'icon-tv-full'
                },
                {
                    title: '最近播放',
                    url: '/recent',
                    icon: 'icon-bingtutongji'
                },
                {
                    title: '试听列表',
                    url: '/list',
                    icon: 'icon-24gf-playlistMusic4'
                },
           ]
        }
    ];

    return {
        MENUS
    }
}
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/music'
    },
    {
        path: '/music',
        name: 'music',
        redirect: '/music/chosen',
        component: () => import('@/views/my-music/index.vue'),
        children: [
            {
                path: 'chosen',
                name: 'chosen',
                component: () => import('@/views/my-music/chosen/index.vue')
            },
            {
                path: 'ranking',
                name: 'ranking',
                component: () => import('@/views/my-music/ranking/index.vue')
            },
            {
                path: 'singer',
                name: 'singer',
                component: () => import('@/views/my-music/singer/index.vue')
            },
        ]
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('@/views/my-video/index.vue')
    },
    {
        path: '/radar',
        name: 'radar',
        component: () => import('@/views/my-radar/index.vue')
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('@/views/my-download/index.vue')
    },
    {
        path: '/recent',
        name: 'recent',
        component: () => import('@/views/my-recent/index.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('@/views/my-list/index.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/my-detail/songlist-detail/index.vue')
    },
    {
        path: '/song-detail/:keywords',
        name: 'song-detail',
        component: () => import('@/views/my-detail/song-detail/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
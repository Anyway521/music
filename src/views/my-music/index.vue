<script lang="ts" setup>
// 音乐馆
// import { ref, watch } from 'vue';
import { useMusicList } from './use-my-music';
// import type { TabPaneName, TabsPaneContext } from 'element-plus';
// import Chosen from './chosen/index.vue';
// import Ranking from './ranking/index.vue';
// import Singer from './singer/index.vue';
import { useMainStore } from '@/store/main';
import { useRouter, useRoute } from 'vue-router';
const main = useMainStore();
const router = useRouter();
const route = useRoute();
const { MUSIC_LIST } = useMusicList();
// const activeName = ref(MUSIC_LIST[0].name);
// const comp: { [key: string]: any } = {
//     chosen: Chosen,
//     ranking: Ranking,
//     singer: Singer
// }
</script>
<template>
    <div :class="['music', { 'dark': main.theme }]">
        <h1 class="title">音乐馆</h1>
        <el-menu mode="horizontal" :default-active="route.path" router>
            <el-menu-item v-for="item in MUSIC_LIST" :key="item.name" :index="`/music/${item.name}`"
                @click="router.push(item.name)">
                {{ item.label }}
            </el-menu-item>
        </el-menu>

        <router-view />

        <!-- <el-tabs v-model="activeName" class="music-tabs">
                    <el-tab-pane v-for="item in MUSIC_LIST" :key="item.name"
                                 :label="item.label" :name="item.name">
                        <keep-alive>
                            <component :is="comp[item.name]"/>
                        </keep-alive>
                    </el-tab-pane>
                </el-tabs> -->
    </div>
</template>
<style lang="scss" scoped>
.music {
    .title {
        margin-top: 0;
    }

    &-tabs {
        :deep(.el-tabs__nav-wrap::after) {
            display: none;
        }

        :deep(.el-tabs__active-bar) {
            background-color: #1ed0a2;
        }

        :deep(.el-tabs__item.is-active) {
            color: #1ed0a2;
        }

        :deep(.el-tabs__item:hover) {
            color: #1ed0a2;
        }
    }

    &.dark {
        :deep(.el-tabs__item) {
            color: wheat;
        }

        :deep(.el-menu--horizontal>.el-menu-item) {
            color: wheat;
        }
    }
}

:deep(.el-menu) {
    background-color: transparent;
    transition: all .3s;
}

:deep(.el-menu--horizontal) {
    border: none;
}

:deep(.el-menu--horizontal>.el-menu-item.is-active) {
    padding: 0;
    margin: 0 20px;
}

:deep(.el-menu--horizontal>.el-menu-item) {
    padding: 0;
    margin: 0 20px;
}
</style>

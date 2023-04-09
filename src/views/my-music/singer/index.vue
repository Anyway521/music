<script lang="ts" setup>
// 歌手
import { useSingerStore } from '@/store/singer';
import { onMounted, ref, watch } from 'vue';
import SingerItem from './singer-item.vue';
const singerStore = useSingerStore();
/*1: 华语
2: 欧美
3: 韩国
4: 日本 */
const enum AREA_TYPE {
    ALL,//0的时候不发参数
    CN,
    EA,
    SK,
    JP
}

const AREA_MAP = {
    [AREA_TYPE.ALL]: '全部',
    [AREA_TYPE.CN]: '华语',
    [AREA_TYPE.EA]: '欧美',
    [AREA_TYPE.SK]: '韩国',
    [AREA_TYPE.JP]: '日本'
}

const singerType = ref(AREA_TYPE.ALL)

onMounted(async () => {
    await singerStore.getList();
})

watch(singerType, (value) => {
    singerStore.getList({ type: value })
})
</script>
<template>
    <div class="singer">
        <div class="singer-radio">
            <el-radio-group v-model="singerType" fill="#1ed0a2">
                <el-radio-button v-for="(item, index) in Object.values(AREA_MAP)" :label="index">
                    {{ item }}
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="singer-main">
            <template v-for="(item, index) in singerStore.list" :key="item.id">
                <singer-item v-if="index < 10" :singer="item" :has-img="true" />
            </template>
        </div>
        <div class="singer-name">
            <template v-for="(item, index) in singerStore.list" :key="item.id">
                <singer-item v-if="index >= 10" :singer="item" :has-img="false" />
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.singer {
    &-radio {
        margin: 20px 10px;
    }

    &-main {
        display: flex;
        flex-wrap: wrap;
    }

    &-name {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>

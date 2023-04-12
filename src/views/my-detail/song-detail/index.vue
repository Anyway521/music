<script lang="ts" setup>
//歌曲搜索详情
import { useSearchStore } from '@/store/search';
import { computed } from '@vue/reactivity';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Songlist from './songlist.vue';
import { useMainStore } from '@/store/main';

const main = useMainStore();
const searchStore = useSearchStore();
const route = useRoute();
const keywords = computed(() => {
    return route.params.keywords as string;
})

onMounted(() => {
    if (!keywords.value) {
        return;
    }
    searchStore.getSongListByKeywords({ keywords: keywords.value })
})

watch(keywords, (value) => {
    if (!value) {
        return;
    }
    searchStore.getSongListByKeywords({ keywords: keywords.value })
})

</script>
<template>
    <div :class="['song-detail', { dark: main.theme }]">
        <div class="song-detail__result">
            搜索 <span>{{ route.params.keywords || '' }}</span>
        </div>
        <div>
            <songlist />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.song-detail {
    &__result {
        height: 50px;
        line-height: 50px;
        text-indent: 1em;
        background-color: #f0f0f0;
        margin: 10px 0;
        border-radius: 5px;
        color: #57555f;

        span {
            font-weight: bold;
        }
    }

    &.dark {
        .song-detail__result {
            background-color: wheat;
        }
    }
}
</style>
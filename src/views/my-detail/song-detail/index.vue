<script lang="ts" setup>
//歌曲搜索详情
import { useSearchStore } from '@/store/search';
import { computed } from '@vue/reactivity';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { usePlayerStore } from '@/store/player';
// import { storeToRefs } from 'pinia';
import Songlist from './songlist.vue';
// import Songlist from '../comp/list.vue';
import { SongItem } from '@/types/songlist';

// const player = usePlayerStore();
// const { currMusic, currMusicStack, currIndex } = storeToRefs(player);
const searchStore = useSearchStore();
const route = useRoute();
const keywords = computed(() => {
    return route.params.keywords as string;
})

// const playMusic = (song: SongItem) => {
//     currMusicStack.value = searchStore.songList;
//     currMusic.value = song;
//     currIndex.value = song.index || 0;
//     player.play();
// }

// const setRowClass = ({ row }: { row: SongItem }) => {
//     if (row.id === currMusic.value.id) {
//         return 'music-active'
//     } return ''
// }


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
    <div class="song-detail">
        <div class="song-detail__result">
            搜索 <span>{{ route.params.keywords || '' }}</span>
        </div>
        <div>
            <!-- <songlist :music-list="currMusicStack" 
                      :set-row-class="setRowClass"
                      :play-music="playMusic"/> -->
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
        color: #57555f;

        span {
            font-weight: bold;
        }
    }
}
</style>
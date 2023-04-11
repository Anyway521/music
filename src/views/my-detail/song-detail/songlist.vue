<script lang="ts" setup>
import { SongItem } from '@/types/songlist';
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/main';
import { useSonglist } from '../comp/use-songlist';
import { useSearchStore } from '@/store/search';
import { useFormat } from '@/utils/format';
const { theme } = storeToRefs(useMainStore());

const searchStore = useSearchStore();
const player = usePlayerStore();
const format = useFormat();
const { currMusic, currMusicStack, currIndex } = storeToRefs(player);
//在这里更新songList,
const playMusic = (song: SongItem) => {
    currMusicStack.value = searchStore.songList;
    currMusic.value = song;
    currIndex.value = song.index || 0;
    player.play();
}
const { showPlayBtn, hidePlayBtn, downloadMusic } = useSonglist();

const setRowClass = ({ row }: { row: SongItem }) => {
    if (row.id === currMusic.value.id) {
        return 'music-active'
    } return ''
}

</script>
<template>
    <div :class="['song', { 'dark': theme }]">
        <template v-if="searchStore.songList.length">
            <el-table :data="searchStore.songList" class-name="song-table" :border="false" :row-class-name="setRowClass"
                @cell-mouse-enter="(row, column, cell, event) => showPlayBtn(event.target)"
                @cell-mouse-leave="(row, column, cell, event) => hidePlayBtn(event.target)">
                <el-table-column prop="name" label="歌曲" />
                <el-table-column prop="ar" label="歌手">
                    <template #default="scope">
                        {{ format.getRealName(scope.row.ar)  }}
                    </template>
                </el-table-column>
                <el-table-column prop="al.name" label="专辑" />
                <el-table-column prop="id" label="" width="1" class-name="control">
                    <template #default="scope">
                        <i class="iconfont icon-bofang" @click="playMusic(scope.row)"></i>
                        <i class="iconfont icon-xiazai" @click="downloadMusic(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div v-else>
            暂时没有歌曲
        </div>
    </div>
</template>
<style lang="scss" scoped>
.song {
    &-table {
        width: 100%;
        background-color: transparent;
    }

    :deep(.el-table__row) {
        height: 48px;

        &.music-active {
            color: #1ed0a2;
            background-color: #ececec;
        }

        &:hover {
            background-color: #ececec;
        }
    }

    &.dark {
        :deep(.el-table__row) {
            &:hover {
                background-color: #5e5656;
            }

            &.music-active {
                color: #1ed0a2;
                background-color: #4e4b52;
            }
        }
    }
}

:deep(.el-table) {
    color: unset;

    thead {
        color: unset;
    }

    tr {
        cursor: pointer;
        position: relative;
    }
}

:deep(.control.el-table__cell) {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    border: none;

    i {
        font-size: 22px;
        opacity: .6;
        position: relative;
        top: 4px;

        &:first-of-type {
            margin-left: 380px;
        }

        margin-left: 10px;

        &:hover {
            color: #1ed0a2;
        }
    }

    &:hover {
        background-color: transparent;

    }

    &.active {
        opacity: 1;
    }
}

:deep(.el-table__body td.el-table__cell) {
    border: none;
}
</style>
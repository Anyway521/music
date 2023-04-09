<script lang="ts" setup>
//播放器
import { storeToRefs } from 'pinia';
import { onMounted, getCurrentInstance, onUnmounted, ref, watch, nextTick, computed } from 'vue';
import { formatDuration } from '@/utils/time';
import Detail from '@/components/layout/detail.vue';
import { usePlayerStore } from '@/store/player';
const playerStore = usePlayerStore();
const { currIndex, currMusic, currMusicStack, playModel } = storeToRefs(playerStore);

const instance = getCurrentInstance();
const volume = ref(playerStore.audio.volume * 100);
const showVolume = ref(false);
const detail = ref<NullAble<typeof Detail>>(null);
const showV = () => {
    showVolume.value = true
}
const hiddenV = () => {
    showVolume.value = false
}

watch(currIndex, (value) => {
    playerStore.setCurrMusic(currMusicStack.value[value])
})

watch(currMusic, () => {
    playerStore.play()
})

const setVolume = () => {
    volume.value = playerStore.audio.volume * 100
}
const updateDom = () => {
    instance?.proxy?.$forceUpdate()
}

const endedMusic = () => {
    playerStore.setIsPaused(true);
    switch(playModel.value) {
        case true : {
            playerStore.playerNext();
            break;
        }
        case false : {
            playerStore.play();
            break;
        }
    }
}

onMounted(() => {
    playerStore.addEndedListener(endedMusic)
    playerStore.addTimeListener(updateDom);
    playerStore.addVolumeListener(setVolume);
})

onUnmounted(() => {
    playerStore.removeEndedListener(endedMusic)
    playerStore.removeTimeListener(updateDom);
    playerStore.removeVolumeListener(setVolume);
})



watch(volume, (value: number) => {
    playerStore.audio.volume = value / 100
})

const switchModal = () => {
    nextTick(() => {
        detail?.value?.switchShow()
    })
}

</script>
<template>
    <el-progress :stroke-width="2" :percentage="playerStore.audio.currentTime * 100 / playerStore.audio.duration || 0"
        :show-text="false" color="#1ed0a2" />
    <div class="player">
        <div class="player-left">
            <img :src="currMusic.al.picUrl" alt="" @click="switchModal" class="ava">
            <teleport to="body">
                <detail :bg="currMusic.al.picUrl" ref="detail" />
            </teleport>
            <div class="info">
                <div>{{ currMusic.ar[0]?.name || 'QQ音乐' }} - {{ currMusic?.name || '听我想听的歌' }}</div>
            </div>
        </div>
        <div class="player-control">
            <i :class="['iconfont', 'mini', playModel ? 'icon-liebiaoxunhuan' : 'icon-danquxunhuan']"
               :title="playModel ? '列表循环': '单曲循环'"
                @click="playerStore.switchModel"></i>
            <i class="iconfont icon-shangyishou mid" @click="playerStore.playerPrev"></i> 
            <i :class="['iconfont', 'play', playerStore.isPaused ? 'icon-bofang1' : 'icon-zanting']"
                @click="playerStore.switchState"></i>
            <i class="iconfont icon-xiayishou mid" @click="playerStore.playerNext"></i>
            <div class="volume" @mouseover="showV" @mouseout="hiddenV">
                <i class="iconfont icon-yinliang mini"></i>
                <input type="range" v-model="volume" v-show="showVolume" class="btn-v">
            </div>

        </div>

        <div class="player-tool">
            <span class="time">
                {{ formatDuration(playerStore.audio.currentTime) }} / {{ formatDuration(playerStore.audio.duration) }}
            </span>
            <span class="lyr">词</span>
            <i class="iconfont icon-24gf-playlistMusic4"></i>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 76px;
    padding: 0 20px;

    &-left {
        display: flex;
        flex: 4;
        align-items: center;

        .ava {
            width: 50px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                opacity: .6;
            }
        }


        .info {
            font-size: 12px;
            padding: 0 12px;
        }
    }

    &-control {
        display: flex;
        flex: 1;
        align-items: center;

        i {
            cursor: pointer;
            padding: 0 4px;

            &:hover {
                color: #1ed0a2;
            }

            &.mid {
                font-size: 28px;
            }

            &.mini {
                font-size: 20px;
            }
        }

        .play {
            font-size: 36px;
            color: #1ed0a2;
        }

        .volume {
            // position: relative;
            width: 175px;

            .btn-v {
                position: relative;
                cursor: pointer;
                height: 4px;
                top: -5px;
            }

        }
    }

    &-tool {
        display: flex;
        flex: 3;
        align-items: center;
        justify-content: end;

        .time {
            font-size: 14px;
        }

        span,
        i {
            margin-left: 8px;

            &:hover {
                cursor: pointer;
                color: #1ed0a2;
            }
        }

        i:last-of-type {
            margin-right: 30px;
        }

        .lyr:hover {
            cursor: pointer;
            color: #1ed0a2;
        }
    }

}
</style>
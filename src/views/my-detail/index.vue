<script lang="ts" setup>
//歌单详情
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useSongListStore } from '@/store/songlist';
// import { useBase64 } from '@/utils/base64';
import SongList from './song-list.vue';
// const { decodeBase64 } = useBase64();
const route = useRoute();
// const info = decodeBase64(route.params.info as string);
const songlistStore = useSongListStore();
onMounted(() => {
    songlistStore.getList({ id: Number(route.params.id) || 0 })
})
</script>
<template>
    <div class="detail">
        <div class="detail-top">
            <img :src="songlistStore.info.coverImgUrl" alt="">
            <div class="detail-top__right">
                <h1>
                    {{ songlistStore.info.name }}
                </h1>
                <div v-if="songlistStore.info.tags?.length" class="tags">
                    标签：
                    <span v-for="item in songlistStore.info.tags"
                          >
                        #{{ item }}</span>
                </div>
                <div class="desc">{{ songlistStore.info.description }}</div>
                <div class="btn">
                    <div>
                        <i class="iconfont icon-bofangjilu"></i>
                        播放：{{ songlistStore.info.playCount }}
                    </div>
                    <div>
                        <i class="iconfont icon-shoucang"></i>
                        收藏：{{ songlistStore.info.subscribedCount }}
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-main">
            <song-list />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    &-top {
        display: flex;
        margin-bottom: 40px;

        img {
            height: 200px;
            border-radius: 8px;
        }

        &__right {
            padding: 0 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .desc {
                font-size: 12px;
                opacity: .7;
                line-height: 16px;
                text-indent: 2em;
                margin-bottom: 8px;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                max-height: 48px;
            }

            .btn {
                font-size: 14px;
            }

            .tags {
                font-size: 12px;
                opacity: .7;
                line-height: 16px;
                margin-bottom: 8px;
                span {
                    margin: 0 6px;
                }
            }
        }
    }
}
</style>
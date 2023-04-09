<script lang="ts" setup>
//排行榜
import { useRankStore } from '@/store/rank';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import ChosenItem from '@/components/layout/my-main/chosen-item.vue';
const rankStore = useRankStore();
const { theme } = storeToRefs(useMainStore());
onMounted(async () => {
    await rankStore.getList({
        limit: 9
    })
})
</script>
<template>
    <div :class="['rank', { 'dark': theme }]">
        <div class="rank-item" v-for="item in rankStore.list" :key="item.id">
            <chosen-item :id="item.id" :url="item.coverImgUrl" />
            <div class="rank-item-text">
                <h4>{{ item.name }}</h4>
                <div class="desc">{{ item.description || '-' }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$square: 150px;

.rank {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;

    &-item {
        width: 450px;
        height: $square;
        background-color: #efefef;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        display: flex;

        &:nth-of-type(3n) {
            margin-right: 0;
        }

        :deep(.chosen-item) {
            width: $square;
            margin: 0;

            img {
                height: $square;
            }
        }

        &:hover {
            cursor: pointer;
            transform: translateY(-4px);
            transition: all .3s;
        }

        &-text {
            padding: 0 20px;

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
        }
    }

    &.dark {
        .rank-item {
            background-color: #584f4f;
        }
    }
}

</style>
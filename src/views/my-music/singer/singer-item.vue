<script lang="ts" setup>
// 歌手item
import { SingerResponseItem } from '@/types/singer';
import { PropType } from 'vue';

defineProps({
    singer: Object as PropType<SingerResponseItem>,
    hasImg: Boolean
})
</script>
<template>
    <div class="singer-item">
        <img v-if="hasImg" v-lazy="singer?.img1v1Url">
        <div class="singer-item-name">
            {{ singer?.name || ''}}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.singer-item {
    padding: 10px 20px;
    text-align: center;
    margin-bottom: 20px;
    transition: all .3s ease-in-out;
    img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        margin-bottom: 10px;
        cursor: pointer;
    }
    &-name {
        &:hover {
            color: #1ed0a2;
            cursor: pointer;
        }
    }
}
</style>

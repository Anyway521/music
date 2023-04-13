<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const jumpToDetails = (id: number) => {
    // const partailParams = pick(list,['id','picUrl', 'name'])
    router.push({
        name: 'detail',
        params: {
            // info: encodeBase64(list)
            id
        }
    })
}

interface Props {
    url: string,
    id: number,
    subscrible: number,
    name: string
}
withDefaults(defineProps<Props>(), {
    url: '',
    id: 0,
    subscrible: 0,
    name: ''
})

</script>
<template>
    <div class="album-item" @click="jumpToDetails(id)">
        <img v-lazy="url" alt="">
        <div class="album-item__title">{{ name }}</div>
        <div class="album-item__subcrible">
            <i class="iconfont icon-shoucang"></i>
            {{ subscrible || '-' }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.album-item {
    position: relative;
    display: grid;
    place-items: center;

    img {
        width: 440px;
        height: 180px;
        cursor: pointer;
        object-fit: cover;
        border-radius: 8px;

        &:hover {
            opacity: .8;
        }
    }

    &__title {
        position: absolute;
        font-style: italic;
        top: 8px;
        left: 24px;
        color: blanchedalmond;
        backdrop-filter: brightness(0.5);
        padding: 0 4px;
    }

    &__subcrible {
        position: absolute;
        font-size: 14px;
        right: 24px;
        bottom: 8px;
        color: blanchedalmond;
        background-color: rgba(78, 81, 83, .7);
        border-radius: 4px;
        padding: 2px 8px;
    }
}</style>
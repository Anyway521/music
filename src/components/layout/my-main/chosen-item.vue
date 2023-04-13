<script setup lang="ts">
// import { pick } from 'lodash';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
// import { useBase64 } from '@/utils/base64';
import { useRouter } from 'vue-router';
// import { useChosenItem } from './use-chosen-item';
// vue3bug,目前不支持从外部导入interface给defineProps用。只能在当前文件声明。
import img from '@/assets/img/logo.png';
interface ChosenProps {
    id: number;
    name?: string;
    url: string;
}
const chose = ref<NullAble<HTMLElement>>(null);
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

// const { encodeBase64 } = useBase64();
onMounted(() => {
    nextTick(() => {
        chose.value?.addEventListener('mouseover', () => {
            chose.value?.classList.add('active')
        })

        chose.value?.addEventListener('mouseout', () => {
            chose.value?.classList.remove('active')
        })
    })

})

onUnmounted(() => {
    chose.value?.removeEventListener('mouseover', () => {
        chose?.value?.classList.add('active')
    })

    chose.value?.removeEventListener('mouseout', () => {
        chose?.value?.classList.remove('active')
    })
})
const props = withDefaults(defineProps<ChosenProps>(), {
    id: 0,
    name: '',
    url: img,
})
</script>
<template>
    <div class="chosen-item" ref="chose" @click="jumpToDetails(props.id)">
        <img v-lazy="props.url" alt="" >
        <div class="chosen-item__btn">
            <i class="iconfont icon-bofang1"></i>
        </div>
        <div v-if="props.name" class="chosen-item__desc">{{ props.name }}</div>
    </div>
</template>
<style lang="scss" scoped>
.chosen-item {
    position: relative;
    display: grid;
    place-items: center;
    margin-right: 20px;
    margin-bottom: 20px;

    img {
        height: 214px;
        border-radius: 8px;
    }

    &:hover {
        opacity: 0.9;
        cursor: pointer;
        transition: all 0.5s;
        filter: brightness(0.7);
    }

    &__btn {
        position: absolute;

        i {
            font-size: 40px;
            display: none;
            color: wheat;

            &:hover {
                color: #1ed0a2;
                filter: brightness(1);
            }
        }
    }

    &__desc {
        width: 214px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        margin: 8px 0;
    }

    &.active {
        .chosen-item__btn {
            i {
                display: block;
            }
        }
    }

    &:nth-of-type(6n) {
        margin-right: 0;
    }
}
</style>
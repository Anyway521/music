<script lang="ts" setup>
import { ref } from 'vue';
interface Props {
    bg: string
}
const props = withDefaults(defineProps<Props>(), {
    bg: 'public/logo.png'
})
const isShow = ref(false);
const switchShow = () => {
    isShow.value = !isShow.value
}

defineExpose({
    switchShow
})
</script>
<template>
    <div :class="['detail', { 'show': isShow }]">
        <div class="detail-background">
            <img :src="props.bg" alt="">
        </div>
        <div class="detail-main">
            <div class="detail-main__tool">
                <i class="iconfont icon-xiangxia" @click="switchShow"></i>
                <div>
                    <i class="iconfont icon-quanping"></i>
                    <i class="iconfont icon-zuixiaohua3"></i>
                    <i class="iconfont icon-chuangkouhuanyuan"></i>
                    <i class="iconfont icon-guanbi"></i>
                </div>
            </div>
            <div class="detail-main__middle">
                <div class="disk">
                    <img :src="props.bg" alt="">
                </div>
                <div class="lyc">
                    <h2>假装这里是歌词</h2>
                    <h4>假装这里是歌词</h4>
                    <h4>假装这里是歌词</h4>
                    <h4>假装这里是歌词</h4>
                    <h4>假装这里是歌词</h4>
                    <h4>假装这里是歌词</h4>
                    <h4>假装这里是歌词</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    position: fixed;
    min-width: 100%;
    height: 100vh;
    background: wheat;
    left: 0;
    top: 200vh;
    z-index: 999;
    transition: all .6s linear;

    &.show {
        top: 0vh
    }

    &-background {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(81px) brightness(0.5);
        backdrop-filter: brightness(0.5);
        z-index: 1;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &-main {
        position: relative;
        left: 0;
        bottom: 100vh;
        z-index: 4;
        padding: 24px;
        color: wheat;

        i {
            cursor: pointer;
            margin-right: 16px;

            &:hover {
                color: #1ed0a2;
            }
        }

        &__tool {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__middle {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 100px;

            .disk {
                width: 500px;
                height: 500px;
                display: grid;
                place-items: center;
                background-image: url('src/assets/img/diskk.png');
                background-size: cover;
                img {
                    width: 100px;
                    margin-top: -20px;
                    border-radius: 50%;
                    border: 10px solid black;
                    animation: rotate 5s linear infinite;
                }
            }

            .lyc {
                text-align: center;
                width: 500px;
                margin-left: 120px;
            }
        }
    }

}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
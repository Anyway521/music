<script setup lang="ts">
// 头部
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store/main';
const searchText = ref('');
const router = useRouter();
const goBack = () => {
    router.back();
}
const goForward = () => {
    router.forward();
}
const { switchTheme } = useMainStore();

</script>
<template>
    <div class="header">
        <div class="header-left">
            <div class="header-left__btn">
                <i class="iconfont icon-zuojiantou_huaban" @click="goBack" :title="'后退'"></i>
                <i class="iconfont icon-youjiantou_huaban" @click="goForward" :title="'前进'"></i>
            </div>
            <div class="header-left__search">
                <el-input v-model="searchText" class="w-50 m-2" placeholder="搜索音乐" :suffix-icon="Search" />
            </div>
            <div class="header-left__analysis">
                <i class="iconfont icon-yinle1"></i>
            </div>
        </div>
        <div class="header-right">
            <div class="header-right__login">
                <img src="@/assets/img/login.png" alt="">
                <span>点击登录</span>
            </div>
            <div class="header-right__tool">
                <i class="iconfont icon-pifu" @click="switchTheme"></i>
                <i class="iconfont icon-31liebiao"></i>
                <span>|</span>
                <i class="iconfont icon-datumoshi"></i>
                <i class="iconfont icon-zuixiaohua3"></i>
                <i class="iconfont icon-chuangkouhuanyuan"></i>
                <i class="iconfont icon-guanbi"></i>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__btn {
            margin-right: 24px;
            cursor: pointer;

            i:first-of-type {
                margin-right: 20px;
            }

            i.disabled {
                color: red;
            }
            i:hover {
                color: #1ec;
            }
        }

        &__analysis {
            margin-left: 24px;
        }

    }

    :deep(.el-input__wrapper) {
        background-color: #e6e6e6;
        border-radius: 50px;
        width: 250px;
        font-size: 12px;
    }

    :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px #c0c4cc inset;
    }

    &-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 300px;
        margin-left: 20px;

        &__login {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #9ea0a3;

            &:hover {
                color: #47d5a7;
                cursor: pointer;
            }

            img {
                width: 30px;
                height: 30px;
                margin-right: 12px;
            }
        }

        &__tool {
            i {
                margin-left: 14px;
                font-style: normal;

                &:hover {
                    color: #47d5a7;
                    cursor: pointer;
                }
            }

            span {
                margin-left: 14px;
                font-style: normal;
            }
        }
    }
}</style>
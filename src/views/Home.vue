<script setup lang="ts">
import MyPlayer from '@/components/layout/my-player/index.vue';
import MyMenu from '@/components/layout/my-menu/index.vue';
import MyHeader from '@/components/layout/my-header/index.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
//如果直接解构会丢失响应式，需要用storeToRefs
const { theme } = storeToRefs(useMainStore());

</script>
<template>
    <div class="common-layout home" :class="{ 'dark': theme }">
        <el-container>
            <el-aside width="260px">
                <my-menu />
            </el-aside>
            <el-container class="home-right">
                <el-header><my-header /></el-header>
                <el-main>
                    <router-view />
                </el-main>
                <el-footer><my-player /></el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="scss" scoped >
.home {
    height: 100%;
    overflow-x: clip;
    background-color: #f0f0f0;

    :deep(.el-container) {
        height: 100%;
        min-width: 1400px;

        &.home-right {
            background-color: #f6f6f6;
        }
    }

    :deep(.el-header) {
        line-height: 60px;
        // padding-left: 0;
    }

    :deep(.el-main) {
        padding-bottom: 0;
    }

    :deep(.el-footer) {
        height: 80px;
        padding: 0;
        margin-top: 10px;
    }

    &.dark {
        background-color: #2c2c2d;
        color: wheat;

        :deep(.el-container.home-right) {
            background-color: #333;
            color: wheat;
        }
    }
}
</style>
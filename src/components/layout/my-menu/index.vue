<script setup>
import MenuList from './menu-list.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
const { theme } = storeToRefs(useMainStore());
</script>
<template>
    <div :class="['menu',{'dark': theme }]">
        <div class="menu-header">
            <img src="@/assets/img/qqicon.png" alt="">
            <h2>QQ音乐</h2>
        </div>
        <menu-list/>
    </div>
</template>
<style lang="scss" scoped>
.menu {
    box-sizing: border-box;
    padding: 30px;
    &-header{
        display: flex;
        align-items: center;
        img {
            height: 40px;
        }
        h2 {
            font-weight: normal;
            margin-left: 6px;
        }
    }
    &.dark {
        :deep(.el-menu-item) {
            background-color: wheat;
            color: #1a1010;
            &:hover {
                background-color: #71e3be;
            }
        }
    }
}
</style>
<script lang="ts" setup>
// 列表组件
import { useMenuList } from './use-menulist';
import { useRouter, useRoute } from 'vue-router';
const { MENUS } = useMenuList();
const router = useRouter();
const route = useRoute();
const getFisrtLevel = (str: string) => {
    let match = str.match(/^\/\w+/);
    return match?.[0] || MENUS[0].items[0].url; 
}
</script>
<template>
    <!-- 这里采用多个menu配合路由的方式 -->
    <div class="menu" v-for="item in MENUS" :key="item.key">
        <div class="menu__title">
            {{ item.title }}
        </div>
        <el-menu :default-active="getFisrtLevel(route.path)" router>
            <el-menu-item v-for="(el, ind) in item.items" :key="ind" :index="el.url" @click="router.push(el.url)">
                <i :class="['iconfont', el.icon]"></i>
                <span>{{ el.title }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style lang="scss" scoped>
.menu {
    &:not(last-of-type) {
        margin-bottom: 40px;
    }

    &__title {
        margin: 12px 0;
        font-size: 14px;
        color: gray;

    }

    :deep(.el-menu) {
        border-right: none;
        background-color: transparent;
    }

    :deep(.el-menu-item) {
        border-radius: 5px;
        height: 36px;
        margin-bottom: 12px;

        .iconfont {
            margin: 0 10px;
        }
    }

    :deep(.el-menu-item:hover) {
        background-color: #dedede;
    }

    :deep(.el-menu-item.is-active) {
        background-image: linear-gradient(to right, #20d6bf, #1ecc95);
        color: white;

        .iconfont {
            color: white;
        }
    }
}

</style>
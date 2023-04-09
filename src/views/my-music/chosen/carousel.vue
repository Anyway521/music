<script lang="ts" setup>
// 精选歌单

import { useChosenStore } from '@/store/chosen';
import ChosenItem from '@/components/layout/my-main/chosen-item.vue';
import { onMounted } from 'vue';
const chosenStore = useChosenStore();
onMounted(async () => {
    await chosenStore.getList(18);
})

</script>
<template>
    <div class="carousel">
        <h2>官方歌单</h2>
        <div class="carousel-item">
            <template v-for="item in chosenStore.list" :key="item.id">
                <chosen-item :id="item.id" 
                             :url="item.picUrl"
                             :name="item.name"/>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.carousel {
    &-item {
        display: flex;
        flex-wrap: wrap;
    }
    h2 {
        font-weight: normal;
    }
}
</style>

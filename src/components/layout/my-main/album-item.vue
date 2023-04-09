<script lang="ts" setup>
defineProps({
    url: String
})
</script>
<template>
    <div class="album-item">
        <img :src="url" alt="">
    </div>
</template>
<style lang="scss" scoped>
.album-item {
    position: relative;
    display: grid;
    place-items: center;
    img {
        height: 180px;
        cursor: pointer;
        border-radius: 8px;
    }
}
</style>
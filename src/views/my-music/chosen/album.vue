<script lang="ts" setup>
import { SwiperSlide } from 'swiper/vue';
import AlbumItem from '@/components/layout/my-main/album-item.vue';
//付费专辑
</script>
<template>
    <div class="album">
        <swiper-container slides-per-view="3" slides-per-group="3" space-between="0"
        autoplay-disable-oninteraction="false"
            :pagination="{
                el: '.pagin',
                enabled: true,
                clickable: true,
            }">
            <swiper-slide v-for="item in 12" :key="item">
                <album-item :url="`src/assets/img/pic/${item}.png`" />
            </swiper-slide>
        </swiper-container>
        <!-- swiper的el类名不能kabe-case -->
        <div class="pagin"></div>
    </div>
</template>
<style lang="scss" scoped>
.pagin {
    position: relative;
    text-align: center;
    top: 10px;
}
</style>
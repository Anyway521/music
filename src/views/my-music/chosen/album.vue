<script lang="ts" setup>
import { SwiperSlide } from 'swiper/vue';
import AlbumItem from '@/components/layout/my-main/album-item.vue';
import { useOnlineStore } from '@/store/online';
import { onMounted } from 'vue';

const onlineStore = useOnlineStore();
onMounted(() => {
    onlineStore.getList(9);
})
//付费专辑
</script>
<template>
    <div class="album" name="album">
        <swiper-container slides-per-view="3" slides-per-group="3" space-between="0" autoplay-disable-oninteraction="false"
            :pagination="{
                el: '.pagin',
                enabled: true,
                clickable: true,
            }">
            <swiper-slide v-for="(item, index) in onlineStore.list" :key="index">
                <album-item :url="item.coverImgUrl" :id="item.id" :subscrible="item.subscribedCount" :name="item.name" />
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
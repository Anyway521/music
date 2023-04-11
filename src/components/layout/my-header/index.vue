<script setup lang="ts">
// 头部
import { Search } from '@element-plus/icons-vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store/main';
import { useSearchStore } from '@/store/search';
import debounce from 'lodash/debounce';

const layer1 = ref<NullAble<HTMLElement>>(null);
const layer2 = ref<NullAble<HTMLElement>>(null);
const input = ref<NullAble<HTMLInputElement>>(null);
const searchText = ref('');
const router = useRouter();
const goBack = () => {
    router.back();
}
const goForward = () => {
    router.forward();
}
const jumpToMusicDetails = debounce((keywords: string) => {
    if (!keywords) {
        alert('请输入要搜索的内容')
        return;
    }
    setSearchText(keywords);
    router.push({
        name: 'song-detail',
        params: {
            keywords
        }
    })
    isShow.value = false
})

const { switchTheme } = useMainStore();
const isShow = ref(false);
const showLayer = () => {
    isShow.value = true
}

const hideLayer = () => {
    isShow.value = false
}

const setSearchText = (txt: string) => {
    searchText.value = txt
}

const searchStore = useSearchStore();
onMounted(() => {
    searchStore.getHotKeyWordsList();
    document.addEventListener('click', onLayerClick)
})

onUnmounted(() => {
    document.removeEventListener('click', onLayerClick)
})

const getSuggestion = debounce(() => {
    showLayer();
    if (!searchText.value) {
        return;
    }
    searchStore.getSuggestionList({ keywords: searchText.value })
})

const onLayerClick = (event: Event) => {
    if ([input.value.ref, layer1.value, layer2.value].includes(event.target)) {
        showLayer()
    } else {
        hideLayer()
    }
};


</script>
<template>
    <div class="header">
        <div class="header-left">
            <div class="header-left__btn">
                <i class="iconfont icon-zuojiantou_huaban" @click="goBack" :title="'后退'"></i>
                <i class="iconfont icon-youjiantou_huaban" @click="goForward" :title="'前进'"></i>
            </div>
            <div class="header-left__search">
                <el-input v-model="searchText" ref="input" class="w-50 m-2" placeholder="搜索音乐" :suffix-icon="Search"
                    @focus="getSuggestion" @input="getSuggestion" @change="jumpToMusicDetails(searchText)" />
                <div v-show="isShow && !searchText" ref="layer1" class="header-left__search-hot">
                    <div class="title">热搜榜</div>
                    <ul class="list">
                        <li v-for="item in searchStore.keyWordsList" :key="item.first"
                            @click.stop="jumpToMusicDetails(item.first)">{{ item.first }}</li>
                    </ul>
                </div>
                <div v-show="isShow && searchText" ref="layer2" class="header-left__search-result">
                    <div class="title">在线音乐</div>
                    <ul class="list">
                        <li v-for="item in searchStore.suggestKeyWordsList" :key="item.id"
                            @click.stop="jumpToMusicDetails(item.name)">{{
                                `${item.name} - ${item.artists.map(el => el.name).join('&') || ''} - ${item.album.name || ''}`
                            }}
                        </li>
                    </ul>
                </div>
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

        &__search {
            position: relative;

            &-result,
            &-hot {
                position: absolute;
                top: 50px;
                width: 230px;
                min-height: 280px;
                background: #f6f6f6;
                box-shadow: 1px 1px 2px 1px #dadada;
                border-radius: 10px;
                padding: 10px 20px;
                line-height: 24px;

                .list {
                    font-size: 14px;

                    li {
                        margin-left: -30px;
                        width: 220px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    li:hover {
                        color: #47d5a7;
                        cursor: pointer;
                    }
                }

                .close {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    font-size: 20px;
                    cursor: pointer;
                }
            }

            &-result {
                z-index: 998;
            }

            &-hot {
                z-index: 999;
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
}
</style>
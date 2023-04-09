import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getRankList } from '@/utils/api';
import { RankResponseItem, RankParams } from '@/types/rank';
export const useRankStore = defineStore('rank', () => {
    const list = ref([] as RankResponseItem[]);

    const getList = async (parmas: RankParams) => {
        const { playlists } = await getRankList(parmas);
        list.value = playlists ?? [];
    }

    return {
        list,
        getList
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRankStore, import.meta.hot))
}
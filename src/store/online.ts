import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';
import { getOnlineChosen } from '@/utils/api';
import { RankResponseItem } from '@/types/rank';
export const useOnlineStore = defineStore('online', () => {
    const list = ref([] as RankResponseItem[]);

    const getList = async (limit: number) => {
        const { playlists } = await getOnlineChosen({ limit });
        list.value = playlists ?? [];
    }

    const picList = computed(() => {
       return list.value.map(el => el.coverImgUrl) || []
    })

    return {
        list,
        getList,
        picList
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOnlineStore, import.meta.hot))
}
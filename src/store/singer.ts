import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getSinger } from '@/utils/api';
import { SingerResponseItem, SingerParams } from '@/types/singer';
export const useSingerStore = defineStore('singer', () => {
    const list = ref([] as SingerResponseItem[]);

    const getList = async (limit?: SingerParams) => {
        const { list: { artists } } = await getSinger(...limit?.type ? [limit] : []);
        list.value = artists ?? [];
    }

    const filterList = (limit: number) => {
        if (list.value.length > limit) {
            list.value = list.value.slice(0, limit)
        }
    }

    return {
        list,
        getList,
        filterList
    }

},{
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSingerStore, import.meta.hot))
}
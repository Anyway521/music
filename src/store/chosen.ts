import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getChosen } from '@/utils/api';
import { ChosenResponseItem } from '@/types/chosen';
export const useChosenStore = defineStore('resource', () => {
    const list = ref([] as ChosenResponseItem[]);

    const getList = async (limit: number) => {
        const { result } = await getChosen({ limit });
        list.value = result ?? [];
    }

    return {
        list,
        getList
    }

}, {
    persist: true
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useChosenStore, import.meta.hot))
}
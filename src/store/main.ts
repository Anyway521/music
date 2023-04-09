import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

// export const useMainStore =  defineStore('main', {
//     state: () => {
//         return {
//             theme: true
//         }
//     },
//     actions: {
//         switchTheme() {
//             this.$patch({
//                 theme: !this.theme
//             })
//         }
//     }
// })
export const useMainStore = defineStore('main', () => {
    const theme = ref(true);
    const switchTheme = () => {
        theme.value = !theme.value;
    };
    return {
        theme,
        switchTheme
    }
}, {
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
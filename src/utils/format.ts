import { Singer } from "@/types/songlist";

const getRealName = (singers: Singer[]) => {
    return singers.map(el => el.name).join('&')
}

export function useFormat () {
    return {
        getRealName
    }
}
export interface ChosenResponseItem {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
    alg: string
}
export interface ChosenResponse {
    hasTaste: boolean;
    code: number;
    category: number;
    result: ChosenResponseItem[]
}

export interface ChosenParams {
    limit: number;
}
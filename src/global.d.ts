declare global {
    type NullAble<T> = T | null;
    type EmptyFunction = () => void;
}

export {}
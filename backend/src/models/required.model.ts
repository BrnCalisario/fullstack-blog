export type RequiredFields<T> = {
    [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T]

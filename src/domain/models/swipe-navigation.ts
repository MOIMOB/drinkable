export interface SwipeNavigation {
    translation: string;
    vm: string;
    vmRef?: {
        bind(): void;
    };
}

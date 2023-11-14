export type StaticTagModel = {
    id: string;
    translation: string;
}

export type TagModel = {
    name?: string;
} & StaticTagModel;

export interface StaticTagModel {
    id: string;
    translation: string;
}

export interface TagModel extends StaticTagModel {
    name?: string;
}

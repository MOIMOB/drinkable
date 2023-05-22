export enum Tag {
    IBA = '1',
    FormerIBA = '2'
}

export function getTagsFromIds(ids: Tag[]): TagModel[] {
    return ids?.map(id => tags.find(tag => tag.id === id)).filter(x => x !== undefined);
}

export function getTags() {
    return tags;
}

export interface TagModel {
    id: Tag;
    translation: string;
    name?: string;
}

const tags = [
    { id: Tag.IBA, translation: 'iba' },
    { id: Tag.FormerIBA, translation: 'former-iba' }
] as const;

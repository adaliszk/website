export type EntryShape = {
    id: string;
    collection: string;
    data: object;
    render: () => { Content: string };
};

/**
 * Removes the render function from the entry object so that Qwik can serialize it.
 */
export function serializeForQwik<T extends EntryShape>(entries: T[]) {
    return entries.map((entry) => {
        const { id, collection, data } = entry;
        return { id, collection, data };
    });
}

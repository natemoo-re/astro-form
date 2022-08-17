const ids = new WeakMap<any, number>();
export let currFormId: string | undefined;
export function uuid(obj: object, prefix = '') {
    let id = (ids.get(obj) ?? -1) + 1;
    ids.set(obj, id);
    currFormId = `${prefix ? `${prefix}:` : ''}${id}`;
    return currFormId;
}

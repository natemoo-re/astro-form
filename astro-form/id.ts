const ids = new WeakMap<any, number>();
export function uuid(obj: object, prefix = '') {
    let id = (ids.get(obj) ?? -1) + 1;
    ids.set(obj, id);
    return `${prefix ? `${prefix}:` : ''}${id}`;
}

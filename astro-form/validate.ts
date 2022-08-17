import { parse } from 'ultrahtml';

const compose = (...functions: any[]) => (...args: any[]) => {
    const result: string[] = [];
    functions.forEach(fn => {
        const value = fn(...args)
        if (value) {
            result.push(value)
        }
    })
    return result;
};

function extract(node: any, elements: any[] = []) {
    if ('name' in node && node.name === 'input') {
        elements.push(node.attributes)
    }
    if (Array.isArray(node.children)) {
        node.children.forEach((child: any) => extract(child, elements))
    }
    return elements;
}

const VALIDATORS = {
    required: () => (value: string) => value !== '' ? null : 'valueMissing',
    minlength: (len: string) => (value: string) => value.length > (Number.parseInt(len) - 1) ? null : 'tooShort',
    maxlength: (len: string) => (value: string) => value.length < (Number.parseInt(len) + 1) ? null : 'tooLong',
    min: (min: string) => (value: string) => Number(value) > Number(min) ? null : 'rangeUnderflow',
    max: (max: string) => (value: string) => Number(value) < Number(max) ? null : 'rangeOverflow',
    pattern: (pattern: string) => (value: string) => new RegExp(pattern).test(value) ? null : 'patternMismatch',
}

function createValidators(attrs: Record<string, string>) {
    const checks: ((value: string) => any)[] = [];
    for (const [key, value] of Object.entries(attrs)) {
        if (key in VALIDATORS) {
            const validator = VALIDATORS[key as keyof typeof VALIDATORS](value);
            checks.push(validator);
        }
    }
    return compose(...checks)
}

export default function validate(html: string) {
    const ast = parse(html);
    const validators = extract(ast).reduce((acc, { name, ...attrs }) => {
        if (name) {
            acc[name] = createValidators(attrs)
        }
        return acc;
    }, {});
    return validators;
}

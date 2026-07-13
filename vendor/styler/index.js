import { stableHash } from './hash.js';
import { formatValue, toKebab } from './css.js';
import { globalStyleRegistry, StyleRegistry } from './registry.js';
export { stableHash, StyleRegistry, globalStyleRegistry };
export function configureStyler(configuration) { globalStyleRegistry.configure(configuration); }
export function css(style, label = 'dynamic') { return globalStyleRegistry.compile(style, label); }
export function create(styles) {
    return Object.fromEntries(Object.entries(styles).map(([name, style]) => [name, globalStyleRegistry.compile(style, name)]));
}
function flattenInputs(inputs, output) {
    for (const input of inputs) {
        if (!input)
            continue;
        if (Array.isArray(input))
            flattenInputs(input, output);
        else if (typeof input === 'string')
            output.push(...input.split(/\s+/).filter(Boolean));
        else if (input.className)
            output.push(...input.className.split(/\s+/).filter(Boolean));
    }
}
export function props(...inputs) {
    const flattened = [];
    flattenInputs(inputs, flattened);
    const byConflict = new Map();
    const unmanaged = [];
    for (const className of flattened) {
        const conflict = globalStyleRegistry.conflictKey(className);
        if (conflict)
            byConflict.set(conflict, className);
        else if (!unmanaged.includes(className))
            unmanaged.push(className);
    }
    return { className: [...unmanaged, ...byConflict.values()].join(' ') };
}
export function defineVars(contract, namespace = 'theme') {
    const visit = (value, path) => Object.fromEntries(Object.entries(value).map(([key, child]) => {
        const next = [...path, key];
        return [key, child && typeof child === 'object' ? visit(child, next) : `var(--${namespace}-${next.join('-')})`];
    }));
    return visit(contract, []);
}
export function createTheme(variables, values, label = 'theme') {
    const declarations = {};
    const walk = (refs, source) => {
        for (const [key, ref] of Object.entries(refs)) {
            const value = source[key];
            if (ref && typeof ref === 'object' && value && typeof value === 'object')
                walk(ref, value);
            else if (typeof ref === 'string' && ref.startsWith('var(--'))
                declarations[ref.slice(4, -1)] = value;
        }
    };
    walk(variables, values);
    return globalStyleRegistry.compile(declarations, label);
}
export function keyframes(frames, label = 'animation') {
    const name = `${label}-${stableHash(JSON.stringify(frames))}`;
    const body = Object.entries(frames).map(([step, style]) => {
        const declarations = Object.entries(style)
            .filter((entry) => typeof entry[1] === 'string' || typeof entry[1] === 'number')
            .map(([property, value]) => `${toKebab(property)}:${formatValue(property, value)}`)
            .join(';');
        return `${step}{${declarations}}`;
    }).join('');
    const cssText = `@keyframes ${name}{${body}}`;
    globalStyleRegistry.registerGlobal(`keyframes:${name}`, cssText);
    return name;
}
export function createVariants(recipe, label = 'variant') {
    const base = recipe.base ? css(recipe.base, `${label}-base`) : '';
    const compiled = Object.fromEntries(Object.entries(recipe.variants).map(([variant, options]) => [variant, Object.fromEntries(Object.entries(options).map(([option, style]) => [option, css(style, `${label}-${variant}-${option}`)]))]));
    return (selection = {}) => {
        const resolved = { ...recipe.defaults, ...selection };
        const classes = [base];
        for (const [variant, option] of Object.entries(resolved))
            classes.push(compiled[variant]?.[option]);
        for (const compound of recipe.compounds ?? [])
            if (Object.entries(compound.when).every(([key, value]) => resolved[key] === value))
                classes.push(css(compound.style, `${label}-compound`));
        return props(...classes).className;
    };
}
//# sourceMappingURL=index.js.map
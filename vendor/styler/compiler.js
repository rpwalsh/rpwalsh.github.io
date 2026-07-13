import { formatValue, toKebab } from './css.js';
import { stableHash } from './hash.js';
import { StyleRegistry } from './registry.js';
const SAFE_SELECTOR = /^(?::root|\[[a-zA-Z0-9_-]+(?:=["'][a-zA-Z0-9 _-]+["'])?\]|\.[a-zA-Z_][a-zA-Z0-9_-]*)$/;
const SAFE_PROPERTY = /^(?:--[a-zA-Z0-9_-]+|-?[a-zA-Z][a-zA-Z0-9-]*)$/;
const SAFE_NESTED_SELECTOR = /^(?::[a-zA-Z][a-zA-Z0-9-]*(?:\([a-zA-Z0-9 _.,%+\-]+\))?|&(?:\[[a-zA-Z0-9_-]+(?:=["'][a-zA-Z0-9 _-]+["'])?\]|:[a-zA-Z][a-zA-Z0-9-]*))$/;
const SAFE_CONDITION = /^@(?:media|supports|container|layer) [a-zA-Z0-9_():.\-\s%]+$/;
const SAFE_ANIMATION_STEP = /^(?:from|to|(?:100|[0-9]{1,2})(?:\.[0-9]+)?%)$/;
const BLOCKED_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
function assertSafeToken(value, path) {
    if (typeof value === 'number') {
        if (!Number.isFinite(value))
            throw new TypeError(`${path} must be finite`);
        return;
    }
    if (/[{};<>\u0000-\u001f]/.test(value) || /(?:javascript\s*:|expression\s*\()/i.test(value)) {
        throw new TypeError(`${path} contains an unsafe CSS token`);
    }
}
function assertStyleObject(value, path) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new TypeError(`${path} must be a style object`);
    }
    for (const [key, child] of Object.entries(value)) {
        if (BLOCKED_KEYS.has(key))
            throw new TypeError(`${path}.${key} is not allowed`);
        if (child == null)
            continue;
        if (typeof child === 'string' || typeof child === 'number') {
            if (!SAFE_PROPERTY.test(key))
                throw new TypeError(`${path}.${key} is not a valid property`);
            assertSafeToken(child, `${path}.${key}`);
            continue;
        }
        if (key.startsWith('@') ? !SAFE_CONDITION.test(key) : !SAFE_NESTED_SELECTOR.test(key)) {
            throw new TypeError(`${path}.${key} is not an allowed selector or condition`);
        }
        assertStyleObject(child, `${path}.${key}`);
    }
}
export function validateStyleDocument(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new TypeError('Style document must be an object');
    const document = value;
    if (document.version !== 'risklab.styles/v1')
        throw new TypeError('Unsupported style document version');
    if (!document.styles || typeof document.styles !== 'object' || Array.isArray(document.styles)) {
        throw new TypeError('styles must be an object');
    }
    for (const [name, style] of Object.entries(document.styles))
        assertStyleObject(style, `styles.${name}`);
    for (const [name, frames] of Object.entries(document.animations ?? {})) {
        if (!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name))
            throw new TypeError(`animations.${name} has an invalid name`);
        if (!frames || typeof frames !== 'object' || Array.isArray(frames))
            throw new TypeError(`animations.${name} must be an object`);
        for (const [step, style] of Object.entries(frames)) {
            if (!SAFE_ANIMATION_STEP.test(step))
                throw new TypeError(`animations.${name}.${step} is invalid`);
            assertStyleObject(style, `animations.${name}.${step}`);
        }
    }
    for (const [name, theme] of Object.entries(document.themes ?? {})) {
        if (!theme || typeof theme !== 'object' || !SAFE_SELECTOR.test(theme.selector))
            throw new TypeError(`themes.${name}.selector is invalid`);
        for (const [variable, token] of Object.entries(theme.variables ?? {})) {
            if (!/^--[a-zA-Z0-9_-]+$/.test(variable) || (typeof token !== 'string' && typeof token !== 'number')) {
                throw new TypeError(`themes.${name}.variables contains an invalid declaration`);
            }
            assertSafeToken(token, `themes.${name}.variables.${variable}`);
        }
    }
}
function compileFrames(registry, frames, label) {
    const name = `${label}-${stableHash(JSON.stringify(frames))}`;
    const body = Object.entries(frames).map(([step, style]) => {
        const declarations = Object.entries(style)
            .filter((entry) => typeof entry[1] === 'string' || typeof entry[1] === 'number')
            .map(([property, token]) => `${toKebab(property)}:${formatValue(property, token)}`)
            .join(';');
        return `${step}{${declarations}}`;
    }).join('');
    registry.registerGlobal(`animation:${name}`, `@keyframes ${name}{${body}}`);
    return name;
}
export function compileStyleDocument(input, prefix = 'rs') {
    validateStyleDocument(input);
    const registry = new StyleRegistry();
    registry.configure({ prefix, autoInject: false });
    const classes = Object.fromEntries(Object.entries(input.styles).map(([name, style]) => [name, registry.compile(style, name)]));
    const animations = Object.fromEntries(Object.entries(input.animations ?? {}).map(([name, frames]) => [name, compileFrames(registry, frames, name)]));
    for (const [name, theme] of Object.entries(input.themes ?? {})) {
        const declarations = Object.entries(theme.variables)
            .map(([variable, token]) => `${variable}:${String(token)}`)
            .join(';');
        registry.registerGlobal(`theme:${name}`, `${theme.selector}{${declarations}}`);
    }
    const css = registry.getCSS();
    return {
        version: 'risklab.styles.compiled/v1',
        classes,
        animations,
        css,
        manifest: {
            atomicRuleCount: registry.getRules().length,
            sourceHash: stableHash(JSON.stringify(input)),
        },
    };
}
export function compileStyleDocumentJSON(json, prefix = 'rs') {
    return compileStyleDocument(JSON.parse(json), prefix);
}
//# sourceMappingURL=compiler.js.map
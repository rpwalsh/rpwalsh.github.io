const UNITLESS = new Set(['animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'columns', 'fillOpacity', 'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative', 'flexOrder', 'floodOpacity', 'fontWeight', 'gridArea', 'gridColumn', 'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowSpan', 'gridRowStart', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'scale', 'shapeImageThreshold', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'tabSize', 'widows', 'zIndex', 'zoom']);
const TIME_VALUES = new Set(['animationDelay', 'animationDuration', 'transitionDelay', 'transitionDuration']);
const ANGLE_VALUES = new Set(['rotate', 'offsetRotate']);
export function toKebab(property) {
    if (property.startsWith('--'))
        return property;
    return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^ms-/, '-ms-');
}
export function formatValue(property, value) {
    if (typeof value !== 'number' || value === 0 || UNITLESS.has(property) || property.startsWith('--'))
        return String(value);
    if (TIME_VALUES.has(property))
        return `${value}ms`;
    if (ANGLE_VALUES.has(property))
        return `${value}deg`;
    return `${value}px`;
}
export function escapeIdentifier(value) {
    return value.replace(/[^a-zA-Z0-9_-]/g, (character) => `\\${character.codePointAt(0)?.toString(16)} `);
}
export function flattenStyle(style, conditions = [], selectors = []) {
    const leaves = [];
    for (const [key, value] of Object.entries(style)) {
        if (value === null || value === undefined)
            continue;
        if (typeof value === 'object') {
            if (key.startsWith('@'))
                leaves.push(...flattenStyle(value, [...conditions, key], selectors));
            else
                leaves.push(...flattenStyle(value, conditions, [...selectors, key]));
            continue;
        }
        leaves.push({ property: key, value, conditions, selectors });
    }
    return leaves;
}
export function renderAtomicRule(className, leaf) {
    const classSelector = `.${escapeIdentifier(className)}`;
    const selector = leaf.selectors.reduce((current, nested) => nested.includes('&') ? nested.replaceAll('&', current) : `${current}${nested}`, classSelector);
    let cssText = `${selector}{${toKebab(leaf.property)}:${formatValue(leaf.property, leaf.value)}}`;
    for (const condition of [...leaf.conditions].reverse())
        cssText = `${condition}{${cssText}}`;
    return { cssText, conflictKey: [...leaf.conditions, ...leaf.selectors, leaf.property].join('|') };
}
//# sourceMappingURL=css.js.map
import { StyleRegistry } from './registry.js';
export function createServerStyleCollector(prefix = 'rs') {
    const registry = new StyleRegistry();
    registry.configure({ prefix, autoInject: false });
    return {
        registry,
        css: (style, label) => registry.compile(style, label),
        getCSS: () => registry.getCSS(),
        getHydrationData: () => registry.getHydrationData(),
        getStyleTag(attributes = {}) {
            const attrs = Object.entries({ 'data-risklab-styler': 'server', ...attributes }).map(([key, value]) => {
                if (!/^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/.test(key))
                    throw new TypeError(`Invalid style attribute: ${key}`);
                const escaped = value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                return ` ${key}="${escaped}"`;
            }).join('');
            const css = registry.getCSS().replaceAll('<', '\\3C ');
            return `<style${attrs}>${css}</style>`;
        },
    };
}
//# sourceMappingURL=server.js.map
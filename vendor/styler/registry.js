import { flattenStyle, renderAtomicRule } from './css.js';
import { stableHash } from './hash.js';
export class StyleRegistry {
    rules = new Map();
    metadata = new Map();
    signatures = new Map();
    globalRules = new Map();
    styleElement = null;
    configuration = { prefix: 'rs', autoInject: true };
    configure(configuration) {
        this.configuration = { ...this.configuration, ...configuration };
        if (this.styleElement && configuration.nonce)
            this.styleElement.nonce = configuration.nonce;
    }
    compile(style, label = 'style') {
        const classes = [];
        for (const leaf of flattenStyle(style)) {
            const signature = JSON.stringify([leaf.property, leaf.value, leaf.conditions, leaf.selectors]);
            const baseName = `${this.configuration.prefix}-${label.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 18)}-${stableHash(signature)}`;
            let className = baseName;
            let collision = 0;
            while (this.signatures.has(className) && this.signatures.get(className) !== signature) {
                collision += 1;
                className = `${baseName}-${collision}`;
            }
            const rendered = renderAtomicRule(className, leaf);
            if (!this.rules.has(className)) {
                const rule = { className, ...rendered };
                this.rules.set(className, rule);
                this.signatures.set(className, signature);
                this.metadata.set(className, rendered.conflictKey);
                if (this.configuration.autoInject)
                    this.inject(rule.cssText);
            }
            classes.push(className);
        }
        return classes.join(' ');
    }
    conflictKey(className) { return this.metadata.get(className); }
    has(className) { return this.rules.has(className); }
    getCSS() { return [...Array.from(this.rules.values(), (rule) => rule.cssText), ...this.globalRules.values()].join('\n'); }
    getRules() { return Array.from(this.rules.values()); }
    getHydrationData() {
        return Array.from(this.rules.values(), (rule) => ({ ...rule, signature: this.signatures.get(rule.className) ?? '' }));
    }
    clear() { this.rules.clear(); this.metadata.clear(); this.signatures.clear(); this.globalRules.clear(); this.styleElement?.remove(); this.styleElement = null; }
    registerGlobal(id, cssText) {
        const existing = this.globalRules.get(id);
        if (existing === cssText)
            return;
        if (existing !== undefined)
            throw new Error(`Global style id collision: ${id}`);
        this.globalRules.set(id, cssText);
        if (this.configuration.autoInject)
            this.inject(cssText);
    }
    hydrate(cssText, entries = []) {
        if (typeof document === 'undefined')
            return;
        const documentTarget = this.configuration.target instanceof Document ? this.configuration.target : document;
        const existing = documentTarget.querySelector('style[data-risklab-styler="server"], style[data-risklab-styler="runtime"]');
        if (existing)
            this.styleElement = existing;
        const style = this.ensureStyleElement();
        style.dataset.risklabStyler = 'runtime';
        if (this.configuration.nonce)
            style.nonce = this.configuration.nonce;
        style.textContent = cssText;
        for (const entry of entries) {
            if (typeof entry === 'string')
                continue;
            this.rules.set(entry.className, { className: entry.className, cssText: entry.cssText, conflictKey: entry.conflictKey });
            this.metadata.set(entry.className, entry.conflictKey);
            this.signatures.set(entry.className, entry.signature);
        }
    }
    inject(cssText) {
        if (typeof document === 'undefined')
            return;
        this.ensureStyleElement().append(document.createTextNode(`${cssText}\n`));
    }
    ensureStyleElement() {
        if (this.styleElement?.isConnected)
            return this.styleElement;
        const documentTarget = this.configuration.target instanceof Document ? this.configuration.target : document;
        const style = documentTarget.createElement('style');
        style.dataset.risklabStyler = 'runtime';
        if (this.configuration.nonce)
            style.nonce = this.configuration.nonce;
        const target = this.configuration.target ?? documentTarget.head;
        target.appendChild(style);
        this.styleElement = style;
        return style;
    }
}
export const globalStyleRegistry = new StyleRegistry();
//# sourceMappingURL=registry.js.map
var he=Object.defineProperty;var be=(s,e,t)=>e in s?he(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>be(s,typeof e!="symbol"?e+"":e,t);class l extends HTMLElement{constructor(){super();a(this,"root");a(this,"_initialized",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){this._injectTokenSheet(),this.render(),this._initialized=!0,this.onConnected()}disconnectedCallback(){this.onDisconnected()}attributeChangedCallback(t,r,o){this._initialized&&r!==o&&this.render()}onConnected(){}onDisconnected(){}styles(){return""}render(){const t=this.styles();this.root.innerHTML=(t?`<style>${t}</style>`:"")+this.template(),this.onRendered()}onRendered(){}getBoolAttr(t){return this.hasAttribute(t)}getAttr(t,r=""){return this.getAttribute(t)??r}getNumAttr(t,r=0){const o=this.getAttribute(t);return o!==null?Number(o):r}emit(t,r){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:r}))}$(t){return this.root.querySelector(t)}$$(t){return Array.from(this.root.querySelectorAll(t))}_injectTokenSheet(){const t=new CSSStyleSheet;t.replaceSync(`
      :host {
        /* Inherit all --ui-* tokens from light DOM */
        font-family: var(--ui-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        color: var(--ui-color-text, #0f172a);
        box-sizing: border-box;
      }
      :host([hidden]) { display: none !important; }
      *, *::before, *::after { box-sizing: inherit; }
    `),this.root.adoptedStyleSheets=[t]}}function n(s,e){customElements.get(s)||customElements.define(s,e)}class z extends l{styles(){return`
      :host { display: inline-flex; }
      :host([full-width]) { display: flex; width: 100%; }

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ui-space-2, 0.5rem);
        cursor: pointer;
        font-family: inherit;
        font-weight: var(--ui-weight-medium, 500);
        border-radius: var(--ui-radius-md, 0.5rem);
        transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s, opacity 0.15s;
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        line-height: 1;
        width: 100%;
        text-align: center;
      }

      /* Sizes */
      button.size-xs { padding: 0.25rem 0.5rem;   font-size: var(--ui-text-xs, 0.75rem); }
      button.size-sm { padding: 0.375rem 0.75rem;  font-size: var(--ui-text-sm, 0.875rem); }
      button.size-md { padding: 0.5rem 1rem;       font-size: var(--ui-text-sm, 0.875rem); }
      button.size-lg { padding: 0.625rem 1.25rem;  font-size: var(--ui-text-base, 1rem); }
      button.size-xl { padding: 0.75rem 1.5rem;    font-size: var(--ui-text-lg, 1.125rem); }

      /* Variant: filled */
      button.variant-filled {
        background: var(--_btn-bg, var(--ui-color-primary, #4f46e5));
        color: #fff;
      }
      button.variant-filled:hover:not(:disabled) {
        filter: brightness(0.9);
      }

      /* Variant: outlined */
      button.variant-outlined {
        background: transparent;
        color: var(--_btn-bg, var(--ui-color-primary, #4f46e5));
        box-shadow: inset 0 0 0 1px currentColor;
      }
      button.variant-outlined:hover:not(:disabled) {
        background: color-mix(in srgb, var(--_btn-bg, var(--ui-color-primary, #4f46e5)) 8%, transparent);
      }

      /* Variant: ghost */
      button.variant-ghost {
        background: transparent;
        color: var(--_btn-bg, var(--ui-color-primary, #4f46e5));
      }
      button.variant-ghost:hover:not(:disabled) {
        background: color-mix(in srgb, var(--_btn-bg, var(--ui-color-primary, #4f46e5)) 10%, transparent);
      }

      /* Variant: link */
      button.variant-link {
        background: transparent;
        color: var(--_btn-bg, var(--ui-color-primary, #4f46e5));
        padding-inline: 0;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      /* Color mappings */
      :host([color="primary"])   button { --_btn-bg: var(--ui-color-primary, #4f46e5); }
      :host([color="secondary"]) button { --_btn-bg: var(--ui-color-secondary, #7c3aed); }
      :host([color="neutral"])   button { --_btn-bg: var(--ui-color-neutral, #64748b); }
      :host([color="success"])   button { --_btn-bg: var(--ui-color-success, #16a34a); }
      :host([color="warning"])   button { --_btn-bg: var(--ui-color-warning, #d97706); }
      :host([color="error"])     button { --_btn-bg: var(--ui-color-error, #dc2626); }
      :host([color="info"])      button { --_btn-bg: var(--ui-color-info, #2563eb); }

      /* Disabled */
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Loading spinner */
      .spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* Focus ring */
      button:focus-visible {
        outline: 2px solid var(--ui-color-primary, #4f46e5);
        outline-offset: 2px;
      }
    `}template(){const e=this.getAttr("variant","filled"),t=this.getAttr("size","md"),r=this.getBoolAttr("disabled")||this.getBoolAttr("loading"),o=this.getBoolAttr("loading");return`
      <button
        class="variant-${e} size-${t}"
        ${r?"disabled":""}
        role="button"
        part="button"
      >
        ${o?'<span class="spinner" aria-hidden="true"></span>':""}
        <slot></slot>
      </button>
    `}onRendered(){var e;(e=this.$("button"))==null||e.addEventListener("click",t=>{(this.getBoolAttr("disabled")||this.getBoolAttr("loading"))&&(t.stopPropagation(),t.preventDefault())})}}a(z,"observedAttributes",["variant","size","color","disabled","loading","full-width"]);n("ui-button",z);class E extends l{get value(){const e=this.$("input");return e?e.value:this.getAttr("value")}set value(e){this.setAttribute("value",e);const t=this.$("input");t&&(t.value=e)}styles(){return`
      :host { display: block; }

      .field { display: flex; flex-direction: column; gap: 0.25rem; }

      label {
        font-size: var(--ui-text-sm, 0.875rem);
        font-weight: var(--ui-weight-medium, 500);
        color: var(--ui-color-text, #0f172a);
      }
      :host([error]) label { color: var(--ui-color-error, #dc2626); }

      .input-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

      input {
        width: 100%;
        font-family: inherit;
        color: var(--ui-color-text, #0f172a);
        background: var(--ui-color-surface, #fff);
        border: 1px solid var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-md, 0.5rem);
        transition: border-color 0.15s, box-shadow 0.15s;
        outline: none;
      }

      /* Sizes */
      input.size-xs { padding: 0.25rem 0.5rem;   font-size: var(--ui-text-xs, 0.75rem); }
      input.size-sm { padding: 0.375rem 0.625rem; font-size: var(--ui-text-sm, 0.875rem); }
      input.size-md { padding: 0.5rem 0.75rem;    font-size: var(--ui-text-sm, 0.875rem); }
      input.size-lg { padding: 0.625rem 1rem;     font-size: var(--ui-text-base, 1rem); }
      input.size-xl { padding: 0.75rem 1.25rem;   font-size: var(--ui-text-lg, 1.125rem); }

      /* Variants */
      input.variant-outlined {
        background: transparent;
      }
      input.variant-filled {
        background: var(--ui-color-surface-variant, #f8fafc);
        border-color: transparent;
      }
      input.variant-underlined {
        border: none;
        border-bottom: 1px solid var(--ui-color-border, #e2e8f0);
        border-radius: 0;
        background: transparent;
      }

      /* States */
      input:focus {
        border-color: var(--ui-color-primary, #4f46e5);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-color-primary, #4f46e5) 15%, transparent);
      }
      input.variant-underlined:focus {
        box-shadow: none;
        border-bottom-color: var(--ui-color-primary, #4f46e5);
      }

      :host([error]) input {
        border-color: var(--ui-color-error, #dc2626);
      }
      :host([error]) input:focus {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-color-error, #dc2626) 15%, transparent);
      }

      :host([disabled]) input {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--ui-color-surface-variant, #f8fafc);
      }

      .helper {
        font-size: var(--ui-text-xs, 0.75rem);
        color: var(--ui-color-text-secondary, #64748b);
        margin: 0;
      }
      :host([error]) .helper { color: var(--ui-color-error, #dc2626); }
    `}template(){const e=this.getAttr("variant","outlined"),t=this.getAttr("size","md"),r=this.getAttr("label"),o=this.getAttr("placeholder"),i=this.getAttr("value"),d=this.getAttr("type","text"),c=this.getAttr("helper-text"),p=this.getBoolAttr("disabled"),u=this.getBoolAttr("readonly"),h=this.getBoolAttr("required");return`
      <div class="field" part="field">
        ${r?`<label part="label">${r}${h?' <span aria-hidden="true">*</span>':""}</label>`:""}
        <div class="input-wrap">
          <input
            class="variant-${e} size-${t}"
            type="${d}"
            ${o?`placeholder="${o}"`:""}
            ${i?`value="${i}"`:""}
            ${p?"disabled":""}
            ${u?"readonly":""}
            ${h?"required":""}
            part="input"
          />
        </div>
        ${c?`<p class="helper" part="helper">${c}</p>`:""}
      </div>
    `}onRendered(){const e=this.$("input");e&&(e.addEventListener("input",()=>{this.emit("ui-input",{value:e.value})}),e.addEventListener("change",()=>{this.emit("ui-change",{value:e.value})}))}}a(E,"observedAttributes",["variant","size","label","placeholder","value","type","helper-text","disabled","readonly","error","required"]);n("ui-text-field",E);class S extends l{get value(){const e=this.$("select");return e?e.value:this.getAttr("value")}set value(e){this.setAttribute("value",e);const t=this.$("select");t&&(t.value=e)}styles(){return`
      :host { display: block; }
      .field { display: flex; flex-direction: column; gap: 0.25rem; }

      label {
        font-size: var(--ui-text-sm, 0.875rem);
        font-weight: var(--ui-weight-medium, 500);
        color: var(--ui-color-text, #0f172a);
      }
      :host([error]) label { color: var(--ui-color-error, #dc2626); }

      select {
        width: 100%;
        font-family: inherit;
        color: var(--ui-color-text, #0f172a);
        background: var(--ui-color-surface, #fff);
        border: 1px solid var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-md, 0.5rem);
        outline: none;
        cursor: pointer;
        transition: border-color 0.15s;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        padding-right: 2.5rem;
      }

      select.size-xs { padding: 0.25rem 0.5rem;   font-size: var(--ui-text-xs); }
      select.size-sm { padding: 0.375rem 0.625rem; font-size: var(--ui-text-sm); }
      select.size-md { padding: 0.5rem 0.75rem;    font-size: var(--ui-text-sm); }
      select.size-lg { padding: 0.625rem 1rem;     font-size: var(--ui-text-base); }
      select.size-xl { padding: 0.75rem 1.25rem;   font-size: var(--ui-text-lg); }

      select:focus {
        border-color: var(--ui-color-primary, #4f46e5);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-color-primary) 15%, transparent);
      }

      :host([error]) select { border-color: var(--ui-color-error, #dc2626); }
      :host([disabled]) select { opacity: 0.5; cursor: not-allowed; }

      .helper {
        font-size: var(--ui-text-xs, 0.75rem);
        color: var(--ui-color-text-secondary, #64748b);
        margin: 0;
      }
      :host([error]) .helper { color: var(--ui-color-error); }
    `}template(){const e=this.getAttr("size","md"),t=this.getAttr("label"),r=this.getAttr("placeholder"),o=this.getAttr("value"),i=this.getAttr("helper-text"),d=this.getBoolAttr("disabled"),c=this.getBoolAttr("multiple"),p=Array.from(this.querySelectorAll("option")).map(u=>`<option value="${u.value}" ${u.value===o?"selected":""} ${u.disabled?"disabled":""}>${u.textContent}</option>`).join("");return`
      <div class="field" part="field">
        ${t?`<label part="label">${t}</label>`:""}
        <select
          class="size-${e}"
          ${d?"disabled":""}
          ${c?"multiple":""}
          part="select"
        >
          ${r?`<option value="" disabled selected hidden>${r}</option>`:""}
          ${p}
        </select>
        ${i?`<p class="helper" part="helper">${i}</p>`:""}
      </div>
    `}onRendered(){var e;(e=this.$("select"))==null||e.addEventListener("change",t=>{const r=t.target;this.emit("ui-change",{value:r.value})})}}a(S,"observedAttributes",["size","label","placeholder","value","helper-text","disabled","error","multiple"]);n("ui-select",S);class L extends l{get checked(){return this.getBoolAttr("checked")}set checked(e){e?this.setAttribute("checked",""):this.removeAttribute("checked")}styles(){return`
      :host { display: inline-flex; align-items: center; gap: var(--ui-space-2, 0.5rem); cursor: pointer; }
      :host([disabled]) { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

      .box {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--ui-color-border-strong, #cbd5e1);
        border-radius: var(--ui-radius-sm, 0.25rem);
        transition: background 0.15s, border-color 0.15s;
        flex-shrink: 0;
      }
      .box.size-xs { width: 14px; height: 14px; }
      .box.size-sm { width: 16px; height: 16px; }
      .box.size-md { width: 18px; height: 18px; }
      .box.size-lg { width: 20px; height: 20px; }
      .box.size-xl { width: 24px; height: 24px; }

      .box.checked, .box.indeterminate {
        background: var(--_cb-color, var(--ui-color-primary, #4f46e5));
        border-color: var(--_cb-color, var(--ui-color-primary, #4f46e5));
      }

      .check { display: none; color: #fff; line-height: 1; font-size: 0.7em; }
      .box.checked .check { display: inline; }
      .box.indeterminate .dash { display: inline; }
      .dash { display: none; width: 60%; height: 2px; background: #fff; border-radius: 1px; }

      :host([color="primary"])   .box { --_cb-color: var(--ui-color-primary); }
      :host([color="secondary"]) .box { --_cb-color: var(--ui-color-secondary); }
      :host([color="success"])   .box { --_cb-color: var(--ui-color-success); }
      :host([color="error"])     .box { --_cb-color: var(--ui-color-error); }
      :host([color="warning"])   .box { --_cb-color: var(--ui-color-warning); }
      :host([color="info"])      .box { --_cb-color: var(--ui-color-info); }

      label { font-size: var(--ui-text-sm, 0.875rem); color: var(--ui-color-text, #0f172a); cursor: inherit; user-select: none; }

      /* Focus */
      :host(:focus-visible) .box {
        outline: 2px solid var(--ui-color-primary, #4f46e5);
        outline-offset: 2px;
      }
    `}template(){const e=this.getAttr("size","md"),t=this.getBoolAttr("checked"),r=this.getBoolAttr("indeterminate"),o=this.getAttr("label");return`
      <span class="box ${`${e?`size-${e}`:""} ${t?"checked":""} ${r&&!t?"indeterminate":""}`.trim()}" part="box" role="checkbox" aria-checked="${r?"mixed":String(t)}" tabindex="0">
        <span class="check" aria-hidden="true">✓</span>
        <span class="dash" aria-hidden="true"></span>
      </span>
      ${o?`<label part="label">${o}</label>`:"<slot></slot>"}
    `}onConnected(){this.setAttribute("role","checkbox"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}onRendered(){const e=this.$(".box"),t=()=>{this.getBoolAttr("disabled")||(this.checked=!this.checked,this.removeAttribute("indeterminate"),this.render(),this.emit("ui-change",{checked:this.checked}))};e==null||e.addEventListener("click",t),e==null||e.addEventListener("keydown",r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),t())})}}a(L,"observedAttributes",["checked","indeterminate","disabled","size","color","label"]);n("ui-checkbox",L);class B extends l{get checked(){return this.getBoolAttr("checked")}set checked(e){e?this.setAttribute("checked",""):this.removeAttribute("checked")}styles(){return`
      :host { display: inline-flex; align-items: center; gap: var(--ui-space-2, 0.5rem); cursor: pointer; }
      :host([disabled]) { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

      .track {
        position: relative;
        border-radius: var(--ui-radius-full, 9999px);
        background: var(--ui-color-border-strong, #cbd5e1);
        transition: background 0.2s;
        flex-shrink: 0;
      }
      .track.checked {
        background: var(--_sw-color, var(--ui-color-primary, #4f46e5));
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
      }

      /* Sizes */
      .track.size-sm { width: 32px; height: 18px; }
      .track.size-sm .thumb { width: 14px; height: 14px; }
      .track.size-sm.checked .thumb { transform: translateX(14px); }

      .track.size-md { width: 40px; height: 22px; }
      .track.size-md .thumb { width: 18px; height: 18px; }
      .track.size-md.checked .thumb { transform: translateX(18px); }

      .track.size-lg { width: 52px; height: 28px; }
      .track.size-lg .thumb { width: 24px; height: 24px; }
      .track.size-lg.checked .thumb { transform: translateX(24px); }

      :host([color="primary"])   .track { --_sw-color: var(--ui-color-primary); }
      :host([color="secondary"]) .track { --_sw-color: var(--ui-color-secondary); }
      :host([color="success"])   .track { --_sw-color: var(--ui-color-success); }
      :host([color="error"])     .track { --_sw-color: var(--ui-color-error); }

      label { font-size: var(--ui-text-sm); color: var(--ui-color-text); user-select: none; cursor: inherit; }

      :host(:focus-visible) .track { outline: 2px solid var(--ui-color-primary); outline-offset: 2px; }
    `}template(){const e=this.getAttr("size","md"),t=this.getBoolAttr("checked"),r=this.getAttr("label");return`
      <span class="track size-${e} ${t?"checked":""}" role="switch" aria-checked="${t}" tabindex="0" part="track">
        <span class="thumb" part="thumb"></span>
      </span>
      ${r?`<label part="label">${r}</label>`:"<slot></slot>"}
    `}onConnected(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.setAttribute("role","switch")}onRendered(){const e=this.$(".track"),t=()=>{this.getBoolAttr("disabled")||(this.checked=!this.checked,this.render(),this.emit("ui-change",{checked:this.checked}))};e==null||e.addEventListener("click",t),e==null||e.addEventListener("keydown",r=>{const o=r.key;(o===" "||o==="Enter")&&(r.preventDefault(),t())})}}a(B,"observedAttributes",["checked","disabled","size","color","label"]);n("ui-switch",B);class N extends l{get value(){return this.getNumAttr("value",50)}set value(e){this.setAttribute("value",String(e))}styles(){return`
      :host { display: block; }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        background: transparent;
        cursor: pointer;
      }

      /* Track */
      input[type="range"]::-webkit-slider-runnable-track {
        height: var(--_track-h, 6px);
        background: var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-full, 9999px);
      }
      input[type="range"]::-moz-range-track {
        height: var(--_track-h, 6px);
        background: var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-full, 9999px);
      }

      /* Thumb */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: var(--_thumb-sz, 18px);
        height: var(--_thumb-sz, 18px);
        border-radius: 50%;
        background: var(--_sl-color, var(--ui-color-primary, #4f46e5));
        margin-top: calc((var(--_track-h, 6px) - var(--_thumb-sz, 18px)) / 2);
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        transition: transform 0.1s;
      }
      input[type="range"]::-moz-range-thumb {
        width: var(--_thumb-sz, 18px);
        height: var(--_thumb-sz, 18px);
        border: none;
        border-radius: 50%;
        background: var(--_sl-color, var(--ui-color-primary, #4f46e5));
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
      }

      /* Sizes */
      :host([size="sm"]) input { --_track-h: 4px; --_thumb-sz: 14px; }
      :host([size="md"]) input, input { --_track-h: 6px; --_thumb-sz: 18px; }
      :host([size="lg"]) input { --_track-h: 8px; --_thumb-sz: 22px; }

      :host([color="primary"])   input { --_sl-color: var(--ui-color-primary); }
      :host([color="secondary"]) input { --_sl-color: var(--ui-color-secondary); }
      :host([color="success"])   input { --_sl-color: var(--ui-color-success); }
      :host([color="error"])     input { --_sl-color: var(--ui-color-error); }

      input:focus-visible { outline: 2px solid var(--ui-color-primary); outline-offset: 4px; }
    `}template(){const e=this.getNumAttr("min",0),t=this.getNumAttr("max",100),r=this.getNumAttr("step",1),o=this.getNumAttr("value",50),i=this.getBoolAttr("disabled");return`
      <input
        type="range"
        min="${e}" max="${t}" step="${r}" value="${o}"
        ${i?"disabled":""}
        part="input"
      />
    `}onRendered(){const e=this.$("input");e&&(e.addEventListener("input",()=>{this.emit("ui-input",{value:Number(e.value)})}),e.addEventListener("change",()=>{this.emit("ui-change",{value:Number(e.value)})}))}}a(N,"observedAttributes",["min","max","step","value","disabled","size","color"]);n("ui-slider",N);class C extends l{styles(){return`
      :host { display: inline-flex; }
      label { display:inline-flex; align-items:center; gap:.5rem; cursor:pointer; color:var(--ui-color-text); }
      input { width:1rem; height:1rem; margin:0; accent-color:var(--ui-color-primary,#4f46e5); }
      input:disabled + span { opacity:.5; cursor:not-allowed; }
      input:focus-visible { outline:2px solid var(--ui-color-primary,#4f46e5); outline-offset:2px; }
    `}template(){return`<label><input type="radio" name="${this.getAttr("name")}" value="${this.getAttr("value")}"
      ${this.getBoolAttr("checked")?"checked":""} ${this.getBoolAttr("disabled")?"disabled":""} />
      <span>${this.getAttr("label")}<slot></slot></span></label>`}onRendered(){var e;(e=this.$("input"))==null||e.addEventListener("change",t=>{const r=t.currentTarget;this.toggleAttribute("checked",r.checked),this.emit("ui-change",{checked:r.checked,value:r.value})})}}a(C,"observedAttributes",["checked","disabled","value","name","label"]);class I extends l{constructor(){super(...arguments);a(this,"handleChange",t=>{const r=t.target;if(!r.matches("ui-radio"))return;const o=r.getAttribute("value")??"";this.setAttribute("value",o),this.querySelectorAll("ui-radio").forEach(i=>i.toggleAttribute("checked",i===r)),this.emit("ui-change",{value:o})})}styles(){return`
      :host { display:grid; gap:.5rem; }
      fieldset { border:0; padding:0; margin:0; display:flex; gap:.75rem; flex-direction:column; }
      :host([orientation="horizontal"]) fieldset { flex-direction:row; flex-wrap:wrap; }
      legend { font-size:var(--ui-text-sm,.875rem); font-weight:600; margin-bottom:.5rem; }
    `}template(){return`<fieldset ${this.getBoolAttr("disabled")?"disabled":""}><legend>${this.getAttr("label")}</legend><slot></slot></fieldset>`}onConnected(){this.addEventListener("ui-change",this.handleChange)}onDisconnected(){this.removeEventListener("ui-change",this.handleChange)}}a(I,"observedAttributes",["label","value","disabled","orientation"]);n("ui-radio",C);n("ui-radio-group",I);class T extends l{styles(){return`
      :host { display:block; }
      label { display:grid; gap:.375rem; font-size:var(--ui-text-sm,.875rem); }
      textarea { width:100%; resize:vertical; min-height:5rem; padding:.625rem .75rem; color:var(--ui-color-text); background:var(--ui-color-surface); border:1px solid var(--ui-color-border,#cbd5e1); border-radius:var(--ui-radius-md,.5rem); font:inherit; line-height:1.45; }
      textarea:focus { outline:2px solid color-mix(in srgb,var(--ui-color-primary,#4f46e5) 30%,transparent); border-color:var(--ui-color-primary,#4f46e5); }
      :host([error]) textarea { border-color:var(--ui-color-error,#dc2626); }
      .meta { display:flex; justify-content:space-between; color:var(--ui-color-text-secondary,#64748b); font-size:var(--ui-text-xs,.75rem); }
    `}template(){const e=this.getAttr("value"),t=this.getNumAttr("max-length",0);return`<label><span>${this.getAttr("label")}</span><textarea rows="${this.getNumAttr("rows",4)}" placeholder="${this.getAttr("placeholder")}" ${this.getBoolAttr("disabled")?"disabled":""} ${this.getBoolAttr("readonly")?"readonly":""} ${t?`maxlength="${t}"`:""}>${e}</textarea><span class="meta"><span>${this.getAttr("helper-text")}</span><span class="count">${t?`${e.length}/${t}`:""}</span></span></label>`}onRendered(){const e=this.$("textarea");e==null||e.addEventListener("input",()=>{const t=this.$(".count"),r=this.getNumAttr("max-length",0);t&&r&&(t.textContent=`${e.value.length}/${r}`),this.emit("ui-input",{value:e.value})}),e==null||e.addEventListener("change",()=>this.emit("ui-change",{value:e.value}))}}a(T,"observedAttributes",["label","placeholder","value","rows","disabled","readonly","error","helper-text","max-length"]);n("ui-textarea",T);class R extends l{constructor(){super(...arguments);a(this,"_options",[]);a(this,"open",!1);a(this,"activeIndex",-1)}set options(t){this._options=Array.isArray(t)?t:[],this.render()}get options(){if(this._options.length)return this._options;try{return JSON.parse(this.getAttr("options","[]"))}catch{return[]}}styles(){return`
      :host { display:block; position:relative; }
      label { display:grid; gap:.375rem; font-size:var(--ui-text-sm,.875rem); }
      input { width:100%; padding:.625rem .75rem; color:var(--ui-color-text); background:var(--ui-color-surface); border:1px solid var(--ui-color-border,#cbd5e1); border-radius:var(--ui-radius-md,.5rem); font:inherit; }
      input:focus { outline:2px solid color-mix(in srgb,var(--ui-color-primary,#4f46e5) 30%,transparent); border-color:var(--ui-color-primary,#4f46e5); }
      [role=listbox] { position:absolute; z-index:40; inset:calc(100% + .25rem) 0 auto; max-height:16rem; overflow:auto; padding:.25rem; background:var(--ui-color-surface); border:1px solid var(--ui-color-border,#cbd5e1); border-radius:var(--ui-radius-md,.5rem); box-shadow:0 12px 30px rgb(0 0 0/.22); }
      [role=option] { display:grid; gap:.1rem; padding:.55rem .65rem; border-radius:var(--ui-radius-sm,.25rem); cursor:pointer; }
      [role=option][aria-selected=true] { background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 14%,transparent); }
      small { color:var(--ui-color-text-secondary,#64748b); }
    `}template(){return`<label><span>${this.getAttr("label")}</span><input role="combobox" aria-autocomplete="list" aria-expanded="${this.open}" placeholder="${this.getAttr("placeholder")}" value="${this.getAttr("value")}" ${this.getBoolAttr("disabled")?"disabled":""}/></label><div role="listbox" ${this.open?"":"hidden"}></div>`}show(t=""){this.open=!0;const r=this.$("[role=listbox]"),o=this.options.filter(i=>`${i.label} ${i.description??""}`.toLowerCase().includes(t.toLowerCase()));r&&(r.hidden=!1,r.innerHTML=o.map((i,d)=>`<div role="option" tabindex="-1" data-value="${i.value}" aria-selected="${d===this.activeIndex}"><strong>${i.label}</strong>${i.description?`<small>${i.description}</small>`:""}</div>`).join("")||'<div role="option" aria-disabled="true">No results</div>',r.querySelectorAll("[data-value]").forEach(i=>i.addEventListener("mousedown",d=>{var c;d.preventDefault(),this.select(i.dataset.value??"",((c=i.querySelector("strong"))==null?void 0:c.textContent)??"")})))}select(t,r){this.setAttribute("value",r),this.open=!1,this.$("[role=listbox]").hidden=!0,this.emit("ui-change",{value:t,label:r})}onRendered(){const t=this.$("input");t==null||t.addEventListener("focus",()=>this.show(t.value)),t==null||t.addEventListener("input",()=>{this.activeIndex=-1,this.show(t.value),this.emit("ui-input",{value:t.value})}),t==null||t.addEventListener("blur",()=>setTimeout(()=>{this.open=!1;const r=this.$("[role=listbox]");r&&(r.hidden=!0)},80)),t==null||t.addEventListener("keydown",r=>{var i;const o=Array.from(this.root.querySelectorAll("[data-value]"));if((r.key==="ArrowDown"||r.key==="ArrowUp")&&(r.preventDefault(),this.activeIndex=Math.max(0,Math.min(o.length-1,this.activeIndex+(r.key==="ArrowDown"?1:-1))),this.show(t.value)),r.key==="Enter"&&this.activeIndex>=0&&o[this.activeIndex]){r.preventDefault();const d=o[this.activeIndex];this.select(d.dataset.value??"",((i=d.querySelector("strong"))==null?void 0:i.textContent)??"")}if(r.key==="Escape"){this.open=!1;const d=this.$("[role=listbox]");d&&(d.hidden=!0)}})}}a(R,"observedAttributes",["label","placeholder","value","disabled","options"]);n("ui-autocomplete",R);class j extends l{styles(){return":host{display:inline-flex}button{all:unset;cursor:pointer;padding:.5rem .75rem;border:1px solid var(--ui-color-border,#cbd5e1);color:var(--ui-color-text);background:var(--ui-color-surface);font:inherit;font-size:.875rem}button[aria-pressed=true]{color:var(--ui-color-primary,#4f46e5);background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 15%,transparent);border-color:var(--ui-color-primary,#4f46e5)}button:focus-visible{outline:2px solid var(--ui-color-primary,#4f46e5);outline-offset:2px}button:disabled{opacity:.5;cursor:not-allowed}"}template(){return`<button type="button" aria-pressed="${this.getBoolAttr("selected")}" ${this.getBoolAttr("disabled")?"disabled":""}><slot></slot></button>`}onRendered(){var e;(e=this.$("button"))==null||e.addEventListener("click",()=>{const t=!this.getBoolAttr("selected");this.toggleAttribute("selected",t),this.emit("ui-change",{selected:t,value:this.getAttr("value")})})}}a(j,"observedAttributes",["selected","disabled","value"]);class D extends l{constructor(){super(...arguments);a(this,"handleChange",t=>{const r=t.target;r.matches("ui-toggle-button")&&this.getBoolAttr("exclusive")&&(this.querySelectorAll("ui-toggle-button").forEach(o=>o.toggleAttribute("selected",o===r)),this.setAttribute("value",r.getAttribute("value")??""))})}styles(){return":host{display:inline-flex}:host([orientation=vertical]){display:inline-grid}::slotted(ui-toggle-button:not(:first-child)){margin-left:-1px}"}template(){return'<div role="group"><slot></slot></div>'}onConnected(){this.addEventListener("ui-change",this.handleChange)}onDisconnected(){this.removeEventListener("ui-change",this.handleChange)}}a(D,"observedAttributes",["exclusive","value","orientation"]);n("ui-toggle-button",j);n("ui-toggle-button-group",D);class q extends l{styles(){return":host{display:inline-flex}button{all:unset;display:grid;place-items:center;width:var(--_size,2.5rem);height:var(--_size,2.5rem);border-radius:50%;cursor:pointer;color:var(--_color,var(--ui-color-text));background:var(--_bg,transparent);border:1px solid var(--_border,transparent)}:host([size=sm]){--_size:2rem}:host([size=lg]){--_size:3rem}:host([variant=filled]){--_bg:var(--ui-color-primary,#4f46e5);--_color:#fff}:host([variant=outlined]){--_border:var(--ui-color-border,#cbd5e1)}button:hover{background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 12%,var(--_bg,transparent))}button:focus-visible{outline:2px solid var(--ui-color-primary,#4f46e5);outline-offset:2px}button:disabled{opacity:.45;cursor:not-allowed}"}template(){return`<button type="button" aria-label="${this.getAttr("label","Action")}" ${this.getBoolAttr("disabled")?"disabled":""}><slot></slot></button>`}}a(q,"observedAttributes",["label","size","variant","color","disabled","loading"]);n("ui-icon-button",q);class M extends l{styles(){return":host{display:inline-grid;gap:.375rem}label{font-size:.875rem;font-weight:600}.control{display:flex;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:var(--ui-radius-md,.5rem);overflow:hidden;background:var(--ui-color-surface)}input{width:7rem;min-width:0;padding:.55rem .65rem;border:0;outline:0;background:transparent;color:var(--ui-color-text);font:inherit;text-align:right}button{width:2.25rem;border:0;background:transparent;color:var(--ui-color-text);cursor:pointer;font-size:1rem}button:hover{background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 10%,transparent)}button:disabled{opacity:.45;cursor:not-allowed}small{color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<label>${this.getAttr("label")}</label><div class="control"><button class="dec" type="button" aria-label="Decrease" ${this.getBoolAttr("disabled")||this.getBoolAttr("readonly")?"disabled":""}>−</button><input type="number" value="${this.getNumAttr("value",0)}" min="${this.getAttr("min")}" max="${this.getAttr("max")}" step="${this.getNumAttr("step",1)}" ${this.getBoolAttr("disabled")?"disabled":""} ${this.getBoolAttr("readonly")?"readonly":""}/><button class="inc" type="button" aria-label="Increase" ${this.getBoolAttr("disabled")||this.getBoolAttr("readonly")?"disabled":""}>+</button></div><small>${this.getAttr("helper-text")}</small>`}onRendered(){var r,o;const e=this.$("input"),t=i=>{const d=this.getNumAttr("min",-1/0),c=this.getNumAttr("max",1/0),p=this.getNumAttr("precision",0),h=Math.min(c,Math.max(d,i)).toFixed(p);this.setAttribute("value",h),this.emit("ui-change",{value:Number(h)})};(r=this.$(".dec"))==null||r.addEventListener("click",()=>t(((e==null?void 0:e.valueAsNumber)||0)-this.getNumAttr("step",1))),(o=this.$(".inc"))==null||o.addEventListener("click",()=>t(((e==null?void 0:e.valueAsNumber)||0)+this.getNumAttr("step",1))),e==null||e.addEventListener("change",()=>t(e.valueAsNumber))}}a(M,"observedAttributes",["label","value","min","max","step","precision","disabled","readonly","helper-text"]);n("ui-number-input",M);class F extends l{styles(){return":host{display:inline-grid;gap:.25rem}.stars{display:flex;gap:.15rem}button{all:unset;cursor:pointer;font-size:1.4rem;line-height:1;color:var(--ui-color-border,#cbd5e1)}button.on{color:var(--ui-color-warning,#f59e0b)}button:focus-visible{outline:2px solid var(--ui-color-primary,#4f46e5);outline-offset:2px}button:disabled{cursor:default}small{color:var(--ui-color-text-secondary,#64748b)}"}template(){const e=this.getNumAttr("value",0),t=this.getNumAttr("max",5);return`<span class="stars" role="radiogroup" aria-label="${this.getAttr("label","Rating")}">${Array.from({length:t},(r,o)=>`<button type="button" class="${o<e?"on":""}" role="radio" aria-checked="${o+1===e}" data-value="${o+1}" ${this.getBoolAttr("readonly")||this.getBoolAttr("disabled")?"disabled":""}>★</button>`).join("")}</span><small>${e} of ${t}</small>`}onRendered(){this.$$("button").forEach(e=>e.addEventListener("click",()=>{const t=Number(e.dataset.value);this.setAttribute("value",String(t)),this.emit("ui-change",{value:t})}))}}a(F,"observedAttributes",["value","max","label","readonly","disabled"]);n("ui-rating",F);class P extends l{styles(){return":host{display:inline-flex}:host([full-width]){display:flex;width:100%}.group{display:flex;flex-direction:var(--_direction,row);width:100%}:host([orientation=vertical]){--_direction:column}:host([attached]) ::slotted(ui-button:not(:first-child)),:host([attached]) ::slotted(ui-icon-button:not(:first-child)){margin-left:-1px}"}template(){return'<div class="group" role="group"><slot></slot></div>'}}a(P,"observedAttributes",["orientation","attached","full-width"]);n("ui-button-group",P);class H extends l{constructor(){super(...arguments);a(this,"_tags",[])}set tags(t){this._tags=Array.isArray(t)?t:[],this.render()}get tags(){return this._tags}styles(){return":host{display:grid;gap:.35rem}label{font-size:.875rem;font-weight:600}.control{display:flex;align-items:center;flex-wrap:wrap;gap:.35rem;min-height:2.6rem;padding:.35rem;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:var(--ui-color-surface)}.tag{display:inline-flex;align-items:center;gap:.25rem;padding:.2rem .45rem;border-radius:999px;background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 14%,transparent);font-size:.8rem}.tag button{all:unset;cursor:pointer}input{flex:1;min-width:8rem;padding:.25rem;border:0;outline:0;background:transparent;color:var(--ui-color-text);font:inherit}"}template(){return`<label>${this.getAttr("label")}</label><div class="control">${this.tags.map((t,r)=>`<span class="tag">${t}<button type="button" data-index="${r}" aria-label="Remove ${t}">×</button></span>`).join("")}<input placeholder="${this.getAttr("placeholder")}" ${this.getBoolAttr("disabled")?"disabled":""}/></div>`}onRendered(){const t=this.$("input");t==null||t.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===",")&&t.value.trim()&&(r.preventDefault(),this.addTag(t.value.trim())),r.key==="Backspace"&&!t.value&&this.tags.length&&this.removeTag(this.tags.length-1)}),this.$$("[data-index]").forEach(r=>r.addEventListener("click",()=>this.removeTag(Number(r.dataset.index))))}addTag(t){this.tags.length>=this.getNumAttr("max-tags",1/0)||!this.getBoolAttr("allow-duplicates")&&this.tags.includes(t)||(this._tags=[...this.tags,t],this.render(),this.emit("ui-change",{tags:this.tags}))}removeTag(t){this._tags=this.tags.filter((r,o)=>o!==t),this.render(),this.emit("ui-change",{tags:this.tags})}}a(H,"observedAttributes",["label","placeholder","disabled","max-tags","allow-duplicates"]);n("ui-tag-input",H);class W extends l{styles(){return":host{display:grid;gap:.4rem}label{font-size:.875rem;font-weight:600}.cells{display:flex;gap:.45rem}input{width:2.5rem;height:2.8rem;text-align:center;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.45rem;background:var(--ui-color-surface);color:var(--ui-color-text);font:600 1.1rem var(--ui-font-mono,monospace)}input:focus{outline:2px solid color-mix(in srgb,var(--ui-color-primary,#4f46e5) 28%,transparent);border-color:var(--ui-color-primary,#4f46e5)}"}template(){const e=this.getNumAttr("length",6),t=this.getAttr("value");return`<label>${this.getAttr("label")}</label><div class="cells">${Array.from({length:e},(r,o)=>`<input aria-label="Character ${o+1} of ${e}" maxlength="1" value="${t[o]??""}" inputmode="${this.getBoolAttr("numeric")?"numeric":"text"}" type="${this.getBoolAttr("masked")?"password":"text"}" ${this.getBoolAttr("disabled")?"disabled":""}/>`).join("")}</div>`}onRendered(){const e=this.$$("input"),t=()=>{const r=e.map(o=>o.value).join("");this.setAttribute("value",r),this.emit("ui-change",{value:r,complete:r.length===e.length})};e.forEach((r,o)=>{r.addEventListener("input",()=>{var i;this.getBoolAttr("numeric")&&(r.value=r.value.replace(/\D/g,"")),r.value&&((i=e[o+1])==null||i.focus()),t()}),r.addEventListener("keydown",i=>{var d;i.key==="Backspace"&&!r.value&&((d=e[o-1])==null||d.focus())}),r.addEventListener("paste",i=>{var c,p;i.preventDefault();const d=((c=i.clipboardData)==null?void 0:c.getData("text").slice(0,e.length))??"";[...d].forEach((u,h)=>{e[h]&&(e[h].value=u)}),t(),(p=e[Math.min(d.length,e.length)-1])==null||p.focus()})})}}a(W,"observedAttributes",["label","length","value","numeric","disabled","masked"]);n("ui-otp-input",W);class X extends l{constructor(){super(...arguments);a(this,"dragging",!1)}styles(){return":host{display:block}.zone{display:grid;place-items:center;gap:.4rem;min-height:9rem;padding:1.25rem;text-align:center;border:1.5px dashed var(--ui-color-border,#cbd5e1);border-radius:.75rem;background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 3%,transparent);cursor:pointer}.zone.dragging{border-color:var(--ui-color-primary,#4f46e5);background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 10%,transparent)}strong{font-size:.95rem}small{color:var(--ui-color-text-secondary,#64748b)}input{position:absolute;inline-size:1px;block-size:1px;opacity:0}"}template(){return`<label class="zone ${this.dragging?"dragging":""}" tabindex="0"><strong>${this.getAttr("label","Drop files or browse")}</strong><small>${this.getAttr("description")}</small><input type="file" accept="${this.getAttr("accept")}" ${this.getBoolAttr("multiple")?"multiple":""} ${this.getBoolAttr("disabled")?"disabled":""}/></label>`}onRendered(){const t=this.$(".zone"),r=this.$("input"),o=i=>{const d=this.getNumAttr("max-size",1/0),c=i.filter(p=>p.size<=d);this.emit("ui-files",{files:c,rejected:i.filter(p=>!c.includes(p))})};r==null||r.addEventListener("change",()=>o(Array.from(r.files??[]))),t==null||t.addEventListener("dragover",i=>{i.preventDefault(),this.dragging=!0,t.classList.add("dragging")}),t==null||t.addEventListener("dragleave",()=>{this.dragging=!1,t.classList.remove("dragging")}),t==null||t.addEventListener("drop",i=>{var d;i.preventDefault(),this.dragging=!1,t.classList.remove("dragging"),o(Array.from(((d=i.dataTransfer)==null?void 0:d.files)??[]))}),t==null||t.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r==null||r.click())})}}a(X,"observedAttributes",["label","description","accept","multiple","disabled","max-size"]);n("ui-drop-zone",X);class A extends l{styles(){return":host{display:grid;gap:.35rem}label{font-size:.875rem;font-weight:600}input{padding:.58rem .7rem;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:var(--ui-color-surface);color:var(--ui-color-text);font:inherit;color-scheme:dark}input:focus{outline:2px solid color-mix(in srgb,var(--ui-color-primary,#4f46e5) 28%,transparent);border-color:var(--ui-color-primary,#4f46e5)}small{color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<label>${this.getAttr("label")}</label><input type="${this.inputType}" value="${this.getAttr("value")}" min="${this.getAttr("min")}" max="${this.getAttr("max")}" step="${this.getAttr("step")}" ${this.getBoolAttr("disabled")?"disabled":""} ${this.getBoolAttr("readonly")?"readonly":""}/><small>${this.getAttr("helper-text")}</small>`}onRendered(){const e=this.$("input");e==null||e.addEventListener("change",()=>{this.setAttribute("value",e.value),this.emit("ui-change",{value:e.value})})}}a(A,"observedAttributes",["label","value","min","max","step","disabled","readonly","helper-text"]);class me extends A{constructor(){super(...arguments);a(this,"inputType","date")}}class ge extends A{constructor(){super(...arguments);a(this,"inputType","time")}}n("ui-date-picker",me);n("ui-time-picker",ge);class U extends l{styles(){return":host{display:inline-grid;gap:.35rem}:host([full-width]){display:grid;width:100%}:host([disabled]){opacity:.55;pointer-events:none}"}template(){return`<div role="group" aria-required="${this.getBoolAttr("required")}" aria-invalid="${this.getBoolAttr("error")}"><slot></slot></div>`}}a(U,"observedAttributes",["disabled","error","required","full-width"]);n("ui-form-control",U);class V extends l{styles(){return":host{display:block;font-size:.875rem;font-weight:600;margin-bottom:.35rem}.required{color:var(--ui-color-error,#ef4444)}"}template(){return`<label><slot></slot>${this.getBoolAttr("required")?'<span class="required" aria-hidden="true"> *</span>':""}</label>`}}a(V,"observedAttributes",["required"]);n("ui-form-label",V);class ve extends l{styles(){return":host{display:block;margin-top:.3rem;color:var(--ui-color-text-secondary,#64748b);font-size:.75rem}"}template(){return"<span><slot></slot></span>"}}n("ui-form-helper",ve);class fe extends l{styles(){return":host{display:block;margin-top:.3rem;color:var(--ui-color-error,#ef4444);font-size:.75rem}"}template(){return'<span role="alert"><slot></slot></span>'}}n("ui-form-error",fe);class O extends l{styles(){return":host{display:block}.control{display:flex;align-items:center;gap:.45rem;padding:0 .65rem;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:var(--ui-color-surface)}input{flex:1;min-width:0;padding:.6rem 0;border:0;outline:0;background:transparent;color:var(--ui-color-text);font:inherit}button{all:unset;cursor:pointer;color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<div class="control"><span aria-hidden="true">⌕</span><input type="search" aria-label="${this.getAttr("label","Search")}" placeholder="${this.getAttr("placeholder")}" value="${this.getAttr("value")}" ${this.getBoolAttr("disabled")?"disabled":""}/>${this.getBoolAttr("clearable")?'<button type="button" aria-label="Clear search">×</button>':""}</div>`}onRendered(){var t;const e=this.$("input");e==null||e.addEventListener("input",()=>this.emit("ui-input",{value:e.value})),(t=this.$("button"))==null||t.addEventListener("click",()=>{e&&(e.value="",e.focus(),this.emit("ui-input",{value:""}))})}}a(O,"observedAttributes",["label","placeholder","value","disabled","clearable"]);n("ui-search-input",O);class Y extends l{constructor(){super(...arguments);a(this,"visible",!1)}styles(){return":host{display:grid;gap:.35rem}label{font-size:.875rem;font-weight:600}.control{display:flex;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:var(--ui-color-surface)}input{flex:1;min-width:0;padding:.6rem .7rem;border:0;outline:0;background:transparent;color:var(--ui-color-text);font:inherit}button{all:unset;padding:0 .65rem;cursor:pointer;color:var(--ui-color-text-secondary,#64748b)}.strength{height:3px;background:var(--ui-color-border)}.strength span{display:block;height:100%;width:var(--_strength);background:var(--_tone)}"}template(){const t=this.getAttr("value"),r=Math.min(100,t.length*12+(/[A-Z]/.test(t)?15:0)+(/\d/.test(t)?15:0));return`<label>${this.getAttr("label")}</label><div class="control"><input type="${this.visible?"text":"password"}" placeholder="${this.getAttr("placeholder")}" value="${t}" ${this.getBoolAttr("disabled")?"disabled":""} ${this.getBoolAttr("readonly")?"readonly":""}/><button type="button" aria-label="${this.visible?"Hide":"Show"} value">${this.visible?"Hide":"Show"}</button></div>${this.getBoolAttr("show-strength")?`<div class="strength" aria-label="Strength ${r}%"><span style="--_strength:${r}%;--_tone:${r>70?"var(--ui-color-success)":r>40?"var(--ui-color-warning)":"var(--ui-color-error)"}"></span></div>`:""}`}onRendered(){var r;const t=this.$("input");t==null||t.addEventListener("input",()=>{this.setAttribute("value",t.value),this.emit("ui-input",{value:t.value})}),(r=this.$("button"))==null||r.addEventListener("click",()=>{var o;this.visible=!this.visible,this.render(),(o=this.$("input"))==null||o.focus()})}}a(Y,"observedAttributes",["label","placeholder","value","disabled","readonly","show-strength"]);n("ui-password-input",Y);class K extends l{styles(){return":host{display:grid;gap:.35rem}label{font-size:.875rem;font-weight:600}.control{display:flex;align-items:center;gap:.55rem;padding:.35rem .55rem;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:var(--ui-color-surface)}input[type=color]{width:2rem;height:2rem;padding:0;border:0;background:transparent}code{font-size:.8rem;color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<label>${this.getAttr("label")}</label><div class="control"><input type="color" value="${this.getAttr("value","#3b82f6")}" ${this.getBoolAttr("disabled")?"disabled":""}/><code>${this.getAttr("value","#3b82f6")}</code></div>`}onRendered(){const e=this.$("input");e==null||e.addEventListener("input",()=>{this.setAttribute("value",e.value),this.emit("ui-change",{value:e.value})})}}a(K,"observedAttributes",["label","value","disabled","alpha"]);n("ui-color-input",K);class Q extends l{styles(){return`
      :host { display: inline-flex; }
      :host([disabled]) { opacity: 0.5; pointer-events: none; }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        border-radius: var(--ui-radius-full, 9999px);
        font-family: inherit;
        font-weight: var(--ui-weight-medium, 500);
        white-space: nowrap;
        transition: background 0.15s, color 0.15s;
      }

      .chip.size-xs { padding: 0.125rem 0.375rem; font-size: var(--ui-text-xs, 0.75rem); }
      .chip.size-sm { padding: 0.175rem 0.5rem;   font-size: var(--ui-text-xs, 0.75rem); }
      .chip.size-md { padding: 0.25rem 0.625rem;   font-size: var(--ui-text-sm, 0.875rem); }
      .chip.size-lg { padding: 0.375rem 0.75rem;   font-size: var(--ui-text-sm, 0.875rem); }

      .chip.variant-filled {
        background: var(--_chip-bg, var(--ui-color-primary-subtle, #eef2ff));
        color: var(--_chip-fg, var(--ui-color-primary, #4f46e5));
      }
      .chip.variant-outlined {
        background: transparent;
        color: var(--_chip-fg, var(--ui-color-primary, #4f46e5));
        box-shadow: inset 0 0 0 1px currentColor;
      }

      :host([color="primary"])   .chip { --_chip-bg: var(--ui-color-primary-subtle); --_chip-fg: var(--ui-color-primary); }
      :host([color="secondary"]) .chip { --_chip-bg: var(--ui-color-secondary-subtle); --_chip-fg: var(--ui-color-secondary); }
      :host([color="neutral"])   .chip { --_chip-bg: var(--ui-color-neutral-subtle); --_chip-fg: var(--ui-color-neutral); }
      :host([color="success"])   .chip { --_chip-bg: var(--ui-color-success-subtle); --_chip-fg: var(--ui-color-success); }
      :host([color="warning"])   .chip { --_chip-bg: var(--ui-color-warning-subtle); --_chip-fg: var(--ui-color-warning); }
      :host([color="error"])     .chip { --_chip-bg: var(--ui-color-error-subtle); --_chip-fg: var(--ui-color-error); }
      :host([color="info"])      .chip { --_chip-bg: var(--ui-color-info-subtle); --_chip-fg: var(--ui-color-info); }

      .delete-btn {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        font-size: 0.85em;
        opacity: 0.7;
        transition: opacity 0.15s;
      }
      .delete-btn:hover { opacity: 1; }
    `}template(){const e=this.getAttr("variant","filled"),t=this.getAttr("size","md"),r=this.getBoolAttr("deletable");return`
      <span class="chip variant-${e} size-${t}" part="chip">
        <slot></slot>
        ${r?'<button class="delete-btn" aria-label="Remove" part="delete">✕</button>':""}
      </span>
    `}onRendered(){var e;(e=this.$(".delete-btn"))==null||e.addEventListener("click",t=>{t.stopPropagation(),this.emit("ui-delete")})}}a(Q,"observedAttributes",["variant","size","color","deletable","disabled"]);n("ui-chip",Q);class J extends l{styles(){return`
      :host { display: inline-flex; position: relative; vertical-align: middle; }

      .badge {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-size: var(--ui-text-xs, 0.75rem);
        font-weight: var(--ui-weight-semibold, 600);
        color: #fff;
        background: var(--_badge-bg, var(--ui-color-error, #dc2626));
        border-radius: var(--ui-radius-full, 9999px);
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        line-height: 1;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1;
      }

      .badge.dot {
        min-width: 8px;
        width: 8px;
        height: 8px;
        padding: 0;
      }

      :host([color="primary"])   .badge { --_badge-bg: var(--ui-color-primary); }
      :host([color="secondary"]) .badge { --_badge-bg: var(--ui-color-secondary); }
      :host([color="success"])   .badge { --_badge-bg: var(--ui-color-success); }
      :host([color="warning"])   .badge { --_badge-bg: var(--ui-color-warning); }
      :host([color="error"])     .badge { --_badge-bg: var(--ui-color-error); }
      :host([color="info"])      .badge { --_badge-bg: var(--ui-color-info); }
    `}template(){const e=this.getAttr("variant","standard"),t=this.getAttr("content"),r=this.getNumAttr("max",99),o=e==="dot";let i=t;if(!o&&t){const d=Number(t);!isNaN(d)&&d>r&&(i=`${r}+`)}return`
      <slot></slot>
      <span class="badge ${o?"dot":""}" part="badge" aria-label="${t||""}">${o?"":i}</span>
    `}}a(J,"observedAttributes",["content","variant","color","max"]);n("ui-badge",J);class Z extends l{styles(){return`
      :host { display: inline-flex; }

      .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--ui-color-primary-subtle, #eef2ff);
        color: var(--ui-color-primary, #4f46e5);
        font-weight: var(--ui-weight-semibold, 600);
        user-select: none;
        flex-shrink: 0;
      }

      .avatar.size-xs { width: 24px; height: 24px; font-size: 10px; }
      .avatar.size-sm { width: 32px; height: 32px; font-size: 12px; }
      .avatar.size-md { width: 40px; height: 40px; font-size: 14px; }
      .avatar.size-lg { width: 48px; height: 48px; font-size: 18px; }
      .avatar.size-xl { width: 64px; height: 64px; font-size: 24px; }

      .avatar.variant-circular { border-radius: 50%; }
      .avatar.variant-rounded  { border-radius: var(--ui-radius-md, 0.5rem); }
      .avatar.variant-square   { border-radius: 0; }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `}template(){const e=this.getAttr("src"),t=this.getAttr("alt",""),r=this.getAttr("size","md"),o=this.getAttr("variant","circular"),i=this.getAttr("initials"),d=e?`<img src="${e}" alt="${t}" />`:`<span class="fallback">${i||"?"}</span>`;return`<span class="avatar size-${r} variant-${o}" part="avatar" role="img" aria-label="${t||i||"avatar"}">${d}</span>`}}a(Z,"observedAttributes",["src","alt","size","variant","initials"]);n("ui-avatar",Z);class G extends l{constructor(){super(...arguments);a(this,"_timer",null);a(this,"_show",()=>{const t=this.getNumAttr("delay",200);this._timer=setTimeout(()=>this.classList.add("show"),t)});a(this,"_hide",()=>{this._timer&&clearTimeout(this._timer),this.classList.remove("show")})}styles(){return`
      :host { display: inline-flex; position: relative; }

      .tip {
        position: absolute;
        z-index: 9999;
        background: var(--ui-gray-800, #1e293b);
        color: #fff;
        font-size: var(--ui-text-xs, 0.75rem);
        padding: 0.375rem 0.625rem;
        border-radius: var(--ui-radius-sm, 0.25rem);
        pointer-events: none;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.15s;
        line-height: 1.4;
      }
      :host(.show) .tip { opacity: 1; }

      /* Placement */
      .tip.top    { bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
      .tip.bottom { top: calc(100% + 6px);    left: 50%; transform: translateX(-50%); }
      .tip.left   { right: calc(100% + 6px);  top: 50%;  transform: translateY(-50%); }
      .tip.right  { left: calc(100% + 6px);   top: 50%;  transform: translateY(-50%); }
    `}template(){const t=this.getAttr("content"),r=this.getAttr("placement","top");return`
      <slot></slot>
      ${t?`<span class="tip ${r}" role="tooltip" part="tooltip">${t}</span>`:""}
    `}onConnected(){this.addEventListener("mouseenter",this._show),this.addEventListener("mouseleave",this._hide),this.addEventListener("focusin",this._show),this.addEventListener("focusout",this._hide)}onDisconnected(){this.removeEventListener("mouseenter",this._show),this.removeEventListener("mouseleave",this._hide),this.removeEventListener("focusin",this._show),this.removeEventListener("focusout",this._hide),this._timer&&clearTimeout(this._timer)}}a(G,"observedAttributes",["content","placement","delay"]);n("ui-tooltip",G);class tt extends l{styles(){return`
      :host { display: block; }

      .card {
        background: var(--ui-color-surface, #fff);
        border-radius: var(--ui-radius-lg, 0.75rem);
        overflow: hidden;
        transition: box-shadow 0.2s, transform 0.2s;
      }

      .card.variant-elevated {
        box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06);
      }
      .card.variant-outlined {
        border: 1px solid var(--ui-color-border, #e2e8f0);
      }
      .card.variant-flat {
        background: var(--ui-color-surface-variant, #f8fafc);
      }

      :host([interactive]) .card {
        cursor: pointer;
      }
      :host([interactive]) .card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,.1);
        transform: translateY(-1px);
      }

      .header {
        padding: var(--ui-space-4, 1rem) var(--ui-space-4, 1rem) 0;
      }
      .body {
        padding: var(--ui-space-4, 1rem);
      }
      .footer {
        padding: 0 var(--ui-space-4, 1rem) var(--ui-space-4, 1rem);
        display: flex;
        gap: var(--ui-space-2, 0.5rem);
        justify-content: flex-end;
      }
    `}template(){return`
      <div class="card variant-${this.getAttr("variant","elevated")}" part="card">
        <div class="header" part="header"><slot name="header"></slot></div>
        <div class="body" part="body"><slot></slot></div>
        <div class="footer" part="footer"><slot name="footer"></slot></div>
      </div>
    `}}a(tt,"observedAttributes",["variant","interactive"]);n("ui-card",tt);class et extends l{constructor(){super(...arguments);a(this,"_columns",[]);a(this,"_rows",[]);a(this,"_sortField","");a(this,"_sortDir","asc");a(this,"_page",0);a(this,"_rowIdField","");a(this,"_selectedRowId",null)}get columns(){return this._columns}set columns(t){this._columns=t,this.render()}get rows(){return this._rows}set rows(t){this._rows=t,this._page=0,this.render()}get rowIdField(){return this._rowIdField}set rowIdField(t){this._rowIdField=t,this.render()}get selectedRowId(){return this._selectedRowId}set selectedRowId(t){this._selectedRowId=t,this.render()}resolveRowId(t,r){const o=this._rowIdField?t[this._rowIdField]:void 0,i=t.id??t.cveId??t.key;return String(o??i??r)}styles(){return`
      :host { display: block; overflow-x: auto; }

      table {
        width: 100%;
        border-collapse: collapse;
        font-family: inherit;
        font-size: var(--ui-text-sm, 0.875rem);
      }

      th, td {
        text-align: left;
        padding: var(--ui-space-2, 0.5rem) var(--ui-space-3, 0.75rem);
      }

      th {
        font-weight: var(--ui-weight-semibold, 600);
        color: var(--ui-color-text-secondary, #64748b);
        background: var(--ui-color-surface-variant, #f8fafc);
        border-bottom: 2px solid var(--ui-color-border, #e2e8f0);
        white-space: nowrap;
        user-select: none;
      }
      th.sortable { cursor: pointer; }
      th.sortable:hover { color: var(--ui-color-text, #0f172a); }

      .sort-icon { font-size: 0.75em; margin-left: 0.25rem; }

      td {
        color: var(--ui-color-text, #0f172a);
        border-bottom: 1px solid var(--ui-color-border, #e2e8f0);
      }

      :host([bordered]) td,
      :host([bordered]) th {
        border: 1px solid var(--ui-color-border, #e2e8f0);
      }

      :host([striped]) tbody tr:nth-child(even) {
        background: var(--ui-color-surface-variant, #f8fafc);
      }

      tbody tr {
        cursor: pointer;
        transition: background 0.15s ease, box-shadow 0.15s ease;
      }
      tbody tr:hover {
        background: color-mix(in srgb, var(--ui-color-primary, #4f46e5) 4%, var(--ui-color-surface, #fff));
      }
      tbody tr.row-selected {
        background: color-mix(in srgb, var(--ui-color-primary, #4f46e5) 12%, var(--ui-color-surface, #fff));
        box-shadow: inset 2px 0 0 var(--ui-color-primary, #4f46e5);
      }

      .pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ui-space-2, 0.5rem);
        padding: var(--ui-space-3, 0.75rem) 0;
        font-size: var(--ui-text-sm, 0.875rem);
        color: var(--ui-color-text-secondary, #64748b);
      }
      .pagination button {
        all: unset;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: var(--ui-radius-sm, 0.25rem);
        border: 1px solid var(--ui-color-border, #e2e8f0);
        transition: background 0.15s;
      }
      .pagination button:hover { background: var(--ui-color-surface-variant, #f8fafc); }
      .pagination button:disabled { opacity: 0.4; cursor: default; }

      .empty {
        text-align: center;
        padding: var(--ui-space-8, 2rem);
        color: var(--ui-color-text-secondary, #64748b);
      }
    `}template(){const t=this.getBoolAttr("sortable"),r=this.getNumAttr("page-size",0);if(this._columns.length===0)return'<div class="empty" part="empty">No columns configured</div>';let o=this._rows.map((u,h)=>({row:u,index:h,rowId:this.resolveRowId(u,h)}));t&&this._sortField&&o.sort((u,h)=>{const b=String(u.row[this._sortField]??""),g=String(h.row[this._sortField]??""),y=b.localeCompare(g,void 0,{numeric:!0});return this._sortDir==="asc"?y:-y});const i=r>0?Math.ceil(o.length/r):1;r>0&&(o=o.slice(this._page*r,(this._page+1)*r));const d=this._columns.map(u=>{const b=this._sortField===u.field?this._sortDir==="asc"?"▲":"▼":"",g=u.width?` style="width: ${u.width}px"`:"",y=u.align?` style="text-align: ${u.align}"`:"";return`<th class="${t&&u.sortable!==!1?"sortable":""}" data-field="${u.field}"${g}${y}>${u.headerName}${b?`<span class="sort-icon">${b}</span>`:""}</th>`}).join(""),c=o.length===0?`<tr><td colspan="${this._columns.length}" class="empty">No data</td></tr>`:o.map(u=>`<tr data-row-index="${u.index}" class="${u.rowId===this._selectedRowId?"row-selected":""}">`+this._columns.map(h=>{const b=u.row[h.field]??"";return`<td${h.align?` style="text-align:${h.align}"`:""}>${b}</td>`}).join("")+"</tr>").join(""),p=r>0&&i>1?`<div class="pagination" part="pagination">
            <span>Page ${this._page+1} of ${i}</span>
            <button data-action="prev" ${this._page===0?"disabled":""}>← Prev</button>
            <button data-action="next" ${this._page>=i-1?"disabled":""}>Next →</button>
          </div>`:"";return`
      <table part="table">
        <thead><tr>${d}</tr></thead>
        <tbody>${c}</tbody>
      </table>
      ${p}
    `}onRendered(){var t,r;this.$$("th.sortable").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.field;this._sortField===i?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortField=i,this._sortDir="asc"),this.render(),this.emit("ui-sort",{field:this._sortField,direction:this._sortDir})})}),(t=this.$('[data-action="prev"]'))==null||t.addEventListener("click",()=>{this._page>0&&(this._page--,this.render(),this.emit("ui-page",{page:this._page}))}),(r=this.$('[data-action="next"]'))==null||r.addEventListener("click",()=>{const o=this.getNumAttr("page-size",0),i=o>0?Math.ceil(this._rows.length/o):1;this._page<i-1&&(this._page++,this.render(),this.emit("ui-page",{page:this._page}))}),this.$$("tbody tr[data-row-index]").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.rowIndex??"-1");if(i<0)return;const d=this._rows[i];if(!d)return;const c=this.resolveRowId(d,i);this._selectedRowId=c,this.render(),this.emit("ui-row-click",{rowId:c,row:d})})})}}a(et,"observedAttributes",["striped","bordered","sortable","page-size"]);n("ui-data-grid",et);class rt extends l{styles(){return":host{display:block}.item{display:flex;align-items:center;gap:.75rem;min-height:3rem;padding:.55rem .75rem;border-radius:var(--ui-radius-md,.5rem)}:host([interactive]) .item{cursor:pointer}:host([interactive]) .item:hover{background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 8%,transparent)}:host([selected]) .item{background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 14%,transparent);color:var(--ui-color-primary,#4f46e5)}:host([disabled]){opacity:.45;pointer-events:none}::slotted([slot=secondary]){margin-inline-start:auto;color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<div class="item" role="listitem" tabindex="${this.getBoolAttr("interactive")?"0":"-1"}"><slot name="leading"></slot><slot></slot><slot name="secondary"></slot></div>`}onRendered(){var e;this.getBoolAttr("interactive")&&((e=this.$(".item"))==null||e.addEventListener("click",()=>this.emit("ui-select",{value:this.getAttr("value")})))}}a(rt,"observedAttributes",["selected","disabled","interactive","value"]);class it extends l{styles(){return":host{display:grid}:host([dividers]) ::slotted(ui-list-item:not(:last-child)){border-bottom:1px solid var(--ui-color-border,#cbd5e1)}:host([dense]) ::slotted(ui-list-item){--ui-list-min-height:2.25rem}"}template(){return`<div role="list" aria-label="${this.getAttr("label","List")}"><slot></slot></div>`}}a(it,"observedAttributes",["dense","dividers","label"]);n("ui-list-item",rt);n("ui-list",it);class st extends l{constructor(){super(...arguments);a(this,"_columns",[]);a(this,"_rows",[]);a(this,"sortKey","");a(this,"sortDirection","asc")}set columns(t){this._columns=t??[],this.render()}get columns(){return this._columns}set rows(t){this._rows=t??[],this.render()}get rows(){return this._rows}styles(){return":host{display:block;overflow:auto;width:100%}table{width:100%;border-collapse:collapse;font-size:.875rem}caption{text-align:left;padding:.5rem 0;font-weight:700}th,td{padding:var(--_pad,.65rem .75rem);border-bottom:1px solid var(--ui-color-border,#cbd5e1);text-align:left}th{color:var(--ui-color-text-secondary,#64748b);font-size:.75rem;text-transform:uppercase;letter-spacing:.04em}th button{all:unset;cursor:pointer;display:inline-flex;gap:.35rem;align-items:center}:host([dense]){--_pad:.4rem .55rem}:host([striped]) tbody tr:nth-child(even){background:color-mix(in srgb,var(--ui-color-text,#fff) 3%,transparent)}:host([hover]) tbody tr:hover{background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 8%,transparent)}.empty{text-align:center;color:var(--ui-color-text-secondary,#64748b)}"}template(){const t=[...this.rows].sort((r,o)=>this.sortKey?String(r[this.sortKey]??"").localeCompare(String(o[this.sortKey]??""))*(this.sortDirection==="asc"?1:-1):0);return`<table><caption>${this.getAttr("caption")}</caption><thead><tr>${this.columns.map(r=>`<th style="text-align:${r.align??"left"}">${r.sortable?`<button data-key="${r.key}">${r.label}<span>${this.sortKey===r.key?this.sortDirection==="asc"?"↑":"↓":"↕"}</span></button>`:r.label}</th>`).join("")}</tr></thead><tbody>${t.length?t.map((r,o)=>`<tr data-index="${o}">${this.columns.map(i=>`<td style="text-align:${i.align??"left"}">${String(r[i.key]??"")}</td>`).join("")}</tr>`).join(""):`<tr><td class="empty" colspan="${Math.max(1,this.columns.length)}">${this.getAttr("empty-message","No rows")}</td></tr>`}</tbody></table>`}onRendered(){this.$$("th button").forEach(t=>t.addEventListener("click",()=>{const r=t.dataset.key??"";this.sortDirection=this.sortKey===r&&this.sortDirection==="asc"?"desc":"asc",this.sortKey=r,this.render(),this.emit("ui-sort",{key:r,direction:this.sortDirection})})),this.$$("tbody tr[data-index]").forEach(t=>t.addEventListener("click",()=>this.emit("ui-row-select",{index:Number(t.dataset.index)})))}}a(st,"observedAttributes",["striped","hover","dense","caption","empty-message"]);n("ui-table",st);class ot extends l{styles(){return':host{display:grid;grid-template-columns:5.5rem 1rem 1fr;gap:.65rem;min-height:3.5rem;position:relative}.time{color:var(--ui-color-text-secondary,#64748b);font-size:.75rem;text-align:right;padding-top:.15rem}.rail{position:relative}.rail:before{content:"";position:absolute;left:50%;top:1rem;bottom:-.5rem;border-left:1px solid var(--ui-color-border,#cbd5e1)}.dot{display:block;width:.7rem;height:.7rem;margin:.15rem auto 0;border-radius:50%;background:var(--ui-color-primary,#4f46e5);box-shadow:0 0 0 3px color-mix(in srgb,var(--ui-color-primary,#4f46e5) 18%,transparent)}:host([status=warning]) .dot{background:var(--ui-color-warning,#f59e0b)}:host([status=error]) .dot{background:var(--ui-color-error,#ef4444)}.content{display:grid;gap:.15rem}.content small{color:var(--ui-color-text-secondary,#64748b)}'}template(){return`<time class="time">${this.getAttr("time")}</time><span class="rail"><span class="dot"></span></span><span class="content"><strong>${this.getAttr("title")}</strong><small><slot></slot></small></span>`}}a(ot,"observedAttributes",["time","title","status"]);class xe extends l{styles(){return":host{display:grid}"}template(){return'<div role="list"><slot></slot></div>'}}n("ui-timeline-item",ot);n("ui-timeline",xe);class at extends l{styles(){return":host{display:block}.row{display:flex;align-items:center;gap:.35rem;min-height:2rem;padding:.25rem .4rem;border-radius:.3rem;cursor:pointer}:host([selected]) .row{color:var(--ui-color-primary,#4f46e5);background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 12%,transparent)}:host([disabled]){opacity:.45;pointer-events:none}.toggle{all:unset;width:1rem;text-align:center}.children{margin-left:1.2rem}:host(:not([expanded])) .children{display:none}"}template(){const e=this.children.length>0;return`<div class="row" role="treeitem" tabindex="0" aria-expanded="${e?this.getBoolAttr("expanded"):""}" aria-selected="${this.getBoolAttr("selected")}"><button class="toggle" type="button" aria-label="Toggle children">${e?this.getBoolAttr("expanded")?"▾":"▸":"·"}</button><span>${this.getAttr("label")}<slot name="label"></slot></span></div><div class="children" role="group"><slot></slot></div>`}onRendered(){var t,r;const e=()=>{this.toggleAttribute("selected",!0),this.emit("ui-select",{value:this.getAttr("value")})};(t=this.$(".row"))==null||t.addEventListener("click",e),(r=this.$(".toggle"))==null||r.addEventListener("click",o=>{o.stopPropagation(),this.toggleAttribute("expanded"),this.emit("ui-toggle",{value:this.getAttr("value"),expanded:this.getBoolAttr("expanded")})})}}a(at,"observedAttributes",["label","expanded","selected","disabled","value"]);class nt extends l{template(){return`<div role="tree" aria-label="${this.getAttr("label","Tree")}"><slot></slot></div>`}}a(nt,"observedAttributes",["label"]);n("ui-tree-item",at);n("ui-tree-view",nt);class lt extends l{styles(){return":host{display:block}.text{margin:0;color:var(--_color,var(--ui-color-text));font-size:var(--_size,1rem);line-height:var(--_line,1.5);font-weight:var(--_weight,400);text-align:var(--_align,start)}:host([color=muted]){--_color:var(--ui-color-text-secondary,#64748b)}:host([variant=h1]){--_size:2.25rem;--_line:1.15;--_weight:700}:host([variant=h2]){--_size:1.75rem;--_line:1.2;--_weight:700}:host([variant=h3]){--_size:1.35rem;--_line:1.25;--_weight:650}:host([variant=subtitle]){--_size:1.05rem;--_weight:600}:host([variant=caption]){--_size:.75rem;--_line:1.35}:host([variant=overline]){--_size:.7rem;--_weight:700;text-transform:uppercase;letter-spacing:.1em}:host([truncate]) .text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([lines]) .text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:var(--_lines);overflow:hidden}"}template(){const e=this.getAttr("variant","body"),t=e==="h1"||e==="h2"||e==="h3"?e:"p";return`<${t} class="text" style="--_align:${this.getAttr("align","start")};--_weight:${this.getAttr("weight","")};--_lines:${this.getNumAttr("lines",2)}"><slot></slot></${t}>`}}a(lt,"observedAttributes",["variant","align","color","weight","truncate","lines"]);n("ui-typography",lt);class dt extends l{styles(){return":host{display:inline-flex}.group{display:flex;align-items:center}::slotted(ui-avatar){margin-left:var(--_spacing,-.55rem);box-shadow:0 0 0 2px var(--ui-color-surface)}::slotted(ui-avatar:first-child){margin-left:0}"}template(){return`<div class="group" role="group" aria-label="${this.getAttr("label","People")}" style="--_spacing:${this.getAttr("spacing","-.55rem")}"><slot></slot></div>`}}a(dt,"observedAttributes",["spacing","max","label"]);n("ui-avatar-group",dt);class ct extends l{styles(){return":host{display:block}.callout{display:grid;grid-template-columns:auto 1fr;gap:.7rem;padding:var(--_pad,.9rem 1rem);border-left:4px solid var(--_tone,var(--ui-color-primary,#4f46e5));background:color-mix(in srgb,var(--_tone,var(--ui-color-primary,#4f46e5)) 9%,transparent);border-radius:.35rem}:host([compact]){--_pad:.55rem .7rem}:host([tone=success]){--_tone:var(--ui-color-success,#22c55e)}:host([tone=warning]){--_tone:var(--ui-color-warning,#f59e0b)}:host([tone=error]){--_tone:var(--ui-color-error,#ef4444)}.copy{display:grid;gap:.25rem}.copy small{color:var(--ui-color-text-secondary,#64748b)}"}template(){return`<span><slot name="icon">◇</slot></span><span class="copy"><strong>${this.getAttr("title")}</strong><small><slot></slot></small></span>`}}a(ct,"observedAttributes",["title","tone","compact"]);n("ui-callout",ct);class ut extends l{styles(){return":host{display:block}.list{display:grid;grid-template-columns:repeat(var(--_columns,3),minmax(0,1fr));gap:var(--_gap,.5rem);grid-auto-rows:var(--_row,8rem)}:host([variant=masonry]) .list{display:block;columns:var(--_columns,3);column-gap:var(--_gap,.5rem)}:host([variant=masonry]) ::slotted(*){display:block;break-inside:avoid;margin-bottom:var(--_gap,.5rem)}::slotted(*){overflow:hidden;border-radius:.4rem}"}template(){return`<div class="list" style="--_columns:${this.getNumAttr("columns",3)};--_gap:${this.getAttr("gap",".5rem")};--_row:${this.getAttr("row-height","8rem")}"><slot></slot></div>`}}a(ut,"observedAttributes",["columns","gap","row-height","variant"]);n("ui-image-list",ut);class pt extends l{constructor(){super(...arguments);a(this,"_items",[]);a(this,"scrollOffset",0)}set items(t){this._items=Array.isArray(t)?t:[],this.render()}get items(){return this._items}styles(){return":host{display:block}.viewport{height:var(--_height,18rem);overflow:auto;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem}.spacer{position:relative}.item{position:absolute;left:0;right:0;height:var(--_item,2.5rem);display:flex;align-items:center;padding:0 .75rem;border-bottom:1px solid var(--ui-color-border,#cbd5e1);font-size:.875rem}"}template(){const t=this.getNumAttr("item-height",40),r=this.getNumAttr("height",288),o=Math.max(0,Math.floor(this.scrollOffset/t)-2),i=Math.ceil(r/t)+4,d=Math.min(this.items.length,o+i),c=(p,u)=>String(typeof p=="object"&&p!==null?p.label??p.name??JSON.stringify(p):p??u);return`<div class="viewport" role="list" aria-label="${this.getAttr("label","Virtual list")}" style="--_height:${r}px;--_item:${t}px"><div class="spacer" style="height:${this.items.length*t}px">${this.items.slice(o,d).map((p,u)=>`<div class="item" role="listitem" style="top:${(o+u)*t}px">${c(p,o+u)}</div>`).join("")}</div></div>`}onRendered(){const t=this.$(".viewport");t&&(t.scrollTop=this.scrollOffset),t==null||t.addEventListener("scroll",()=>{this.scrollOffset=t.scrollTop,this.render()})}}a(pt,"observedAttributes",["height","item-height","label"]);n("ui-virtual-list",pt);class ht extends l{styles(){return":host{display:block}.stat{display:grid;gap:.2rem}.label{color:var(--ui-color-text-secondary,#64748b);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}.value{font-size:var(--_size,1.8rem);font-weight:700;line-height:1.1}:host([compact]){--_size:1.25rem}.delta{font-size:.78rem;color:var(--ui-color-text-secondary,#64748b)}:host([trend=up]) .delta{color:var(--ui-color-success,#22c55e)}:host([trend=down]) .delta{color:var(--ui-color-error,#ef4444)}"}template(){return`<div class="stat"><span class="label">${this.getAttr("label")}</span><span class="value">${this.getAttr("value")}<small>${this.getAttr("unit")}</small></span><span class="delta">${this.getAttr("trend")==="up"?"↑":this.getAttr("trend")==="down"?"↓":"→"} ${this.getAttr("delta")}</span></div>`}}a(ht,"observedAttributes",["label","value","delta","trend","unit","compact"]);n("ui-stat",ht);class ye extends l{styles(){return":host{display:inline-flex}kbd{padding:.12rem .38rem;border:1px solid var(--ui-color-border,#cbd5e1);border-bottom-width:2px;border-radius:.3rem;background:var(--ui-color-surface);font:600 .72rem var(--ui-font-mono,monospace)}"}template(){return"<kbd><slot></slot></kbd>"}}n("ui-kbd",ye);class bt extends l{styles(){return":host{display:block;position:relative}pre{margin:0;padding:1rem;overflow:auto;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;background:color-mix(in srgb,var(--ui-color-surface) 84%,#000);font: .8rem/1.55 var(--ui-font-mono,monospace);white-space:pre}:host([wrap]) pre{white-space:pre-wrap}button{position:absolute;top:.5rem;right:.5rem;padding:.25rem .45rem;border:1px solid var(--ui-color-border);border-radius:.3rem;background:var(--ui-color-surface);color:var(--ui-color-text);cursor:pointer}"}template(){return`${this.getBoolAttr("copyable")?'<button type="button">Copy</button>':""}<pre aria-label="${this.getAttr("language","Code")}"><code><slot></slot></code></pre>`}onRendered(){var e;(e=this.$("button"))==null||e.addEventListener("click",async()=>{var t;await((t=navigator.clipboard)==null?void 0:t.writeText(this.textContent??"")),this.emit("ui-copy")})}}a(bt,"observedAttributes",["language","wrap","copyable"]);n("ui-code-block",bt);class mt extends l{styles(){return":host{display:grid;grid-template-columns:minmax(8rem,35%) 1fr;gap:.75rem;padding:.5rem 0;border-bottom:1px solid var(--ui-color-border,#cbd5e1)}dt{color:var(--ui-color-text-secondary,#64748b);font-size:.8rem}dd{margin:0;font-size:.875rem}"}template(){return`<dt>${this.getAttr("term")}</dt><dd><slot></slot></dd>`}}a(mt,"observedAttributes",["term"]);n("ui-description-item",mt);class gt extends l{styles(){return":host{display:block}dl{margin:0}"}template(){return`<dl aria-label="${this.getAttr("label","Details")}"><slot></slot></dl>`}}a(gt,"observedAttributes",["label"]);n("ui-description-list",gt);class vt extends l{styles(){return`
      :host { display: block; }
      :host([hidden]) { display: none !important; }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--ui-space-3, 0.75rem);
        padding: var(--ui-space-3, 0.75rem) var(--ui-space-4, 1rem);
        border-radius: var(--ui-radius-md, 0.5rem);
        font-size: var(--ui-text-sm, 0.875rem);
        line-height: var(--ui-leading-normal, 1.5);
      }

      /* Standard */
      .alert.std-success { background: var(--ui-alert-success-bg, #f0fdf4); color: var(--ui-color-success, #16a34a); }
      .alert.std-info    { background: var(--ui-alert-info-bg, #eff6ff);    color: var(--ui-color-info, #2563eb); }
      .alert.std-warning { background: var(--ui-alert-warning-bg, #fffbeb); color: var(--ui-color-warning, #d97706); }
      .alert.std-error   { background: var(--ui-alert-error-bg, #fef2f2);   color: var(--ui-color-error, #dc2626); }

      /* Filled */
      .alert.fill-success { background: var(--ui-color-success, #16a34a); color: #fff; }
      .alert.fill-info    { background: var(--ui-color-info, #2563eb);    color: #fff; }
      .alert.fill-warning { background: var(--ui-color-warning, #d97706); color: #fff; }
      .alert.fill-error   { background: var(--ui-color-error, #dc2626);   color: #fff; }

      /* Outlined */
      .alert.out-success { border: 1px solid var(--ui-color-success); color: var(--ui-color-success); background: transparent; }
      .alert.out-info    { border: 1px solid var(--ui-color-info);    color: var(--ui-color-info);    background: transparent; }
      .alert.out-warning { border: 1px solid var(--ui-color-warning); color: var(--ui-color-warning); background: transparent; }
      .alert.out-error   { border: 1px solid var(--ui-color-error);   color: var(--ui-color-error);   background: transparent; }

      .icon { flex-shrink: 0; font-size: 1.25em; line-height: 1; }
      .content { flex: 1; }

      .close-btn {
        all: unset;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.15s;
        font-size: 1rem;
        line-height: 1;
        padding: 0.125rem;
      }
      .close-btn:hover { opacity: 1; }
    `}template(){const e=this.getAttr("severity","info"),t=this.getAttr("variant","standard"),r=this.getBoolAttr("closable"),o={success:"✓",info:"ℹ",warning:"⚠",error:"✕"};return`
      <div class="alert ${{standard:"std",filled:"fill",outlined:"out"}[t]||"std"}-${e}" role="alert" part="alert">
        <span class="icon" aria-hidden="true">${o[e]||"ℹ"}</span>
        <div class="content" part="content"><slot></slot></div>
        ${r?'<button class="close-btn" aria-label="Close" part="close">✕</button>':""}
      </div>
    `}onRendered(){var e;(e=this.$(".close-btn"))==null||e.addEventListener("click",()=>{this.emit("ui-close"),this.hidden=!0})}}a(vt,"observedAttributes",["severity","variant","closable"]);n("ui-alert",vt);class ft extends l{constructor(){super(...arguments);a(this,"_keyHandler",null)}get open(){return this.getBoolAttr("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}styles(){return`
      :host { display: contents; }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.5);
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.15s ease-out;
      }
      :host([open]) .backdrop { display: flex; }

      .dialog {
        background: var(--ui-color-surface, #fff);
        border-radius: var(--ui-radius-lg, 0.75rem);
        box-shadow: 0 20px 60px rgba(0,0,0,.2);
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        animation: slideUp 0.2s ease-out;
      }

      .dialog.size-sm { width: min(400px, 90vw); }
      .dialog.size-md { width: min(560px, 90vw); }
      .dialog.size-lg { width: min(720px, 90vw); }
      .dialog.size-xl { width: min(960px, 90vw); }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ui-space-4, 1rem) var(--ui-space-6, 1.5rem);
        border-bottom: 1px solid var(--ui-color-border, #e2e8f0);
      }

      .body {
        padding: var(--ui-space-6, 1.5rem);
        flex: 1;
      }

      .footer {
        padding: var(--ui-space-4, 1rem) var(--ui-space-6, 1.5rem);
        border-top: 1px solid var(--ui-color-border, #e2e8f0);
        display: flex;
        justify-content: flex-end;
        gap: var(--ui-space-2, 0.5rem);
      }

      .close-btn {
        all: unset;
        cursor: pointer;
        font-size: 1.25rem;
        color: var(--ui-color-text-secondary, #64748b);
        padding: 0.25rem;
        line-height: 1;
        border-radius: var(--ui-radius-sm, 0.25rem);
        transition: background 0.15s;
      }
      .close-btn:hover {
        background: var(--ui-color-surface-variant, #f8fafc);
      }

      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `}template(){return`
      <div class="backdrop" part="backdrop">
        <div class="dialog size-${this.getAttr("size","md")}" role="dialog" aria-modal="true" part="dialog">
          <div class="header" part="header">
            <slot name="header"></slot>
            <button class="close-btn" aria-label="Close dialog" part="close">✕</button>
          </div>
          <div class="body" part="body"><slot></slot></div>
          <div class="footer" part="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `}onRendered(){var r,o;(r=this.$(".close-btn"))==null||r.addEventListener("click",()=>{this.open=!1,this.emit("ui-close")}),this.getBoolAttr("modal")&&((o=this.$(".backdrop"))==null||o.addEventListener("click",i=>{i.target===i.currentTarget&&(this.open=!1,this.emit("ui-close"))})),this._keyHandler=i=>{i.key==="Escape"&&this.open&&(this.open=!1,this.emit("ui-close"))},document.addEventListener("keydown",this._keyHandler)}onDisconnected(){this._keyHandler&&document.removeEventListener("keydown",this._keyHandler)}}a(ft,"observedAttributes",["open","modal","size"]);n("ui-dialog",ft);class xt extends l{styles(){return`
      :host { display: block; }

      /* Linear */
      .track {
        width: 100%;
        background: var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-full, 9999px);
        overflow: hidden;
      }
      .track.size-sm { height: 4px; }
      .track.size-md { height: 6px; }
      .track.size-lg { height: 8px; }

      .bar {
        height: 100%;
        background: var(--_pg-color, var(--ui-color-primary, #4f46e5));
        border-radius: inherit;
        transition: width 0.3s ease;
      }

      .bar.indeterminate {
        width: 40% !important;
        animation: slide 1.5s ease-in-out infinite;
      }

      @keyframes slide {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
      }

      /* Circular */
      .circular {
        display: inline-flex;
        position: relative;
      }
      .circular.size-sm svg { width: 24px; height: 24px; }
      .circular.size-md svg { width: 40px; height: 40px; }
      .circular.size-lg svg { width: 56px; height: 56px; }

      .circular-track {
        stroke: var(--ui-color-border, #e2e8f0);
        fill: none;
      }
      .circular-bar {
        stroke: var(--_pg-color, var(--ui-color-primary, #4f46e5));
        fill: none;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.3s;
        transform: rotate(-90deg);
        transform-origin: center;
      }
      .circular-bar.indeterminate {
        animation: spin-circ 1.5s linear infinite;
      }
      @keyframes spin-circ {
        to { transform: rotate(270deg); }
      }

      :host([color="primary"])   { --_pg-color: var(--ui-color-primary); }
      :host([color="secondary"]) { --_pg-color: var(--ui-color-secondary); }
      :host([color="success"])   { --_pg-color: var(--ui-color-success); }
      :host([color="error"])     { --_pg-color: var(--ui-color-error); }
      :host([color="warning"])   { --_pg-color: var(--ui-color-warning); }
      :host([color="info"])      { --_pg-color: var(--ui-color-info); }
    `}template(){const e=this.getAttr("variant","linear"),t=this.getAttr("size","md"),r=this.hasAttribute("value"),o=this.getNumAttr("value",0);if(e==="circular"){const i=2*Math.PI*18,d=r?i*(1-o/100):i*.75;return`
        <div class="circular size-${t}" role="progressbar" aria-valuenow="${r?o:""}" aria-valuemin="0" aria-valuemax="100" part="circular">
          <svg viewBox="0 0 44 44">
            <circle class="circular-track" cx="22" cy="22" r="18" stroke-width="4" />
            <circle class="circular-bar ${r?"":"indeterminate"}" cx="22" cy="22" r="18" stroke-width="4"
              stroke-dasharray="${i}"
              stroke-dashoffset="${d}" />
          </svg>
        </div>
      `}return`
      <div class="track size-${t}" role="progressbar" aria-valuenow="${r?o:""}" aria-valuemin="0" aria-valuemax="100" part="track">
        <div class="bar ${r?"":"indeterminate"}" style="width: ${r?o:0}%" part="bar"></div>
      </div>
    `}}a(xt,"observedAttributes",["value","variant","size","color"]);n("ui-progress",xt);class yt extends l{styles(){return`
      :host { display: block; }

      .skeleton {
        background: var(--ui-gray-200, #e2e8f0);
        display: block;
      }

      .skeleton.variant-text {
        height: 1em;
        border-radius: var(--ui-radius-sm, 0.25rem);
        width: 100%;
      }
      .skeleton.variant-circular { border-radius: 50%; }
      .skeleton.variant-rectangular { border-radius: 0; }
      .skeleton.variant-rounded { border-radius: var(--ui-radius-md, 0.5rem); }

      /* Pulse animation */
      .skeleton.anim-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      /* Wave animation */
      .skeleton.anim-wave {
        position: relative;
        overflow: hidden;
      }
      .skeleton.anim-wave::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: wave 1.6s linear infinite;
      }
      @keyframes wave {
        from { transform: translateX(-100%); }
        to   { transform: translateX(100%); }
      }
    `}template(){const e=this.getAttr("variant","text"),t=this.getAttr("width",e==="circular"?"40px":"100%"),r=this.getAttr("height",e==="circular"?"40px":e==="text"?"1em":"100px"),o=this.getAttr("animation","pulse");return`<span
      class="skeleton variant-${e} anim-${o}"
      style="width:${t};height:${r}"
      aria-hidden="true"
      part="skeleton"
    ></span>`}}a(yt,"observedAttributes",["variant","width","height","animation"]);n("ui-skeleton",yt);class we extends HTMLElement{constructor(){super();a(this,"root");this.root=this.attachShadow({mode:"open"}),this.root.innerHTML=`
      <style>
        :host {
          position: fixed;
          z-index: 99999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 400px;
          padding: 1rem;
        }
        :host([position="top-right"])    { top: 0; right: 0; }
        :host([position="top-left"])     { top: 0; left: 0; }
        :host([position="bottom-right"]) { bottom: 0; right: 0; }
        :host([position="bottom-left"])  { bottom: 0; left: 0; }
        :host([position="top-center"])   { top: 0; left: 50%; transform: translateX(-50%); }
        :host([position="bottom-center"]){ bottom: 0; left: 50%; transform: translateX(-50%); }

        .toast {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-family: var(--ui-font-family, sans-serif);
          font-size: 0.875rem;
          line-height: 1.4;
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.2s ease-out;
          transition: opacity 0.2s, transform 0.2s;
        }
        .toast.removing {
          opacity: 0;
          transform: translateX(100%);
        }

        .toast.success { background: var(--ui-color-success, #16a34a); }
        .toast.info    { background: var(--ui-color-info, #2563eb); }
        .toast.warning { background: var(--ui-color-warning, #d97706); }
        .toast.error   { background: var(--ui-color-error, #dc2626); }

        .close {
          all: unset;
          cursor: pointer;
          opacity: 0.7;
          font-size: 1rem;
          line-height: 1;
          margin-left: auto;
        }
        .close:hover { opacity: 1; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>
    `}addToast(t){var c;const r=t.severity||"info",o=t.duration??4e3,i=document.createElement("div");i.className=`toast ${r}`,i.setAttribute("role","alert"),i.innerHTML=`
      <span>${t.message}</span>
      <button class="close" aria-label="close">✕</button>
    `,this.root.appendChild(i);const d=()=>{i.classList.add("removing"),setTimeout(()=>i.remove(),200)};(c=i.querySelector(".close"))==null||c.addEventListener("click",d),o>0&&setTimeout(d,o)}}n("ui-toast-container",we);class wt extends l{styles(){return":host{display:none;position:fixed;inset:0;z-index:100}:host([open]){display:grid;place-items:center}.backdrop{position:absolute;inset:0;background:rgb(2 6 23/.62);backdrop-filter:blur(var(--_blur,0))}:host([blur]){--_blur:4px}:host([invisible]) .backdrop{background:transparent}.content{position:relative;z-index:1}"}template(){return'<div class="backdrop" part="backdrop"></div><div class="content"><slot></slot></div>'}onRendered(){var e;(e=this.$(".backdrop"))==null||e.addEventListener("click",()=>this.emit("ui-dismiss"))}}a(wt,"observedAttributes",["open","blur","invisible"]);n("ui-backdrop",wt);class kt extends l{styles(){return":host{display:grid;place-items:center;text-align:center;padding:var(--_padding,2.5rem);border:1px dashed var(--ui-color-border,#cbd5e1);border-radius:var(--ui-radius-lg,.75rem)}:host([compact]){--_padding:1rem}.wrap{display:grid;gap:.55rem;justify-items:center;max-width:30rem}.icon{font-size:1.75rem;color:var(--ui-color-text-secondary,#64748b)}h3,p{margin:0}p{color:var(--ui-color-text-secondary,#64748b);font-size:.875rem}.actions{margin-top:.5rem}"}template(){return`<div class="wrap"><div class="icon"><slot name="icon">◇</slot></div><h3>${this.getAttr("title")}</h3><p>${this.getAttr("description")}</p><div class="actions"><slot></slot></div></div>`}}a(kt,"observedAttributes",["title","description","compact"]);n("ui-empty-state",kt);class At extends l{constructor(){super(...arguments);a(this,"timer")}styles(){return":host{display:none;position:fixed;z-index:110;inset:auto 1rem 1rem auto}:host([open]){display:block}:host([position=bottom-left]){inset:auto auto 1rem 1rem}:host([position=top-right]){inset:1rem 1rem auto auto}:host([position=top-left]){inset:1rem auto auto 1rem}.bar{display:flex;align-items:center;gap:.75rem;min-width:18rem;max-width:32rem;padding:.75rem 1rem;border-radius:var(--ui-radius-md,.5rem);background:var(--ui-color-surface);color:var(--ui-color-text);border:1px solid var(--ui-color-border,#cbd5e1);box-shadow:0 14px 34px rgb(0 0 0/.28)}:host([severity=success]) .bar{border-left:4px solid var(--ui-color-success,#22c55e)}:host([severity=warning]) .bar{border-left:4px solid var(--ui-color-warning,#f59e0b)}:host([severity=error]) .bar{border-left:4px solid var(--ui-color-error,#ef4444)}button{all:unset;margin-left:auto;cursor:pointer;font-size:1.1rem}"}template(){return`<div class="bar" role="status" aria-live="polite"><span>${this.getAttr("message")}<slot></slot></span>${this.getBoolAttr("closable")?'<button type="button" aria-label="Dismiss">×</button>':""}</div>`}onRendered(){var t;window.clearTimeout(this.timer),(t=this.$("button"))==null||t.addEventListener("click",()=>this.close("dismiss")),this.getBoolAttr("open")&&this.getNumAttr("duration",0)>0&&(this.timer=window.setTimeout(()=>this.close("timeout"),this.getNumAttr("duration")))}onDisconnected(){window.clearTimeout(this.timer)}close(t){this.removeAttribute("open"),this.emit("ui-close",{reason:t})}}a(At,"observedAttributes",["open","message","severity","position","duration","closable"]);n("ui-snackbar",At);class $t extends l{get value(){return this.getAttr("value")}set value(e){this.setAttribute("value",e)}styles(){return`
      :host { display: block; }
      .tablist {
        display: flex;
        gap: 0;
        border-bottom: 2px solid var(--ui-color-border, #e2e8f0);
      }
      :host([variant="pills"]) .tablist { border-bottom: none; gap: var(--ui-space-1, 0.25rem); }

      ::slotted(ui-tab-panel) { display: none; }
      ::slotted(ui-tab-panel[active]) { display: block; }
    `}template(){return`
      <div class="tablist" role="tablist" part="tablist">
        <slot name="tab"></slot>
      </div>
      <div class="panels" part="panels">
        <slot></slot>
      </div>
    `}onConnected(){this.addEventListener("tab-select",(e=>{this.value=e.detail.value,this._syncPanels(),this.emit("ui-change",{value:this.value})})),requestAnimationFrame(()=>this._syncPanels())}_syncPanels(){const e=this.value;this.querySelectorAll("ui-tab").forEach(t=>{t.toggleAttribute("active",t.getAttribute("value")===e)}),this.querySelectorAll("ui-tab-panel").forEach(t=>{t.toggleAttribute("active",t.getAttribute("value")===e)})}}a($t,"observedAttributes",["value","variant","size"]);class _t extends l{styles(){return`
      :host { display: inline-flex; }

      button {
        all: unset;
        cursor: pointer;
        padding: var(--ui-space-2, 0.5rem) var(--ui-space-4, 1rem);
        font-family: inherit;
        font-size: var(--ui-text-sm, 0.875rem);
        font-weight: var(--ui-weight-medium, 500);
        color: var(--ui-color-text-secondary, #64748b);
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        transition: color 0.15s, border-color 0.15s, background 0.15s;
        white-space: nowrap;
      }
      button:hover { color: var(--ui-color-text, #0f172a); }
      button.active {
        color: var(--ui-color-primary, #4f46e5);
        border-bottom-color: var(--ui-color-primary, #4f46e5);
      }
      button:disabled { opacity: 0.5; cursor: not-allowed; }
      button:focus-visible { outline: 2px solid var(--ui-color-primary); outline-offset: -2px; }
    `}connectedCallback(){super.connectedCallback(),this.slot="tab"}template(){const e=this.getAttr("label"),t=this.getBoolAttr("active"),r=this.getBoolAttr("disabled");return`
      <button role="tab" aria-selected="${t}" ${r?"disabled":""} class="${t?"active":""}" part="tab">
        ${e||"<slot></slot>"}
      </button>
    `}onRendered(){var e;(e=this.$("button"))==null||e.addEventListener("click",()=>{this.getBoolAttr("disabled")||this.dispatchEvent(new CustomEvent("tab-select",{bubbles:!0,composed:!0,detail:{value:this.getAttr("value")}}))})}}a(_t,"observedAttributes",["value","label","active","disabled"]);class zt extends l{styles(){return`
      :host { display: none; }
      :host([active]) { display: block; padding: var(--ui-space-4, 1rem) 0; }
    `}template(){return"<slot></slot>"}}a(zt,"observedAttributes",["value","active"]);n("ui-tabs",$t);n("ui-tab",_t);n("ui-tab-panel",zt);class Et extends l{get open(){return this.getBoolAttr("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}styles(){return`
      :host { display: contents; }

      .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.4);
        animation: fadeIn 0.15s;
      }
      :host([open]) .backdrop { display: block; }
      :host(:not([overlay])) .backdrop { background: transparent; pointer-events: none; }

      .panel {
        position: fixed;
        z-index: 10000;
        background: var(--ui-color-surface, #fff);
        box-shadow: 0 8px 30px rgba(0,0,0,.15);
        overflow-y: auto;
        transition: transform 0.25s ease;
      }

      /* Left */
      :host([anchor="left"]) .panel, .panel.anchor-left {
        top: 0; bottom: 0; left: 0;
        width: var(--_drawer-size, 280px);
        transform: translateX(-100%);
      }
      :host([open][anchor="left"]) .panel, :host([open]) .panel.anchor-left {
        transform: translateX(0);
      }

      /* Right */
      :host([anchor="right"]) .panel, .panel.anchor-right {
        top: 0; bottom: 0; right: 0;
        width: var(--_drawer-size, 280px);
        transform: translateX(100%);
      }
      :host([open][anchor="right"]) .panel, :host([open]) .panel.anchor-right {
        transform: translateX(0);
      }

      /* Top */
      :host([anchor="top"]) .panel, .panel.anchor-top {
        top: 0; left: 0; right: 0;
        height: var(--_drawer-size, 280px);
        transform: translateY(-100%);
      }
      :host([open][anchor="top"]) .panel, :host([open]) .panel.anchor-top {
        transform: translateY(0);
      }

      /* Bottom */
      :host([anchor="bottom"]) .panel, .panel.anchor-bottom {
        bottom: 0; left: 0; right: 0;
        height: var(--_drawer-size, 280px);
        transform: translateY(100%);
      }
      :host([open][anchor="bottom"]) .panel, :host([open]) .panel.anchor-bottom {
        transform: translateY(0);
      }

      .content { padding: var(--ui-space-4, 1rem); }

      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    `}template(){const e=this.getAttr("anchor","left"),t=this.getAttr("size","280px");return`
      <div class="backdrop" part="backdrop"></div>
      <div class="panel anchor-${e}" style="--_drawer-size: ${t}" role="dialog" part="panel">
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `}onRendered(){var e;(e=this.$(".backdrop"))==null||e.addEventListener("click",()=>{this.open=!1,this.emit("ui-close")})}}a(Et,"observedAttributes",["open","anchor","size","overlay"]);n("ui-drawer",Et);class St extends l{styles(){return`
      :host { display: block; }
      nav { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ui-space-1, 0.25rem); }
      .sep {
        color: var(--ui-color-text-secondary, #64748b);
        font-size: var(--ui-text-sm, 0.875rem);
        user-select: none;
      }
      ::slotted(*) {
        font-size: var(--ui-text-sm, 0.875rem);
        color: var(--ui-color-text-secondary, #64748b);
        text-decoration: none;
      }
      ::slotted(a:hover) { color: var(--ui-color-primary, #4f46e5); text-decoration: underline; }
      ::slotted(*:last-child) { color: var(--ui-color-text, #0f172a); font-weight: var(--ui-weight-medium, 500); }
    `}template(){return`
      <nav aria-label="Breadcrumb" part="nav">
        <slot></slot>
      </nav>
    `}onConnected(){requestAnimationFrame(()=>this._insertSeparators())}_insertSeparators(){const e=this.getAttr("separator","/"),t=Array.from(this.children).filter(r=>!r.classList.contains("_bc-sep"));this.querySelectorAll("._bc-sep").forEach(r=>r.remove()),t.forEach((r,o)=>{if(o<t.length-1){const i=document.createElement("span");i.className="_bc-sep",i.setAttribute("aria-hidden","true"),i.textContent=` ${e} `,i.style.color="var(--ui-color-text-secondary, #64748b)",i.style.fontSize="var(--ui-text-sm, 0.875rem)",r.after(i)}})}}a(St,"observedAttributes",["separator"]);n("ui-breadcrumbs",St);class Lt extends l{get page(){return this.getNumAttr("page",1)}set page(e){this.setAttribute("page",String(e))}styles(){return`
      :host { display: inline-flex; }

      nav {
        display: flex;
        align-items: center;
        gap: var(--ui-space-1, 0.25rem);
      }

      button {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        border-radius: var(--ui-radius-md, 0.5rem);
        font-family: inherit;
        font-size: var(--ui-text-sm, 0.875rem);
        color: var(--ui-color-text, #0f172a);
        transition: background 0.15s;
        padding: 0 0.25rem;
      }
      button:hover { background: var(--ui-color-surface-variant, #f8fafc); }
      button.active {
        background: var(--ui-color-primary, #4f46e5);
        color: #fff;
      }
      button:disabled { opacity: 0.4; cursor: default; }
      button:focus-visible { outline: 2px solid var(--ui-color-primary); outline-offset: 2px; }

      .ellipsis {
        min-width: 2rem;
        text-align: center;
        color: var(--ui-color-text-secondary, #64748b);
        user-select: none;
      }
    `}template(){const e=this.getNumAttr("count",1),t=this.getNumAttr("page",1),r=this.getNumAttr("sibling-count",1),i=this._buildRange(e,t,r).map(d=>{if(d==="...")return'<span class="ellipsis">…</span>';const c=Number(d);return`<button data-page="${c}" class="${c===t?"active":""}" aria-current="${c===t?"page":"false"}">${c}</button>`}).join("");return`
      <nav aria-label="Pagination" part="nav">
        <button data-page="prev" ${t<=1?"disabled":""} aria-label="Previous">‹</button>
        ${i}
        <button data-page="next" ${t>=e?"disabled":""} aria-label="Next">›</button>
      </nav>
    `}onRendered(){this.$$("button").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.page;let r=this.page;t==="prev"?r=Math.max(1,r-1):t==="next"?r=Math.min(this.getNumAttr("count",1),r+1):r=Number(t),this.page=r,this.render(),this.emit("ui-change",{page:r})})})}_buildRange(e,t,r){const o=r*2+5;if(e<=o)return Array.from({length:e},(h,b)=>b+1);const i=Math.max(t-r,1),d=Math.min(t+r,e),c=i>2,p=d<e-1,u=[1];if(c)u.push("...");else for(let h=2;h<i;h++)u.push(h);for(let h=i;h<=d;h++)h!==1&&h!==e&&u.push(h);if(p)u.push("...");else for(let h=d+1;h<e;h++)u.push(h);return u.push(e),u}}a(Lt,"observedAttributes",["count","page","sibling-count","size"]);n("ui-pagination",Lt);class Bt extends l{styles(){return":host{display:block;position:var(--_position,relative);inset:var(--_inset,auto);z-index:var(--_z,auto)}:host([position=sticky]){--_position:sticky;--_inset:0 0 auto;--_z:20}:host([position=fixed]){--_position:fixed;--_inset:0 0 auto;--_z:20}header{display:flex;align-items:center;min-height:3.5rem;padding:0 1rem;color:var(--ui-color-text);background:var(--ui-color-surface);border-bottom:1px solid var(--ui-color-border,#cbd5e1)}:host([color=primary]) header{background:var(--ui-color-primary,#4f46e5);color:#fff}:host([elevation]) header{box-shadow:0 4px 16px rgb(0 0 0/.2)}"}template(){return"<header><slot></slot></header>"}}a(Bt,"observedAttributes",["position","color","elevation"]);class ke extends l{styles(){return":host{display:flex;align-items:center;gap:.75rem;width:100%;min-height:3rem}::slotted([data-spacer]){margin-inline-start:auto}"}template(){return"<slot></slot>"}}n("ui-app-bar",Bt);n("ui-toolbar",ke);class Nt extends l{styles(){return":host{display:block}.item{display:flex;align-items:center;gap:.625rem;min-height:2.5rem;padding:.45rem .75rem;cursor:pointer;border-radius:var(--ui-radius-sm,.25rem);font-size:.875rem}.item:hover,.item:focus-visible{outline:0;background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 10%,transparent)}:host([selected]) .item{color:var(--ui-color-primary,#4f46e5);background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 14%,transparent)}:host([disabled]) .item{opacity:.45;pointer-events:none}"}template(){return`<div class="item" role="menuitem" tabindex="${this.getBoolAttr("disabled")?"-1":"0"}" aria-disabled="${this.getBoolAttr("disabled")}"><slot></slot></div>`}onRendered(){var t,r;const e=()=>this.emit("ui-select",{value:this.getAttr("value")});(t=this.$(".item"))==null||t.addEventListener("click",e),(r=this.$(".item"))==null||r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&e()})}}a(Nt,"observedAttributes",["disabled","selected","value"]);class Ct extends l{styles(){return":host{display:inline-block;position:relative}.menu{position:absolute;z-index:50;inset:calc(100% + .25rem) auto auto 0;min-width:12rem;padding:.25rem;color:var(--ui-color-text);background:var(--ui-color-surface);border:1px solid var(--ui-color-border,#cbd5e1);border-radius:var(--ui-radius-md,.5rem);box-shadow:0 14px 34px rgb(0 0 0/.24)}:host(:not([open])) .menu{display:none}"}template(){return`<div class="menu" role="menu" aria-label="${this.getAttr("label","Menu")}"><slot></slot></div>`}onRendered(){this.addEventListener("ui-select",()=>{this.removeAttribute("open")}),this.$$("slot")}}a(Ct,"observedAttributes",["open","label"]);n("ui-menu-item",Nt);n("ui-menu",Ct);class It extends l{styles(){return":host{display:inline-block;position:relative}.surface{position:absolute;z-index:50;min-width:14rem;padding:.75rem;color:var(--ui-color-text);background:var(--ui-color-surface);border:1px solid var(--ui-color-border,#cbd5e1);border-radius:var(--ui-radius-md,.5rem);box-shadow:0 16px 38px rgb(0 0 0/.24)}:host(:not([open])) .surface{display:none}:host(:not([placement])) .surface,:host([placement=bottom-start]) .surface{inset:calc(100% + .4rem) auto auto 0}:host([placement=bottom-end]) .surface{inset:calc(100% + .4rem) 0 auto auto}:host([placement=top]) .surface{inset:auto auto calc(100% + .4rem) 50%;transform:translateX(-50%)}:host([placement=right]) .surface{inset:50% auto auto calc(100% + .4rem);transform:translateY(-50%)}"}template(){return`<slot name="anchor"></slot><div class="surface" role="dialog" aria-label="${this.getAttr("label","Popover")}"><slot></slot></div>`}}a(It,"observedAttributes",["open","placement","label"]);n("ui-popover",It);class Tt extends l{styles(){return":host{display:flex;flex:1;min-width:8rem;position:relative}.step{display:grid;grid-template-columns:2rem 1fr;gap:.55rem;align-items:start;width:100%}.marker{display:grid;place-items:center;width:2rem;height:2rem;border-radius:50%;border:1px solid var(--ui-color-border,#cbd5e1);background:var(--ui-color-surface);font-size:.75rem;font-weight:700}:host([status=active]) .marker,:host([status=complete]) .marker{border-color:var(--ui-color-primary,#4f46e5);background:var(--ui-color-primary,#4f46e5);color:#fff}.copy{display:grid;gap:.15rem}.copy small{color:var(--ui-color-text-secondary,#64748b)}"}template(){const e=this.getAttr("status")==="complete";return`<div class="step" aria-current="${this.getAttr("status")==="active"?"step":"false"}"><span class="marker">${e?"✓":this.getAttr("index","1")}</span><span class="copy"><strong>${this.getAttr("label")}<slot></slot></strong><small>${this.getAttr("description")}</small></span></div>`}}a(Tt,"observedAttributes",["label","description","status","index"]);class Rt extends l{styles(){return":host{display:flex;gap:1rem;width:100%}:host([orientation=vertical]){display:grid}"}template(){return'<div role="list" style="display:contents"><slot></slot></div>'}}a(Rt,"observedAttributes",["orientation"]);n("ui-step",Tt);n("ui-stepper",Rt);class jt extends l{constructor(){super(...arguments);a(this,"_commands",[]);a(this,"query","")}set commands(t){this._commands=t??[],this.render()}get commands(){return this._commands}styles(){return":host{display:none;position:fixed;inset:0;z-index:120;background:rgb(2 6 23/.58);padding:12vh 1rem 1rem}:host([open]){display:grid;align-items:start;justify-items:center}.panel{width:min(40rem,100%);background:var(--ui-color-surface);border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.75rem;box-shadow:0 24px 60px rgb(0 0 0/.35);overflow:hidden}.search{display:flex;align-items:center;border-bottom:1px solid var(--ui-color-border,#cbd5e1)}input{flex:1;padding:.9rem 1rem;border:0;outline:0;background:transparent;color:var(--ui-color-text);font:inherit}.list{max-height:22rem;overflow:auto;padding:.4rem}.item{display:grid;grid-template-columns:1fr auto;gap:.2rem .75rem;padding:.65rem .75rem;border-radius:.4rem;cursor:pointer}.item:hover,.item:focus{outline:0;background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 12%,transparent)}.item small{color:var(--ui-color-text-secondary,#64748b)}kbd{grid-row:1/3;grid-column:2;align-self:center;padding:.1rem .35rem;border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.25rem;font-size:.7rem}"}template(){const t=this.commands.filter(r=>`${r.label} ${r.group??""} ${r.description??""}`.toLowerCase().includes(this.query.toLowerCase()));return`<div class="panel" role="dialog" aria-label="${this.getAttr("label","Command palette")}"><div class="search"><input autofocus placeholder="${this.getAttr("placeholder","Type a command")}" value="${this.query}" aria-label="Search commands"/></div><div class="list" role="listbox">${t.map(r=>`<div class="item" role="option" tabindex="0" data-id="${r.id}" aria-disabled="${!!r.disabled}"><strong>${r.label}</strong><small>${r.description??r.group??""}</small>${r.shortcut?`<kbd>${r.shortcut}</kbd>`:""}</div>`).join("")||'<div class="item">No matching commands</div>'}</div></div>`}onRendered(){const t=this.$("input");t==null||t.addEventListener("input",()=>{var r;this.query=t.value,this.render(),(r=this.$("input"))==null||r.focus()}),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"&&this.removeAttribute("open")}),this.$$("[data-id]").forEach(r=>{const o=()=>{r.getAttribute("aria-disabled")!=="true"&&(this.emit("ui-command",{id:r.dataset.id}),this.removeAttribute("open"))};r.addEventListener("click",o),r.addEventListener("keydown",i=>{i.key==="Enter"&&o()})})}}a(jt,"observedAttributes",["open","placeholder","label"]);n("ui-command-palette",jt);class Dt extends l{constructor(){super(...arguments);a(this,"openAt",t=>{t.preventDefault();const r=t;this.setAttribute("x",String(r.clientX)),this.setAttribute("y",String(r.clientY)),this.setAttribute("open","")});a(this,"close",()=>this.removeAttribute("open"))}styles(){return":host{display:contents}.menu{display:none;position:fixed;z-index:90;left:var(--_x,0);top:var(--_y,0);min-width:12rem;padding:.25rem;background:var(--ui-color-surface);border:1px solid var(--ui-color-border,#cbd5e1);border-radius:.5rem;box-shadow:0 14px 34px rgb(0 0 0/.28)}:host([open]) .menu{display:block}"}template(){return`<slot name="trigger"></slot><div class="menu" role="menu" aria-label="${this.getAttr("label","Context menu")}" style="--_x:${this.getNumAttr("x",0)}px;--_y:${this.getNumAttr("y",0)}px"><slot></slot></div>`}onConnected(){this.addEventListener("contextmenu",this.openAt),document.addEventListener("pointerdown",this.close)}onDisconnected(){this.removeEventListener("contextmenu",this.openAt),document.removeEventListener("pointerdown",this.close)}}a(Dt,"observedAttributes",["open","x","y","label"]);n("ui-context-menu",Dt);class qt extends l{styles(){return":host{display:block}.item{display:flex;align-items:center;gap:.6rem;padding:.55rem .7rem;border-radius:.4rem;cursor:pointer}:host([selected]) .item{color:var(--ui-color-primary,#4f46e5);background:color-mix(in srgb,var(--ui-color-primary,#4f46e5) 12%,transparent)}:host([disabled]){opacity:.45;pointer-events:none}.badge{margin-left:auto}"}template(){return`<div class="item" role="link" tabindex="0"><slot name="icon"></slot><span>${this.getAttr("label")}<slot></slot></span>${this.hasAttribute("badge")?`<span class="badge">${this.getAttr("badge")}</span>`:""}</div>`}onRendered(){var t,r;const e=()=>this.emit("ui-navigate",{value:this.getAttr("value")});(t=this.$(".item"))==null||t.addEventListener("click",e),(r=this.$(".item"))==null||r.addEventListener("keydown",o=>{o.key==="Enter"&&e()})}}a(qt,"observedAttributes",["label","value","selected","disabled","badge"]);n("ui-side-nav-item",qt);class Mt extends l{styles(){return":host{display:block}nav{display:grid;gap:.2rem}"}template(){return`<nav aria-label="${this.getAttr("label","Navigation")}"><slot></slot></nav>`}}a(Mt,"observedAttributes",["label","compact"]);n("ui-side-navigation",Mt);class Ft extends l{styles(){return":host{display:block}nav{display:flex;justify-content:space-around;border-top:1px solid var(--ui-color-border,#cbd5e1);background:var(--ui-color-surface);padding:.25rem}::slotted(ui-side-nav-item){flex:1;text-align:center}"}template(){return`<nav aria-label="${this.getAttr("label","Bottom navigation")}"><slot></slot></nav>`}}a(Ft,"observedAttributes",["value","label","show-labels"]);n("ui-bottom-navigation",Ft);class Pt extends l{styles(){return":host{display:inline}a{color:var(--ui-color-primary,#4f46e5);text-decoration:var(--_decoration,none);text-underline-offset:2px}:host([underline=always]){--_decoration:underline}:host([underline=hover]) a:hover{text-decoration:underline}:host([disabled]){pointer-events:none;opacity:.5}"}template(){return`<a href="${this.getAttr("href","#")}" target="${this.getAttr("target")}" ${this.getBoolAttr("disabled")?'aria-disabled="true"':""}><slot></slot></a>`}}a(Pt,"observedAttributes",["href","target","underline","disabled"]);n("ui-link",Pt);class Ht extends l{styles(){return`
      :host { display: block; }
      .accordion {
        border: 1px solid var(--ui-color-border, #e2e8f0);
        border-radius: var(--ui-radius-md, 0.5rem);
        overflow: hidden;
      }
    `}template(){return'<div class="accordion" part="accordion"><slot></slot></div>'}onConnected(){this.addEventListener("accordion-toggle",(e=>{this.getBoolAttr("multiple")||this.querySelectorAll("ui-accordion-item").forEach(r=>{r!==e.detail.element&&r.removeAttribute("open")}),this.emit("ui-change",{value:e.detail.value,open:e.detail.open})}))}}a(Ht,"observedAttributes",["multiple"]);class Wt extends l{get open(){return this.getBoolAttr("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}styles(){return`
      :host { display: block; }
      :host(:not(:last-child)) .item { border-bottom: 1px solid var(--ui-color-border, #e2e8f0); }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ui-space-3, 0.75rem) var(--ui-space-4, 1rem);
        cursor: pointer;
        user-select: none;
        font-weight: var(--ui-weight-medium, 500);
        font-size: var(--ui-text-sm, 0.875rem);
        color: var(--ui-color-text, #0f172a);
        background: transparent;
        transition: background 0.15s;
      }
      .header:hover { background: var(--ui-color-surface-variant, #f8fafc); }
      :host([disabled]) .header { opacity: 0.5; cursor: not-allowed; }

      .chevron {
        transition: transform 0.2s;
        font-size: 0.75em;
        color: var(--ui-color-text-secondary, #64748b);
      }
      :host([open]) .chevron { transform: rotate(180deg); }

      .body {
        display: none;
        padding: 0 var(--ui-space-4, 1rem) var(--ui-space-4, 1rem);
        font-size: var(--ui-text-sm, 0.875rem);
        color: var(--ui-color-text, #0f172a);
        line-height: var(--ui-leading-normal, 1.5);
      }
      :host([open]) .body { display: block; }
    `}template(){const e=this.getAttr("label","");return`
      <div class="item" part="item">
        <div class="header" role="button" aria-expanded="${this.open}" part="header">
          <span>${e}</span>
          <span class="chevron" aria-hidden="true">▼</span>
        </div>
        <div class="body" role="region" part="body">
          <slot></slot>
        </div>
      </div>
    `}onRendered(){var e;(e=this.$(".header"))==null||e.addEventListener("click",()=>{this.getBoolAttr("disabled")||(this.open=!this.open,this.render(),this.dispatchEvent(new CustomEvent("accordion-toggle",{bubbles:!0,composed:!0,detail:{value:this.getAttr("value"),open:this.open,element:this}})))})}}a(Wt,"observedAttributes",["value","label","open","disabled"]);n("ui-accordion",Ht);n("ui-accordion-item",Wt);class Xt extends l{styles(){return`
      :host { display: block; }

      .paper {
        background: var(--ui-color-surface, #fff);
        border-radius: var(--ui-radius-lg, 0.75rem);
        padding: var(--ui-space-4, 1rem);
      }
      .paper.variant-outlined {
        border: 1px solid var(--ui-color-border, #e2e8f0);
      }
      .paper.variant-flat {
        background: var(--ui-color-surface-variant, #f8fafc);
      }
      .paper.elevation-0 { box-shadow: none; }
      .paper.elevation-1 { box-shadow: 0 1px 2px rgba(0,0,0,.05); }
      .paper.elevation-2 { box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06); }
      .paper.elevation-3 { box-shadow: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06); }
      .paper.elevation-4 { box-shadow: 0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05); }
      .paper.elevation-5 { box-shadow: 0 20px 25px rgba(0,0,0,.1), 0 8px 10px rgba(0,0,0,.04); }
    `}template(){const e=this.getAttr("variant","elevated"),t=this.getNumAttr("elevation",2);return`
      <div class="paper variant-${e} ${e==="elevated"?`elevation-${t}`:""}" part="paper">
        <slot></slot>
      </div>
    `}}a(Xt,"observedAttributes",["variant","elevation"]);n("ui-paper",Xt);class Ut extends l{styles(){return":host{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--_duration,180ms) ease}:host([open]){grid-template-rows:1fr}.content{overflow:hidden}:host([horizontal]){display:block;max-width:0;transition:max-width var(--_duration,180ms) ease}:host([horizontal][open]){max-width:100%}"}template(){return`<div class="content" style="--_duration:${this.getNumAttr("duration",180)}ms"><slot></slot></div>`}}a(Ut,"observedAttributes",["open","duration","horizontal"]);n("ui-collapse",Ut);class Vt extends l{styles(){return":host { display: block; }"}template(){const e=this.getAttr("p"),t=this.getAttr("m"),r=this.getAttr("display"),o=this.getAttr("bg"),i=[e?`padding:${e}`:"",t?`margin:${t}`:"",r?`display:${r}`:"",o?`background:${o}`:""].filter(Boolean).join(";");return`<div ${i?`style="${i}"`:""} part="box"><slot></slot></div>`}}a(Vt,"observedAttributes",["p","m","display","bg"]);n("ui-box",Vt);class Ot extends l{styles(){return`
      :host { display: flex; }
    `}template(){const e=this.getAttr("direction","column"),t=this.getAttr("gap","var(--ui-space-3, 0.75rem)"),r=this.getAttr("align"),o=this.getAttr("justify"),i=this.getBoolAttr("wrap");return`<div style="${["display:flex",`flex-direction:${e}`,`gap:${t}`,r?`align-items:${r}`:"",o?`justify-content:${o}`:"",i?"flex-wrap:wrap":""].filter(Boolean).join(";")}" part="stack"><slot></slot></div>`}}a(Ot,"observedAttributes",["direction","gap","align","justify","wrap"]);n("ui-stack",Ot);class Yt extends l{styles(){return":host { display: block; }"}template(){const e=this.getAttr("columns","repeat(12, 1fr)"),t=this.getAttr("gap","var(--ui-space-4, 1rem)"),r=this.getAttr("rows");return`<div style="${["display:grid",`grid-template-columns:${e}`,`gap:${t}`,r?`grid-template-rows:${r}`:""].filter(Boolean).join(";")}" part="grid"><slot></slot></div>`}}a(Yt,"observedAttributes",["columns","gap","rows"]);n("ui-grid",Yt);class Kt extends l{styles(){return`
      :host { display: block; }
      .divider {
        border: none;
        background: var(--ui-color-border, #e2e8f0);
      }
      .divider.horizontal {
        height: 1px;
        width: 100%;
      }
      .divider.vertical {
        width: 1px;
        height: 100%;
        min-height: 1em;
        display: inline-block;
      }
    `}template(){const e=this.getAttr("orientation","horizontal"),t=this.getAttr("color");return`<hr class="divider ${e}" role="separator" aria-orientation="${e}" ${t?`style="background:${t}"`:""} part="divider" />`}}a(Kt,"observedAttributes",["orientation","color"]);n("ui-divider",Kt);class Qt extends l{styles(){return":host{display:block;width:100%}.container{width:100%;max-width:var(--_max,72rem);margin-inline:auto;padding-inline:var(--_pad,1rem)}"}template(){const e=this.getAttr("max-width","lg"),t={xs:"28rem",sm:"40rem",md:"52rem",lg:"64rem",xl:"80rem"};return`<div class="container" style="--_max:${this.getBoolAttr("fluid")?"none":t[e]??e};--_pad:${this.getAttr("padding","1rem")}"><slot></slot></div>`}}a(Qt,"observedAttributes",["max-width","padding","fluid"]);n("ui-container",Qt);class Jt extends l{styles(){return":host{display:block}.flex{display:flex;flex-direction:var(--_direction,row);gap:var(--_gap,0);align-items:var(--_align,stretch);justify-content:var(--_justify,flex-start);flex-wrap:var(--_wrap,nowrap)}:host([inline]){display:inline-block}.flex{width:100%}"}template(){const e={start:"flex-start",end:"flex-end",between:"space-between",around:"space-around",evenly:"space-evenly"},t=(r,o)=>e[this.getAttr(r)]??this.getAttr(r,o);return`<div class="flex" style="--_direction:${this.getAttr("direction","row")};--_gap:${this.getAttr("gap","0")};--_align:${t("align","stretch")};--_justify:${t("justify","flex-start")};--_wrap:${this.getBoolAttr("wrap")?"wrap":"nowrap"}"><slot></slot></div>`}}a(Jt,"observedAttributes",["direction","gap","align","justify","wrap","inline"]);n("ui-flex",Jt);class Zt extends l{styles(){return":host{display:block}.center{display:grid;place-items:center;min-height:var(--_min,auto)}:host([inline]){display:inline-block}"}template(){return`<div class="center" style="--_min:${this.getAttr("min-height","auto")}"><slot></slot></div>`}}a(Zt,"observedAttributes",["inline","min-height"]);n("ui-center",Zt);class Gt extends l{styles(){return":host{display:block;flex:1 1 auto}.spacer{min-width:var(--_size,0);min-height:var(--_size,0)}"}template(){return`<span class="spacer" style="--_size:${this.getAttr("size","0")}"></span>`}}a(Gt,"observedAttributes",["size"]);n("ui-spacer",Gt);class te extends l{styles(){return":host{display:block;width:100%}.frame{width:100%;aspect-ratio:var(--_ratio,16/9);overflow:hidden;position:relative}::slotted(*){width:100%;height:100%;object-fit:cover}"}template(){return`<div class="frame" style="--_ratio:${this.getAttr("ratio","16/9")}"><slot></slot></div>`}}a(te,"observedAttributes",["ratio"]);n("ui-aspect-ratio",te);class ee extends l{styles(){return":host{display:block}.viewport{height:var(--_height,auto);max-height:var(--_max,20rem);overflow:auto;scrollbar-width:thin;scrollbar-color:var(--ui-color-border,#64748b) transparent}.viewport::-webkit-scrollbar{width:8px;height:8px}.viewport::-webkit-scrollbar-thumb{background:var(--ui-color-border,#64748b);border-radius:999px}"}template(){return`<div class="viewport" tabindex="0" style="--_height:${this.getAttr("height","auto")};--_max:${this.getAttr("max-height","20rem")}"><slot></slot></div>`}}a(ee,"observedAttributes",["height","max-height","orientation"]);n("ui-scroll-area",ee);class re extends l{styles(){return":host{display:block}.masonry{column-count:var(--_columns,3);column-gap:var(--_gap,1rem)}::slotted(*){break-inside:avoid;display:block;margin-bottom:var(--_gap,1rem)}@media(max-width:720px){.masonry{column-count:min(2,var(--_columns,3))}}"}template(){return`<div class="masonry" style="--_columns:${this.getNumAttr("columns",3)};--_gap:${this.getAttr("gap","1rem")}"><slot></slot></div>`}}a(re,"observedAttributes",["columns","gap"]);n("ui-masonry",re);class ie extends l{constructor(){super(...arguments);a(this,"dragging",!1)}styles(){return":host{display:block;width:100%;height:100%}.split{display:grid;grid-template-columns:var(--_position,50%) .4rem 1fr;height:100%;min-height:10rem}:host([orientation=vertical]) .split{grid-template-columns:1fr;grid-template-rows:var(--_position,50%) .4rem 1fr}.separator{background:var(--ui-color-border,#cbd5e1);cursor:col-resize;touch-action:none}.separator:hover,.separator:focus{outline:0;background:var(--ui-color-primary,#4f46e5)}:host([orientation=vertical]) .separator{cursor:row-resize}.pane{min-width:0;min-height:0;overflow:auto}"}template(){return`<div class="split" style="--_position:${this.getNumAttr("position",50)}%"><div class="pane"><slot name="first"></slot></div><div class="separator" role="separator" tabindex="0" aria-valuenow="${this.getNumAttr("position",50)}" aria-valuemin="${this.getNumAttr("min",15)}" aria-valuemax="${this.getNumAttr("max",85)}"></div><div class="pane"><slot name="second"></slot></div></div>`}onRendered(){const t=this.$(".separator"),r=this.$(".split"),o=i=>{const d=Math.min(this.getNumAttr("max",85),Math.max(this.getNumAttr("min",15),i));this.setAttribute("position",String(d)),this.emit("ui-resize",{position:d})};t==null||t.addEventListener("pointerdown",i=>{this.dragging=!0,t.setPointerCapture(i.pointerId)}),t==null||t.addEventListener("pointermove",i=>{if(!this.dragging||!r)return;const d=r.getBoundingClientRect();o(this.getAttr("orientation")==="vertical"?(i.clientY-d.top)/d.height*100:(i.clientX-d.left)/d.width*100)}),t==null||t.addEventListener("pointerup",()=>{this.dragging=!1}),t==null||t.addEventListener("keydown",i=>{const d=i.key==="ArrowLeft"||i.key==="ArrowUp"?-2:i.key==="ArrowRight"||i.key==="ArrowDown"?2:0;d&&(i.preventDefault(),o(this.getNumAttr("position",50)+d))})}}a(ie,"observedAttributes",["orientation","position","min","max"]);n("ui-split-pane",ie);class se extends l{styles(){return':host{display:block;width:100%;height:100%}.viewport{display:grid;grid-template-columns:var(--_side,15rem) minmax(0,1fr) var(--_inspect,18rem);grid-template-rows:var(--_header,3.5rem) minmax(0,1fr) var(--_footer,2.5rem);grid-template-areas:"header header header" "sidebar main inspector" "footer footer footer";width:100%;height:100%;min-height:24rem}.header{grid-area:header}.sidebar{grid-area:sidebar;overflow:auto}.main{grid-area:main;overflow:auto;min-width:0}.inspector{grid-area:inspector;overflow:auto}.footer{grid-area:footer}.region{border:1px solid var(--ui-color-border,#cbd5e1);background:var(--ui-color-surface)}@media(max-width:900px){.viewport{grid-template-columns:minmax(0,1fr);grid-template-areas:"header" "main" "footer"}.sidebar,.inspector{display:none}}'}template(){return`<div class="viewport" style="--_side:${this.getAttr("sidebar-width","15rem")};--_inspect:${this.getAttr("inspector-width","18rem")};--_header:${this.getAttr("header-height","3.5rem")};--_footer:${this.getAttr("footer-height","2.5rem")}"><header class="region header"><slot name="header"></slot></header><aside class="region sidebar"><slot name="sidebar"></slot></aside><main class="region main"><slot></slot></main><aside class="region inspector"><slot name="inspector"></slot></aside><footer class="region footer"><slot name="footer"></slot></footer></div>`}}a(se,"observedAttributes",["sidebar-width","inspector-width","header-height","footer-height"]);n("ui-viewport-layout",se);class oe extends l{styles(){return`
      :host { display: contents; }

      :host([mode="dark"]) {
        --ui-color-surface:         #0f172a;
        --ui-color-surface-variant: #1e293b;
        --ui-color-surface-inverse: #f8fafc;
        --ui-color-text:            #f1f5f9;
        --ui-color-text-secondary:  #94a3b8;
        --ui-color-text-disabled:   #475569;
        --ui-color-text-inverse:    #0f172a;
        --ui-color-border:          #334155;
        --ui-color-border-strong:   #475569;
        --ui-color-primary:         #818cf8;
        --ui-color-primary-hover:   #6366f1;
        --ui-color-primary-subtle:  rgba(129,140,248,.12);
        --ui-color-secondary:       #a78bfa;
        --ui-color-secondary-subtle:rgba(167,139,250,.12);
        --ui-color-neutral:         #94a3b8;
        --ui-color-neutral-subtle:  rgba(148,163,184,.12);
        --ui-color-success:         #4ade80;
        --ui-color-success-subtle:  rgba(74,222,128,.12);
        --ui-color-warning:         #fbbf24;
        --ui-color-warning-subtle:  rgba(251,191,36,.12);
        --ui-color-error:           #f87171;
        --ui-color-error-subtle:    rgba(248,113,113,.12);
        --ui-color-info:            #60a5fa;
        --ui-color-info-subtle:     rgba(96,165,250,.12);
        --ui-alert-success-bg:      rgba(74,222,128,.12);
        --ui-alert-info-bg:         rgba(96,165,250,.12);
        --ui-alert-warning-bg:      rgba(251,191,36,.12);
        --ui-alert-error-bg:        rgba(248,113,113,.12);
        --ui-gray-50:  #0f172a;
        --ui-gray-100: #1e293b;
        --ui-gray-200: #334155;
        --ui-gray-300: #475569;
        --ui-gray-400: #64748b;
        --ui-gray-500: #94a3b8;
        --ui-gray-600: #cbd5e1;
        --ui-gray-700: #e2e8f0;
        --ui-gray-800: #f1f5f9;
        --ui-gray-900: #f8fafc;
      }
    `}template(){return"<slot></slot>"}}a(oe,"observedAttributes",["mode"]);n("ui-theme-provider",oe);const w={version:1,query:"",filters:{},timeWindow:null,selection:null,compare:{enabled:!1},panels:{}};function k(s){return{...w,...s,filters:{...w.filters,...(s==null?void 0:s.filters)??{}},compare:{...w.compare,...(s==null?void 0:s.compare)??{}},panels:_e(w.panels,s==null?void 0:s.panels)}}function Ae(s,e){switch(e.type){case"setQuery":return{...s,query:e.query};case"setFilter":return{...s,filters:$(s.filters,e.key,e.value)};case"setPanelFilter":{const t=s.panels[e.panelId]??{};return{...s,panels:{...s.panels,[e.panelId]:{...t,filters:$(t.filters??{},e.key,e.value)}}}}case"setTimeWindow":return{...s,timeWindow:e.timeWindow?{...e.timeWindow}:null};case"setSelection":return{...s,selection:ze(e.selection)};case"setCompare":return{...s,compare:{...s.compare,...e.compare}};case"patchPanelState":{const t=s.panels[e.panelId]??{},r={...t,...e.patch,filters:e.patch.filters?{...t.filters??{},...e.patch.filters}:t.filters};return{...s,panels:{...s.panels,[e.panelId]:r}}}case"restoreSavedView":return k(e.view);case"reset":return k(e.state);default:return s}}function $e(s){let e=k(s);const t=new Set,r=i=>{e=Ae(e,i);for(const d of t)d(e)};return{getState(){return e},dispatch:r,subscribe(i){return t.add(i),()=>{t.delete(i)}},actions:{setQuery(i){r({type:"setQuery",query:i})},setFilter(i,d){r({type:"setFilter",key:i,value:d})},setPanelFilter(i,d,c){r({type:"setPanelFilter",panelId:i,key:d,value:c})},setTimeWindow(i){r({type:"setTimeWindow",timeWindow:i})},setSelection(i){r({type:"setSelection",selection:i})},setCompare(i){r({type:"setCompare",compare:i})},patchPanelState(i,d){r({type:"patchPanelState",panelId:i,patch:d})},restoreSavedView(i){r({type:"restoreSavedView",view:i})},reset(i){r({type:"reset",state:i})}}}}function $(s,e,t){const r={...s};return t===void 0?(delete r[e],r):(r[e]=t,r)}function _e(s,e){var r;const t={};for(const[o,i]of Object.entries(s))t[o]={...i,filters:i.filters?{...i.filters}:void 0};for(const[o,i]of Object.entries(e??{}))t[o]={...t[o]??{},...i,filters:{...((r=t[o])==null?void 0:r.filters)??{},...i.filters??{}}};return t}function ze(s){return s?{...s,meta:s.meta?{...s.meta}:void 0}:null}const ae={background:"#0b1220",surface:"#101a2d",surfaceMuted:"#162238",border:"#22324d",text:"#e6edf7",textMuted:"#99abc7",accent:"#4c8dff",accentSoft:"rgba(76, 141, 255, 0.18)",positive:"#29b37d",warning:"#f2b84b",danger:"#ef6464",navWidth:"248px",inspectorWidth:"320px",topbarHeight:"72px",statusHeight:"36px",radius:"16px",gap:"16px",panelPadding:"16px",shadow:"0 18px 44px rgba(3, 10, 24, 0.28)",fontFamily:'"Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif'},Ee={background:"#f5f7fb",surface:"#ffffff",surfaceMuted:"#eef3fb",border:"#d8e2f1",text:"#122033",textMuted:"#5f718a",accent:"#2764ff",accentSoft:"rgba(39, 100, 255, 0.12)",positive:"#1f8b5f",warning:"#b8800e",danger:"#c53f3f",navWidth:"248px",inspectorWidth:"320px",topbarHeight:"72px",statusHeight:"36px",radius:"16px",gap:"16px",panelPadding:"16px",shadow:"0 18px 44px rgba(15, 23, 42, 0.08)",fontFamily:'"Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif'},Se={...ae,background:"#05070a",surface:"#0c1117",surfaceMuted:"#111923",border:"#93a4c2",text:"#ffffff",textMuted:"#c8d3e5",accent:"#7fb0ff",accentSoft:"rgba(127, 176, 255, 0.2)",positive:"#6ce3aa",warning:"#ffd56b",danger:"#ff9b9b"};function Le(s="dark",e){return{...s==="light"?Ee:s==="high-contrast"?Se:ae,...e}}function Be(s){return{"--rlwb-bg":s.background,"--rlwb-surface":s.surface,"--rlwb-surface-muted":s.surfaceMuted,"--rlwb-border":s.border,"--rlwb-text":s.text,"--rlwb-text-muted":s.textMuted,"--rlwb-accent":s.accent,"--rlwb-accent-soft":s.accentSoft,"--rlwb-positive":s.positive,"--rlwb-warning":s.warning,"--rlwb-danger":s.danger,"--rlwb-nav-width":s.navWidth,"--rlwb-inspector-width":s.inspectorWidth,"--rlwb-topbar-height":s.topbarHeight,"--rlwb-status-height":s.statusHeight,"--rlwb-radius":s.radius,"--rlwb-gap":s.gap,"--rlwb-panel-padding":s.panelPadding,"--rlwb-shadow":s.shadow,"--rlwb-font-family":s.fontFamily}}const _=[{label:"1h",value:{preset:"1h",label:"Last hour"}},{label:"24h",value:{preset:"24h",label:"Last 24 hours"}},{label:"7d",value:{preset:"7d",label:"Last 7 days"}},{label:"30d",value:{preset:"30d",label:"Last 30 days"}}];function x(s,e){if(e)return e;const t=s.closest("ui-workbench-shell");return(t==null?void 0:t.workbenchStore)??(t==null?void 0:t.store)??null}function Ne(s,e){const t=Be(Le(s,e));return Object.entries(t).map(([r,o])=>`${r}:${o}`).join(";")}function v(s){return s?s.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.ELEMENT_NODE?!0:e.nodeType===Node.TEXT_NODE?(e.textContent??"").trim().length>0:!1):!1}function f(s){return(s==null?"":String(s)).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ne(s,e){return Array.isArray(s)&&Array.isArray(e)?s.length!==e.length?!1:s.every((t,r)=>t===e[r]):s===e}function Ce(s,e){return Array.isArray(s)&&!Array.isArray(e)?s.includes(e):ne(s,e)}function Ie(s,e,t){if(!t)return ne(s,e)?void 0:e;const r=Array.isArray(e)?e[0]:e,o=Array.isArray(s)?[...s]:s===void 0?[]:[s],i=o.findIndex(d=>d===r);return i>=0?o.splice(i,1):o.push(r),o.length>0?o:void 0}function Te(s,e){return!s&&!e?!0:!s||!e?!1:s.preset===e.preset&&s.from===e.from&&s.to===e.to&&s.timezone===e.timezone&&s.label===e.label}function Re(s){if(!s)return"";const e=[["Panel",s.panelId],["Entity",s.entityId],["Series",s.seriesId],["Point",s.pointId],["Label",s.label]];for(const[r,o]of Object.entries(s.meta??{}))e.push([r,typeof o=="object"?JSON.stringify(o):o]);const t=e.filter(([,r])=>r!=null&&String(r).trim().length>0).map(([r,o])=>`<dt>${f(r)}</dt><dd>${f(o)}</dd>`).join("");return t?`<dl class="rlwb-selection-list">${t}</dl>`:""}const m=`
  :host {
    display: block;
    box-sizing: border-box;
    min-width: 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  [data-rl-workbench] {
    color: var(--rlwb-text);
    background: var(--rlwb-bg);
    font-family: var(--rlwb-font-family);
  }

  .rlwb-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    height: 100%;
    min-height: var(--rlwb-shell-min-height, 100vh);
    background:
      radial-gradient(circle at top right, rgba(76, 141, 255, 0.08), transparent 26%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0)),
      var(--rlwb-bg);
  }

  .rlwb-shell--has-nav {
    grid-template-columns: var(--rlwb-nav-width) minmax(0, 1fr);
  }

  .rlwb-shell__nav,
  .rlwb-shell__topbar,
  .rlwb-shell__status,
  .rlwb-shell__inspector,
  .rlwb-panel,
  .rlwb-inspector {
    backdrop-filter: blur(16px);
  }

  .rlwb-shell__nav {
    border-right: 1px solid var(--rlwb-border);
    background: linear-gradient(180deg, var(--rlwb-surface), var(--rlwb-surface-muted));
    padding: calc(var(--rlwb-gap) * 1.25);
  }

  .rlwb-shell__frame {
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .rlwb-shell__topbar {
    min-height: var(--rlwb-topbar-height);
    border-bottom: 1px solid var(--rlwb-border);
    background: color-mix(in srgb, var(--rlwb-surface) 88%, transparent);
    padding: 0 var(--rlwb-gap);
    display: flex;
    align-items: center;
    gap: calc(var(--rlwb-gap) * 1.25);
    flex-wrap: wrap;
  }

  .rlwb-shell__body {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .rlwb-shell--has-inspector .rlwb-shell__body {
    grid-template-columns: minmax(0, 1fr) var(--rlwb-inspector-width);
  }

  .rlwb-shell__workspace {
    min-width: 0;
    padding: var(--rlwb-gap);
  }

  .rlwb-shell__inspector {
    border-left: 1px solid var(--rlwb-border);
    background: color-mix(in srgb, var(--rlwb-surface) 92%, transparent);
    padding: var(--rlwb-gap);
    overflow: auto;
  }

  .rlwb-shell__status {
    min-height: var(--rlwb-status-height);
    border-top: 1px solid var(--rlwb-border);
    background: color-mix(in srgb, var(--rlwb-surface) 84%, transparent);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 var(--rlwb-gap);
    color: var(--rlwb-text-muted);
    font-size: 12px;
  }

  .rlwb-panel-layout {
    display: grid;
    gap: var(--rlwb-gap);
  }

  .rlwb-panel-layout--dense {
    grid-auto-flow: dense;
  }

  .rlwb-panel,
  .rlwb-inspector {
    border: 1px solid var(--rlwb-border);
    border-radius: var(--rlwb-radius);
    background: color-mix(in srgb, var(--rlwb-surface) 94%, transparent);
    box-shadow: var(--rlwb-shadow);
  }

  .rlwb-panel {
    min-width: 0;
    min-height: 220px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
  }

  .rlwb-panel--collapsed {
    min-height: auto;
  }

  .rlwb-panel__header,
  .rlwb-inspector__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--rlwb-border);
  }

  .rlwb-panel__titles {
    min-width: 0;
    display: grid;
    gap: 4px;
  }

  .rlwb-panel__title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .rlwb-panel__subtitle {
    color: var(--rlwb-text-muted);
    font-size: 12px;
  }

  .rlwb-panel__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rlwb-panel__body,
  .rlwb-inspector__body {
    min-width: 0;
    min-height: 0;
  }

  .rlwb-panel__body {
    padding: var(--rlwb-panel-padding);
  }

  .rlwb-panel--padding-none .rlwb-panel__body {
    padding: 0;
  }

  .rlwb-panel--padding-sm .rlwb-panel__body {
    padding: 12px;
  }

  .rlwb-panel--padding-md .rlwb-panel__body {
    padding: var(--rlwb-panel-padding);
  }

  .rlwb-panel__footer {
    border-top: 1px solid var(--rlwb-border);
    padding: 12px 16px;
    color: var(--rlwb-text-muted);
    font-size: 12px;
  }

  .rlwb-panel--tone-positive {
    box-shadow: inset 0 1px 0 rgba(41, 179, 125, 0.4), var(--rlwb-shadow);
  }

  .rlwb-panel--tone-warning {
    box-shadow: inset 0 1px 0 rgba(242, 184, 75, 0.4), var(--rlwb-shadow);
  }

  .rlwb-panel--tone-danger {
    box-shadow: inset 0 1px 0 rgba(239, 100, 100, 0.4), var(--rlwb-shadow);
  }

  .rlwb-filter-bar,
  .rlwb-query-bar,
  .rlwb-time-range,
  .rlwb-filter-group,
  .rlwb-filter-group__options {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .rlwb-query-bar {
    min-width: min(100%, 360px);
  }

  .rlwb-query-label {
    color: var(--rlwb-text-muted);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .rlwb-query-input {
    width: 100%;
    min-height: 38px;
    border: 1px solid var(--rlwb-border);
    border-radius: 999px;
    background: color-mix(in srgb, var(--rlwb-surface) 88%, transparent);
    color: var(--rlwb-text);
    padding: 0 14px;
    font: inherit;
  }

  .rlwb-query-input::placeholder {
    color: var(--rlwb-text-muted);
  }

  .rlwb-query-input:focus-visible {
    outline: 2px solid var(--rlwb-accent);
    outline-offset: 2px;
  }

  .rlwb-filter-group__label {
    color: var(--rlwb-text-muted);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .rlwb-filter-chip,
  .rlwb-icon-button {
    border: 1px solid var(--rlwb-border);
    background: var(--rlwb-surface-muted);
    color: var(--rlwb-text);
    border-radius: 999px;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
  }

  .rlwb-filter-chip {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
  }

  .rlwb-icon-button {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .rlwb-filter-chip[aria-pressed="true"],
  .rlwb-icon-button:hover,
  .rlwb-filter-chip:hover {
    background: var(--rlwb-accent-soft);
    border-color: var(--rlwb-accent);
  }

  .rlwb-filter-chip:focus-visible,
  .rlwb-icon-button:focus-visible {
    outline: 2px solid var(--rlwb-accent);
    outline-offset: 2px;
  }

  .rlwb-inspector__body {
    padding: var(--rlwb-panel-padding);
  }

  .rlwb-empty-state {
    color: var(--rlwb-text-muted);
    font-size: 13px;
    line-height: 1.5;
  }

  .rlwb-selection-list {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 12px;
    margin: 0;
  }

  .rlwb-selection-list dt {
    color: var(--rlwb-text-muted);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .rlwb-selection-list dd {
    margin: 0;
    font-size: 13px;
  }

  .rlwb-hidden {
    display: none !important;
  }

  @media (max-width: 1080px) {
    .rlwb-shell--has-nav {
      grid-template-columns: minmax(0, 1fr);
    }

    .rlwb-shell__nav {
      display: none;
    }

    .rlwb-shell--has-inspector .rlwb-shell__body {
      grid-template-columns: minmax(0, 1fr);
    }

    .rlwb-shell__inspector {
      border-left: 0;
      border-top: 1px solid var(--rlwb-border);
    }

    .rlwb-query-bar {
      min-width: 100%;
    }
  }
`;class le extends l{constructor(){super(...arguments);a(this,"_store");a(this,"_theme");a(this,"_initialState");a(this,"hasNav",!1);a(this,"hasInspector",!1);a(this,"hasTopbar",!1);a(this,"hasStatus",!1)}get tone(){return this.getAttribute("tone")??"dark"}set tone(t){this.setAttribute("tone",t)}get theme(){return this._theme}set theme(t){this._theme=t,this.render()}get initialState(){return this._initialState}set initialState(t){this._initialState=t,this._store||this.render()}get store(){return this._store||(this._store=$e(this._initialState)),this._store}set store(t){this._store=t??void 0,this.render()}get workbenchStore(){return this.store}styles(){return m}template(){return`
      <div data-rl-workbench="" class="${["rlwb-shell",this.hasNav&&"rlwb-shell--has-nav",this.hasInspector&&"rlwb-shell--has-inspector"].filter(Boolean).join(" ")}" style="${Ne(this.tone,this._theme)}">
        <aside class="rlwb-shell__nav${this.hasNav?"":" rlwb-hidden"}">
          <slot name="nav"></slot>
        </aside>
        <div class="rlwb-shell__frame">
          <header class="rlwb-shell__topbar${this.hasTopbar?"":" rlwb-hidden"}">
            <slot name="topbar"></slot>
          </header>
          <div class="rlwb-shell__body">
            <main class="rlwb-shell__workspace">
              <slot></slot>
            </main>
            <aside class="rlwb-shell__inspector${this.hasInspector?"":" rlwb-hidden"}">
              <slot name="inspector"></slot>
            </aside>
          </div>
          <footer class="rlwb-shell__status${this.hasStatus?"":" rlwb-hidden"}">
            <slot name="status"></slot>
          </footer>
        </div>
      </div>
    `}onRendered(){const t=this.$('slot[name="nav"]'),r=this.$('slot[name="topbar"]'),o=this.$('slot[name="inspector"]'),i=this.$('slot[name="status"]'),d=()=>{const c=v(t),p=v(r),u=v(o),h=v(i);(c!==this.hasNav||p!==this.hasTopbar||u!==this.hasInspector||h!==this.hasStatus)&&(this.hasNav=c,this.hasTopbar=p,this.hasInspector=u,this.hasStatus=h,this.render())};t==null||t.addEventListener("slotchange",d),r==null||r.addEventListener("slotchange",d),o==null||o.addEventListener("slotchange",d),i==null||i.addEventListener("slotchange",d),d()}}a(le,"observedAttributes",["tone"]);n("ui-workbench-shell",le);class de extends l{styles(){return m}template(){const e=this.getAttribute("columns"),t=this.getAttribute("rows")??"",r=this.getAttribute("min-column-width"),o=r?`repeat(auto-fit, minmax(${r}, 1fr))`:e?/^\d+$/.test(e)?`repeat(${e}, 1fr)`:e:"repeat(auto-fit, minmax(320px, 1fr))";return`
      <div
        class="${["rlwb-panel-layout",this.hasAttribute("dense")&&"rlwb-panel-layout--dense"].filter(Boolean).join(" ")}"
        style="grid-template-columns:${o};${t?`grid-template-rows:${t};`:""}"
      >
        <slot></slot>
      </div>
    `}}a(de,"observedAttributes",["columns","rows","min-column-width","dense"]);n("ui-workbench-panel-layout",de);class ce extends l{constructor(){super(...arguments);a(this,"_store");a(this,"unsubscribe");a(this,"localPanelState",{});a(this,"hasFooter",!1)}get store(){return this._store}set store(t){this._store=t,this.syncSubscription(),this.render()}onConnected(){this.syncSubscription()}onDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=void 0}styles(){return m}template(){const t=this.getAttribute("title")??"",r=this.getAttribute("subtitle")??"",o=this.getAttribute("padding")??"md",i=this.getAttribute("tone")??"default",d=this.getPanelState(),c=this.hasAttribute("collapsible"),p=!!d.collapsed;return`
      <section class="${["rlwb-panel",p&&"rlwb-panel--collapsed",`rlwb-panel--padding-${o}`,i!=="default"&&`rlwb-panel--tone-${i}`].filter(Boolean).join(" ")}">
        <header class="rlwb-panel__header">
          <div class="rlwb-panel__titles">
            <div class="rlwb-panel__title">${t}</div>
            ${r?`<div class="rlwb-panel__subtitle">${r}</div>`:""}
          </div>
          <div class="rlwb-panel__actions">
            <slot name="actions"></slot>
            ${c?'<button class="rlwb-icon-button" type="button" data-action="toggle" aria-label="Toggle panel">⌄</button>':""}
          </div>
        </header>
        <div class="rlwb-panel__body${p?" rlwb-hidden":""}">
          <slot></slot>
        </div>
        <footer class="rlwb-panel__footer${this.hasFooter?"":" rlwb-hidden"}">
          <slot name="footer"></slot>
        </footer>
      </section>
    `}onRendered(){const t=this.$('[data-action="toggle"]');t==null||t.addEventListener("click",()=>{const i=this.getAttribute("panel-id"),d=this.getPanelState(),c={collapsed:!d.collapsed},p=this.resolveStore();i&&p?p.actions.patchPanelState(i,c):(this.localPanelState={...d,...c},this.render())});const r=this.$('slot[name="footer"]'),o=()=>{const i=v(r);i!==this.hasFooter&&(this.hasFooter=i,this.render())};r==null||r.addEventListener("slotchange",o),o()}resolveStore(){return x(this,this._store)}getPanelState(){const t=this.getAttribute("panel-id"),r=this.resolveStore(),o=t&&r?r.getState().panels[t]:void 0;return{collapsed:this.hasAttribute("default-collapsed"),...this.localPanelState,...o}}syncSubscription(){var o;(o=this.unsubscribe)==null||o.call(this);const t=this.resolveStore(),r=this.getAttribute("panel-id");!t||!r||!this.isConnected||(this.unsubscribe=t.subscribe(()=>{this.render()}))}}a(ce,"observedAttributes",["panel-id","title","subtitle","collapsible","default-collapsed","padding","tone"]);n("ui-workbench-panel",ce);class ue extends l{constructor(){super(...arguments);a(this,"_store");a(this,"unsubscribe")}get store(){return this._store}set store(t){this._store=t,this.syncSubscription(),this.render()}onConnected(){this.syncSubscription()}onDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=void 0}styles(){return m}template(){var i;const t=this.getAttribute("label")??"Query",r=this.getAttribute("placeholder")??"Search, scope, or command",o=((i=this.resolveStore())==null?void 0:i.getState().query)??"";return`
      <label class="rlwb-query-bar">
        <span class="rlwb-query-label">${t}</span>
        <input class="rlwb-query-input" type="search" value="${o}" placeholder="${r}" />
      </label>
    `}onRendered(){const t=this.$(".rlwb-query-input");t==null||t.addEventListener("input",r=>{var i;const o=r.currentTarget.value;(i=this.resolveStore())==null||i.actions.setQuery(o),this.emit("ui-query-change",{value:o})})}resolveStore(){return x(this,this._store)}syncSubscription(){var r;(r=this.unsubscribe)==null||r.call(this);const t=this.resolveStore();!t||!this.isConnected||(this.unsubscribe=t.subscribe(()=>{this.render()}))}}a(ue,"observedAttributes",["label","placeholder"]);n("ui-workbench-query-bar",ue);class je extends l{constructor(){super(...arguments);a(this,"_store");a(this,"_filters",[]);a(this,"unsubscribe")}get store(){return this._store}set store(t){this._store=t,this.syncSubscription(),this.render()}get filters(){return this._filters}set filters(t){this._filters=t,this.render()}onConnected(){this.syncSubscription()}onDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=void 0}styles(){return m}template(){var o;const t=(o=this.resolveStore())==null?void 0:o.getState();return`<div class="rlwb-filter-bar">${this._filters.map(i=>{var p,u;const d=i.scope==="panel"?(u=(p=t==null?void 0:t.panels[i.panelId??""])==null?void 0:p.filters)==null?void 0:u[i.key]:t==null?void 0:t.filters[i.key],c=i.options.map((h,b)=>`
            <button
              type="button"
              class="rlwb-filter-chip"
              data-filter-key="${f(i.key)}"
              data-filter-index="${b}"
              aria-pressed="${Ce(d,h.value)}"
            >
              ${f(h.label)}
            </button>
          `).join("");return`
          <div class="rlwb-filter-group">
            <span class="rlwb-filter-group__label">${f(i.label)}</span>
            <div class="rlwb-filter-group__options">${c}</div>
          </div>
        `}).join("")}</div>`}onRendered(){this.$$(".rlwb-filter-chip").forEach(t=>{t.addEventListener("click",()=>{var h,b;const r=t.dataset.filterKey??"",o=Number(t.dataset.filterIndex??"-1"),i=this._filters.find(g=>g.key===r),d=i==null?void 0:i.options[o],c=this.resolveStore();if(!i||!d||!c)return;const p=i.scope==="panel"?(b=(h=c.getState().panels[i.panelId??""])==null?void 0:h.filters)==null?void 0:b[i.key]:c.getState().filters[i.key],u=Ie(p,d.value,!!i.multi);i.scope==="panel"&&i.panelId?c.actions.setPanelFilter(i.panelId,i.key,u):c.actions.setFilter(i.key,u),this.emit("ui-filter-change",{key:i.key,panelId:i.panelId,scope:i.scope??"global",value:u})})})}resolveStore(){return x(this,this._store)}syncSubscription(){var r;(r=this.unsubscribe)==null||r.call(this);const t=this.resolveStore();!t||!this.isConnected||(this.unsubscribe=t.subscribe(()=>{this.render()}))}}n("ui-workbench-filter-bar",je);class De extends l{constructor(){super(...arguments);a(this,"_store");a(this,"_options",_);a(this,"unsubscribe")}get store(){return this._store}set store(t){this._store=t,this.syncSubscription(),this.render()}get options(){return this._options}set options(t){this._options=t.length>0?t:_,this.render()}onConnected(){this.syncSubscription()}onDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=void 0}styles(){return m}template(){var o;const t=(o=this.resolveStore())==null?void 0:o.getState().timeWindow;return`<div class="rlwb-time-range">${this._options.map((i,d)=>`
        <button
          type="button"
          class="rlwb-filter-chip"
          data-option-index="${d}"
          aria-pressed="${Te(t,i.value)}"
        >
          ${f(i.label)}
        </button>
      `).join("")}</div>`}onRendered(){this.$$(".rlwb-filter-chip").forEach(t=>{t.addEventListener("click",()=>{var i;const r=Number(t.dataset.optionIndex??"-1"),o=this._options[r];o&&((i=this.resolveStore())==null||i.actions.setTimeWindow(o.value),this.emit("ui-time-window-change",{value:o.value}))})})}resolveStore(){return x(this,this._store)}syncSubscription(){var r;(r=this.unsubscribe)==null||r.call(this);const t=this.resolveStore();!t||!this.isConnected||(this.unsubscribe=t.subscribe(()=>{this.render()}))}}n("ui-workbench-time-range-control",De);class pe extends l{constructor(){super(...arguments);a(this,"_store");a(this,"_renderContent");a(this,"unsubscribe");a(this,"hasActions",!1)}get store(){return this._store}set store(t){this._store=t,this.syncSubscription(),this.render()}get renderContent(){return this._renderContent}set renderContent(t){this._renderContent=t,this.render()}onConnected(){this.syncSubscription()}onDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=void 0}styles(){return m}template(){var d;const t=this.getAttribute("title")??"Inspector",r=this.getAttribute("empty-state")??"Select a record, point, or entity to inspect it here.",o=((d=this.resolveStore())==null?void 0:d.getState().selection)??null,i=this._renderContent?"":o?Re(o):`<div class="rlwb-empty-state">${r}</div>`;return`
      <section class="rlwb-inspector">
        <header class="rlwb-inspector__header">
          <div class="rlwb-panel__titles">
            <div class="rlwb-panel__title">${t}</div>
          </div>
          <div class="rlwb-panel__actions${this.hasActions?"":" rlwb-hidden"}">
            <slot name="actions"></slot>
          </div>
        </header>
        <div class="rlwb-inspector__body" data-role="body">${i}</div>
      </section>
    `}onRendered(){var c;const t=this.$('slot[name="actions"]'),r=()=>{const p=v(t);p!==this.hasActions&&(this.hasActions=p,this.render())};if(t==null||t.addEventListener("slotchange",r),r(),!this._renderContent)return;const o=this.$('[data-role="body"]');if(!o)return;o.innerHTML="";const i=((c=this.resolveStore())==null?void 0:c.getState().selection)??null,d=this._renderContent(i);if(typeof d=="string"){o.innerHTML=d;return}if(d instanceof Node){o.append(d);return}i||(o.innerHTML=`<div class="rlwb-empty-state">${this.getAttribute("empty-state")??"Select a record, point, or entity to inspect it here."}</div>`)}resolveStore(){return x(this,this._store)}syncSubscription(){var r;(r=this.unsubscribe)==null||r.call(this);const t=this.resolveStore();!t||!this.isConnected||(this.unsubscribe=t.subscribe(()=>{this.render()}))}}a(pe,"observedAttributes",["title","empty-state"]);n("ui-workbench-entity-inspector",pe);export{z as U,E as a,S as b,B as c,Q as d,vt as e,et as f,n as r};

var _=Object.defineProperty;var $=(n,t,e)=>t in n?_(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var a=(n,t,e)=>$(n,typeof t!="symbol"?t+"":t,e);class u extends HTMLElement{constructor(){super();a(this,"root");a(this,"_initialized",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){this._injectTokenSheet(),this.render(),this._initialized=!0,this.onConnected()}disconnectedCallback(){this.onDisconnected()}attributeChangedCallback(e,r,i){this._initialized&&r!==i&&this.render()}onConnected(){}onDisconnected(){}styles(){return""}render(){const e=this.styles();this.root.innerHTML=(e?`<style>${e}</style>`:"")+this.template(),this.onRendered()}onRendered(){}getBoolAttr(e){return this.hasAttribute(e)}getAttr(e,r=""){return this.getAttribute(e)??r}getNumAttr(e,r=0){const i=this.getAttribute(e);return i!==null?Number(i):r}emit(e,r){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:r}))}$(e){return this.root.querySelector(e)}$$(e){return Array.from(this.root.querySelectorAll(e))}_injectTokenSheet(){const e=new CSSStyleSheet;e.replaceSync(`
      :host {
        /* Inherit all --ui-* tokens from light DOM */
        font-family: var(--ui-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        color: var(--ui-color-text, #0f172a);
        box-sizing: border-box;
      }
      :host([hidden]) { display: none !important; }
      *, *::before, *::after { box-sizing: inherit; }
    `),this.root.adoptedStyleSheets=[e]}}function h(n,t){customElements.get(n)||customElements.define(n,t)}class f extends u{styles(){return`
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
    `}template(){const t=this.getAttr("variant","filled"),e=this.getAttr("size","md"),r=this.getBoolAttr("disabled")||this.getBoolAttr("loading"),i=this.getBoolAttr("loading");return`
      <button
        class="variant-${t} size-${e}"
        ${r?"disabled":""}
        role="button"
        part="button"
      >
        ${i?'<span class="spinner" aria-hidden="true"></span>':""}
        <slot></slot>
      </button>
    `}onRendered(){var t;(t=this.$("button"))==null||t.addEventListener("click",e=>{(this.getBoolAttr("disabled")||this.getBoolAttr("loading"))&&(e.stopPropagation(),e.preventDefault())})}}a(f,"observedAttributes",["variant","size","color","disabled","loading","full-width"]);h("ui-button",f);class m extends u{get value(){const t=this.$("input");return t?t.value:this.getAttr("value")}set value(t){this.setAttribute("value",t);const e=this.$("input");e&&(e.value=t)}styles(){return`
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
    `}template(){const t=this.getAttr("variant","outlined"),e=this.getAttr("size","md"),r=this.getAttr("label"),i=this.getAttr("placeholder"),s=this.getAttr("value"),c=this.getAttr("type","text"),d=this.getAttr("helper-text"),b=this.getBoolAttr("disabled"),o=this.getBoolAttr("readonly"),l=this.getBoolAttr("required");return`
      <div class="field" part="field">
        ${r?`<label part="label">${r}${l?' <span aria-hidden="true">*</span>':""}</label>`:""}
        <div class="input-wrap">
          <input
            class="variant-${t} size-${e}"
            type="${c}"
            ${i?`placeholder="${i}"`:""}
            ${s?`value="${s}"`:""}
            ${b?"disabled":""}
            ${o?"readonly":""}
            ${l?"required":""}
            part="input"
          />
        </div>
        ${d?`<p class="helper" part="helper">${d}</p>`:""}
      </div>
    `}onRendered(){const t=this.$("input");t&&(t.addEventListener("input",()=>{this.emit("ui-input",{value:t.value})}),t.addEventListener("change",()=>{this.emit("ui-change",{value:t.value})}))}}a(m,"observedAttributes",["variant","size","label","placeholder","value","type","helper-text","disabled","readonly","error","required"]);h("ui-text-field",m);class x extends u{get value(){const t=this.$("select");return t?t.value:this.getAttr("value")}set value(t){this.setAttribute("value",t);const e=this.$("select");e&&(e.value=t)}styles(){return`
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
    `}template(){const t=this.getAttr("size","md"),e=this.getAttr("label"),r=this.getAttr("placeholder"),i=this.getAttr("value"),s=this.getAttr("helper-text"),c=this.getBoolAttr("disabled"),d=this.getBoolAttr("multiple"),b=Array.from(this.querySelectorAll("option")).map(o=>`<option value="${o.value}" ${o.value===i?"selected":""} ${o.disabled?"disabled":""}>${o.textContent}</option>`).join("");return`
      <div class="field" part="field">
        ${e?`<label part="label">${e}</label>`:""}
        <select
          class="size-${t}"
          ${c?"disabled":""}
          ${d?"multiple":""}
          part="select"
        >
          ${r?`<option value="" disabled selected hidden>${r}</option>`:""}
          ${b}
        </select>
        ${s?`<p class="helper" part="helper">${s}</p>`:""}
      </div>
    `}onRendered(){var t;(t=this.$("select"))==null||t.addEventListener("change",e=>{const r=e.target;this.emit("ui-change",{value:r.value})})}}a(x,"observedAttributes",["size","label","placeholder","value","helper-text","disabled","error","multiple"]);h("ui-select",x);class y extends u{get checked(){return this.getBoolAttr("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}styles(){return`
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
    `}template(){const t=this.getAttr("size","md"),e=this.getBoolAttr("checked"),r=this.getAttr("label");return`
      <span class="track size-${t} ${e?"checked":""}" role="switch" aria-checked="${e}" tabindex="0" part="track">
        <span class="thumb" part="thumb"></span>
      </span>
      ${r?`<label part="label">${r}</label>`:"<slot></slot>"}
    `}onConnected(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.setAttribute("role","switch")}onRendered(){const t=this.$(".track"),e=()=>{this.getBoolAttr("disabled")||(this.checked=!this.checked,this.render(),this.emit("ui-change",{checked:this.checked}))};t==null||t.addEventListener("click",e),t==null||t.addEventListener("keydown",r=>{const i=r.key;(i===" "||i==="Enter")&&(r.preventDefault(),e())})}}a(y,"observedAttributes",["checked","disabled","size","color","label"]);h("ui-switch",y);class w extends u{styles(){return`
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
    `}template(){const t=this.getAttr("variant","filled"),e=this.getAttr("size","md"),r=this.getBoolAttr("deletable");return`
      <span class="chip variant-${t} size-${e}" part="chip">
        <slot></slot>
        ${r?'<button class="delete-btn" aria-label="Remove" part="delete">✕</button>':""}
      </span>
    `}onRendered(){var t;(t=this.$(".delete-btn"))==null||t.addEventListener("click",e=>{e.stopPropagation(),this.emit("ui-delete")})}}a(w,"observedAttributes",["variant","size","color","deletable","disabled"]);h("ui-chip",w);class k extends u{constructor(){super(...arguments);a(this,"_columns",[]);a(this,"_rows",[]);a(this,"_sortField","");a(this,"_sortDir","asc");a(this,"_page",0);a(this,"_rowIdField","");a(this,"_selectedRowId",null)}get columns(){return this._columns}set columns(e){this._columns=e,this.render()}get rows(){return this._rows}set rows(e){this._rows=e,this._page=0,this.render()}get rowIdField(){return this._rowIdField}set rowIdField(e){this._rowIdField=e,this.render()}get selectedRowId(){return this._selectedRowId}set selectedRowId(e){this._selectedRowId=e,this.render()}resolveRowId(e,r){const i=this._rowIdField?e[this._rowIdField]:void 0,s=e.id??e.cveId??e.key;return String(i??s??r)}styles(){return`
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
    `}template(){const e=this.getBoolAttr("sortable"),r=this.getNumAttr("page-size",0);if(this._columns.length===0)return'<div class="empty" part="empty">No columns configured</div>';let i=this._rows.map((o,l)=>({row:o,index:l,rowId:this.resolveRowId(o,l)}));e&&this._sortField&&i.sort((o,l)=>{const p=String(o.row[this._sortField]??""),g=String(l.row[this._sortField]??""),v=p.localeCompare(g,void 0,{numeric:!0});return this._sortDir==="asc"?v:-v});const s=r>0?Math.ceil(i.length/r):1;r>0&&(i=i.slice(this._page*r,(this._page+1)*r));const c=this._columns.map(o=>{const p=this._sortField===o.field?this._sortDir==="asc"?"▲":"▼":"",g=o.width?` style="width: ${o.width}px"`:"",v=o.align?` style="text-align: ${o.align}"`:"";return`<th class="${e&&o.sortable!==!1?"sortable":""}" data-field="${o.field}"${g}${v}>${o.headerName}${p?`<span class="sort-icon">${p}</span>`:""}</th>`}).join(""),d=i.length===0?`<tr><td colspan="${this._columns.length}" class="empty">No data</td></tr>`:i.map(o=>`<tr data-row-index="${o.index}" class="${o.rowId===this._selectedRowId?"row-selected":""}">`+this._columns.map(l=>{const p=o.row[l.field]??"";return`<td${l.align?` style="text-align:${l.align}"`:""}>${p}</td>`}).join("")+"</tr>").join(""),b=r>0&&s>1?`<div class="pagination" part="pagination">
            <span>Page ${this._page+1} of ${s}</span>
            <button data-action="prev" ${this._page===0?"disabled":""}>← Prev</button>
            <button data-action="next" ${this._page>=s-1?"disabled":""}>Next →</button>
          </div>`:"";return`
      <table part="table">
        <thead><tr>${c}</tr></thead>
        <tbody>${d}</tbody>
      </table>
      ${b}
    `}onRendered(){var e,r;this.$$("th.sortable").forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.field;this._sortField===s?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortField=s,this._sortDir="asc"),this.render(),this.emit("ui-sort",{field:this._sortField,direction:this._sortDir})})}),(e=this.$('[data-action="prev"]'))==null||e.addEventListener("click",()=>{this._page>0&&(this._page--,this.render(),this.emit("ui-page",{page:this._page}))}),(r=this.$('[data-action="next"]'))==null||r.addEventListener("click",()=>{const i=this.getNumAttr("page-size",0),s=i>0?Math.ceil(this._rows.length/i):1;this._page<s-1&&(this._page++,this.render(),this.emit("ui-page",{page:this._page}))}),this.$$("tbody tr[data-row-index]").forEach(i=>{i.addEventListener("click",()=>{const s=Number(i.dataset.rowIndex??"-1");if(s<0)return;const c=this._rows[s];if(!c)return;const d=this.resolveRowId(c,s);this._selectedRowId=d,this.render(),this.emit("ui-row-click",{rowId:d,row:c})})})}}a(k,"observedAttributes",["striped","bordered","sortable","page-size"]);h("ui-data-grid",k);class z extends u{styles(){return`
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
    `}template(){const t=this.getAttr("severity","info"),e=this.getAttr("variant","standard"),r=this.getBoolAttr("closable"),i={success:"✓",info:"ℹ",warning:"⚠",error:"✕"};return`
      <div class="alert ${{standard:"std",filled:"fill",outlined:"out"}[e]||"std"}-${t}" role="alert" part="alert">
        <span class="icon" aria-hidden="true">${i[t]||"ℹ"}</span>
        <div class="content" part="content"><slot></slot></div>
        ${r?'<button class="close-btn" aria-label="Close" part="close">✕</button>':""}
      </div>
    `}onRendered(){var t;(t=this.$(".close-btn"))==null||t.addEventListener("click",()=>{this.emit("ui-close"),this.hidden=!0})}}a(z,"observedAttributes",["severity","variant","closable"]);h("ui-alert",z);export{f as U,m as a,x as b,y as c,w as d,z as e,k as f,h as r};

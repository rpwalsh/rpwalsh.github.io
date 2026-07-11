var G=Object.defineProperty;var J=(r,t,e)=>t in r?G(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>J(r,typeof t!="symbol"?t+"":t,e);import{r as w,j as n}from"./react-runtime-D6y62UW6.js";class k extends HTMLElement{constructor(){super();p(this,"root");p(this,"_initialized",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){this._injectTokenSheet(),this.render(),this._initialized=!0,this.onConnected()}disconnectedCallback(){this.onDisconnected()}attributeChangedCallback(e,o,s){this._initialized&&o!==s&&this.render()}onConnected(){}onDisconnected(){}styles(){return""}render(){const e=this.styles();this.root.innerHTML=(e?`<style>${e}</style>`:"")+this.template(),this.onRendered()}onRendered(){}getBoolAttr(e){return this.hasAttribute(e)}getAttr(e,o=""){return this.getAttribute(e)??o}getNumAttr(e,o=0){const s=this.getAttribute(e);return s!==null?Number(s):o}emit(e,o){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:o}))}$(e){return this.root.querySelector(e)}$$(e){return Array.from(this.root.querySelectorAll(e))}_injectTokenSheet(){const e=new CSSStyleSheet;e.replaceSync(`
      :host {
        /* Inherit all --ui-* tokens from light DOM */
        font-family: var(--ui-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        color: var(--ui-color-text, #0f172a);
        box-sizing: border-box;
      }
      :host([hidden]) { display: none !important; }
      *, *::before, *::after { box-sizing: inherit; }
    `),this.root.adoptedStyleSheets=[e]}}function z(r,t){customElements.get(r)||customElements.define(r,t)}class T extends k{styles(){return`
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
    `}template(){const t=this.getAttr("variant","filled"),e=this.getAttr("size","md"),o=this.getBoolAttr("disabled")||this.getBoolAttr("loading"),s=this.getBoolAttr("loading");return`
      <button
        class="variant-${t} size-${e}"
        ${o?"disabled":""}
        role="button"
        part="button"
      >
        ${s?'<span class="spinner" aria-hidden="true"></span>':""}
        <slot></slot>
      </button>
    `}onRendered(){var t;(t=this.$("button"))==null||t.addEventListener("click",e=>{(this.getBoolAttr("disabled")||this.getBoolAttr("loading"))&&(e.stopPropagation(),e.preventDefault())})}}p(T,"observedAttributes",["variant","size","color","disabled","loading","full-width"]);z("ui-button",T);class H extends k{get value(){const t=this.$("input");return t?t.value:this.getAttr("value")}set value(t){this.setAttribute("value",t);const e=this.$("input");e&&(e.value=t)}styles(){return`
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
    `}template(){const t=this.getAttr("variant","outlined"),e=this.getAttr("size","md"),o=this.getAttr("label"),s=this.getAttr("placeholder"),i=this.getAttr("value"),l=this.getAttr("type","text"),d=this.getAttr("helper-text"),u=this.getBoolAttr("disabled"),a=this.getBoolAttr("readonly"),c=this.getBoolAttr("required");return`
      <div class="field" part="field">
        ${o?`<label part="label">${o}${c?' <span aria-hidden="true">*</span>':""}</label>`:""}
        <div class="input-wrap">
          <input
            class="variant-${t} size-${e}"
            type="${l}"
            ${s?`placeholder="${s}"`:""}
            ${i?`value="${i}"`:""}
            ${u?"disabled":""}
            ${a?"readonly":""}
            ${c?"required":""}
            part="input"
          />
        </div>
        ${d?`<p class="helper" part="helper">${d}</p>`:""}
      </div>
    `}onRendered(){const t=this.$("input");t&&(t.addEventListener("input",()=>{this.emit("ui-input",{value:t.value})}),t.addEventListener("change",()=>{this.emit("ui-change",{value:t.value})}))}}p(H,"observedAttributes",["variant","size","label","placeholder","value","type","helper-text","disabled","readonly","error","required"]);z("ui-text-field",H);class V extends k{get value(){const t=this.$("select");return t?t.value:this.getAttr("value")}set value(t){this.setAttribute("value",t);const e=this.$("select");e&&(e.value=t)}styles(){return`
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
    `}template(){const t=this.getAttr("size","md"),e=this.getAttr("label"),o=this.getAttr("placeholder"),s=this.getAttr("value"),i=this.getAttr("helper-text"),l=this.getBoolAttr("disabled"),d=this.getBoolAttr("multiple"),u=Array.from(this.querySelectorAll("option")).map(a=>`<option value="${a.value}" ${a.value===s?"selected":""} ${a.disabled?"disabled":""}>${a.textContent}</option>`).join("");return`
      <div class="field" part="field">
        ${e?`<label part="label">${e}</label>`:""}
        <select
          class="size-${t}"
          ${l?"disabled":""}
          ${d?"multiple":""}
          part="select"
        >
          ${o?`<option value="" disabled selected hidden>${o}</option>`:""}
          ${u}
        </select>
        ${i?`<p class="helper" part="helper">${i}</p>`:""}
      </div>
    `}onRendered(){var t;(t=this.$("select"))==null||t.addEventListener("change",e=>{const o=e.target;this.emit("ui-change",{value:o.value})})}}p(V,"observedAttributes",["size","label","placeholder","value","helper-text","disabled","error","multiple"]);z("ui-select",V);class q extends k{get checked(){return this.getBoolAttr("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}styles(){return`
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
    `}template(){const t=this.getAttr("size","md"),e=this.getBoolAttr("checked"),o=this.getAttr("label");return`
      <span class="track size-${t} ${e?"checked":""}" role="switch" aria-checked="${e}" tabindex="0" part="track">
        <span class="thumb" part="thumb"></span>
      </span>
      ${o?`<label part="label">${o}</label>`:"<slot></slot>"}
    `}onConnected(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.setAttribute("role","switch")}onRendered(){const t=this.$(".track"),e=()=>{this.getBoolAttr("disabled")||(this.checked=!this.checked,this.render(),this.emit("ui-change",{checked:this.checked}))};t==null||t.addEventListener("click",e),t==null||t.addEventListener("keydown",o=>{const s=o.key;(s===" "||s==="Enter")&&(o.preventDefault(),e())})}}p(q,"observedAttributes",["checked","disabled","size","color","label"]);z("ui-switch",q);class O extends k{styles(){return`
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
    `}template(){const t=this.getAttr("variant","filled"),e=this.getAttr("size","md"),o=this.getBoolAttr("deletable");return`
      <span class="chip variant-${t} size-${e}" part="chip">
        <slot></slot>
        ${o?'<button class="delete-btn" aria-label="Remove" part="delete">✕</button>':""}
      </span>
    `}onRendered(){var t;(t=this.$(".delete-btn"))==null||t.addEventListener("click",e=>{e.stopPropagation(),this.emit("ui-delete")})}}p(O,"observedAttributes",["variant","size","color","deletable","disabled"]);z("ui-chip",O);class U extends k{constructor(){super(...arguments);p(this,"_columns",[]);p(this,"_rows",[]);p(this,"_sortField","");p(this,"_sortDir","asc");p(this,"_page",0);p(this,"_rowIdField","");p(this,"_selectedRowId",null)}get columns(){return this._columns}set columns(e){this._columns=e,this.render()}get rows(){return this._rows}set rows(e){this._rows=e,this._page=0,this.render()}get rowIdField(){return this._rowIdField}set rowIdField(e){this._rowIdField=e,this.render()}get selectedRowId(){return this._selectedRowId}set selectedRowId(e){this._selectedRowId=e,this.render()}resolveRowId(e,o){const s=this._rowIdField?e[this._rowIdField]:void 0,i=e.id??e.cveId??e.key;return String(s??i??o)}styles(){return`
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
    `}template(){const e=this.getBoolAttr("sortable"),o=this.getNumAttr("page-size",0);if(this._columns.length===0)return'<div class="empty" part="empty">No columns configured</div>';let s=this._rows.map((a,c)=>({row:a,index:c,rowId:this.resolveRowId(a,c)}));e&&this._sortField&&s.sort((a,c)=>{const h=String(a.row[this._sortField]??""),b=String(c.row[this._sortField]??""),v=h.localeCompare(b,void 0,{numeric:!0});return this._sortDir==="asc"?v:-v});const i=o>0?Math.ceil(s.length/o):1;o>0&&(s=s.slice(this._page*o,(this._page+1)*o));const l=this._columns.map(a=>{const h=this._sortField===a.field?this._sortDir==="asc"?"▲":"▼":"",b=a.width?` style="width: ${a.width}px"`:"",v=a.align?` style="text-align: ${a.align}"`:"";return`<th class="${e&&a.sortable!==!1?"sortable":""}" data-field="${a.field}"${b}${v}>${a.headerName}${h?`<span class="sort-icon">${h}</span>`:""}</th>`}).join(""),d=s.length===0?`<tr><td colspan="${this._columns.length}" class="empty">No data</td></tr>`:s.map(a=>`<tr data-row-index="${a.index}" class="${a.rowId===this._selectedRowId?"row-selected":""}">`+this._columns.map(c=>{const h=a.row[c.field]??"";return`<td${c.align?` style="text-align:${c.align}"`:""}>${h}</td>`}).join("")+"</tr>").join(""),u=o>0&&i>1?`<div class="pagination" part="pagination">
            <span>Page ${this._page+1} of ${i}</span>
            <button data-action="prev" ${this._page===0?"disabled":""}>← Prev</button>
            <button data-action="next" ${this._page>=i-1?"disabled":""}>Next →</button>
          </div>`:"";return`
      <table part="table">
        <thead><tr>${l}</tr></thead>
        <tbody>${d}</tbody>
      </table>
      ${u}
    `}onRendered(){var e,o;this.$$("th.sortable").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.field;this._sortField===i?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortField=i,this._sortDir="asc"),this.render(),this.emit("ui-sort",{field:this._sortField,direction:this._sortDir})})}),(e=this.$('[data-action="prev"]'))==null||e.addEventListener("click",()=>{this._page>0&&(this._page--,this.render(),this.emit("ui-page",{page:this._page}))}),(o=this.$('[data-action="next"]'))==null||o.addEventListener("click",()=>{const s=this.getNumAttr("page-size",0),i=s>0?Math.ceil(this._rows.length/s):1;this._page<i-1&&(this._page++,this.render(),this.emit("ui-page",{page:this._page}))}),this.$$("tbody tr[data-row-index]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.rowIndex??"-1");if(i<0)return;const l=this._rows[i];if(!l)return;const d=this.resolveRowId(l,i);this._selectedRowId=d,this.render(),this.emit("ui-row-click",{rowId:d,row:l})})})}}p(U,"observedAttributes",["striped","bordered","sortable","page-size"]);z("ui-data-grid",U);class Q extends k{styles(){return`
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
    `}template(){const t=this.getAttr("severity","info"),e=this.getAttr("variant","standard"),o=this.getBoolAttr("closable"),s={success:"✓",info:"ℹ",warning:"⚠",error:"✕"};return`
      <div class="alert ${{standard:"std",filled:"fill",outlined:"out"}[e]||"std"}-${t}" role="alert" part="alert">
        <span class="icon" aria-hidden="true">${s[t]||"ℹ"}</span>
        <div class="content" part="content"><slot></slot></div>
        ${o?'<button class="close-btn" aria-label="Close" part="close">✕</button>':""}
      </div>
    `}onRendered(){var t;(t=this.$(".close-btn"))==null||t.addEventListener("click",()=>{this.emit("ui-close"),this.hidden=!0})}}p(Q,"observedAttributes",["severity","variant","closable"]);z("ui-alert",Q);function F(...r){const t=new Set,e=[];for(const o of r){if(!o)continue;const s=o.split(/\s+/);for(const i of s)i&&!t.has(i)&&(t.add(i),e.push(i))}return e.join(" ")}const N={version:1,query:"",filters:{},timeWindow:null,selection:null,compare:{enabled:!1},panels:{}};function R(r){return{...N,...r,filters:{...N.filters,...(r==null?void 0:r.filters)??{}},compare:{...N.compare,...(r==null?void 0:r.compare)??{}},panels:ee(N.panels,r==null?void 0:r.panels)}}function K(r,t){switch(t.type){case"setQuery":return{...r,query:t.query};case"setFilter":return{...r,filters:D(r.filters,t.key,t.value)};case"setPanelFilter":{const e=r.panels[t.panelId]??{};return{...r,panels:{...r.panels,[t.panelId]:{...e,filters:D(e.filters??{},t.key,t.value)}}}}case"setTimeWindow":return{...r,timeWindow:t.timeWindow?{...t.timeWindow}:null};case"setSelection":return{...r,selection:te(t.selection)};case"setCompare":return{...r,compare:{...r.compare,...t.compare}};case"patchPanelState":{const e=r.panels[t.panelId]??{},o={...e,...t.patch,filters:t.patch.filters?{...e.filters??{},...t.patch.filters}:e.filters};return{...r,panels:{...r.panels,[t.panelId]:o}}}case"restoreSavedView":return R(t.view);case"reset":return R(t.state);default:return r}}function D(r,t,e){const o={...r};return e===void 0?(delete o[t],o):(o[t]=e,o)}function ee(r,t){var o;const e={};for(const[s,i]of Object.entries(r))e[s]={...i,filters:i.filters?{...i.filters}:void 0};for(const[s,i]of Object.entries(t??{}))e[s]={...e[s]??{},...i,filters:{...((o=e[s])==null?void 0:o.filters)??{},...i.filters??{}}};return e}function te(r){return r?{...r,meta:r.meta?{...r.meta}:void 0}:null}const B=w.createContext(null);function ge({children:r,initialState:t}){const[e,o]=w.useReducer(K,t,R),s={state:e,actions:{setQuery(i){o({type:"setQuery",query:i})},setFilter(i,l){o({type:"setFilter",key:i,value:l})},setPanelFilter(i,l,d){o({type:"setPanelFilter",panelId:i,key:l,value:d})},setTimeWindow(i){o({type:"setTimeWindow",timeWindow:i})},setSelection(i){o({type:"setSelection",selection:i})},setCompare(i){o({type:"setCompare",compare:i})},patchPanelState(i,l){o({type:"patchPanelState",panelId:i,patch:l})},restoreSavedView(i){o({type:"restoreSavedView",view:i})},reset(i){o({type:"reset",state:i})}}};return n.jsx(B.Provider,{value:s,children:r})}function ve(){const r=w.useContext(B);if(!r)throw new Error("[RiskLab UI] useWorkbench must be used inside <WorkbenchProvider>.");return r}function re(){return w.useContext(B)}const X={background:"#0b1220",surface:"#101a2d",surfaceMuted:"#162238",border:"#22324d",text:"#e6edf7",textMuted:"#99abc7",accent:"#4c8dff",accentSoft:"rgba(76, 141, 255, 0.18)",positive:"#29b37d",warning:"#f2b84b",danger:"#ef6464",navWidth:"248px",inspectorWidth:"320px",topbarHeight:"72px",statusHeight:"36px",radius:"16px",gap:"16px",panelPadding:"16px",shadow:"0 18px 44px rgba(3, 10, 24, 0.28)",fontFamily:'"Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif'},oe={background:"#f5f7fb",surface:"#ffffff",surfaceMuted:"#eef3fb",border:"#d8e2f1",text:"#122033",textMuted:"#5f718a",accent:"#2764ff",accentSoft:"rgba(39, 100, 255, 0.12)",positive:"#1f8b5f",warning:"#b8800e",danger:"#c53f3f",navWidth:"248px",inspectorWidth:"320px",topbarHeight:"72px",statusHeight:"36px",radius:"16px",gap:"16px",panelPadding:"16px",shadow:"0 18px 44px rgba(15, 23, 42, 0.08)",fontFamily:'"Segoe UI", Inter, "Helvetica Neue", Arial, sans-serif'},ie={...X,background:"#05070a",surface:"#0c1117",surfaceMuted:"#111923",border:"#93a4c2",text:"#ffffff",textMuted:"#c8d3e5",accent:"#7fb0ff",accentSoft:"rgba(127, 176, 255, 0.2)",positive:"#6ce3aa",warning:"#ffd56b",danger:"#ff9b9b"};function se(r="dark",t){return{...r==="light"?oe:r==="high-contrast"?ie:X,...t}}function ae(r){return{"--rlwb-bg":r.background,"--rlwb-surface":r.surface,"--rlwb-surface-muted":r.surfaceMuted,"--rlwb-border":r.border,"--rlwb-text":r.text,"--rlwb-text-muted":r.textMuted,"--rlwb-accent":r.accent,"--rlwb-accent-soft":r.accentSoft,"--rlwb-positive":r.positive,"--rlwb-warning":r.warning,"--rlwb-danger":r.danger,"--rlwb-nav-width":r.navWidth,"--rlwb-inspector-width":r.inspectorWidth,"--rlwb-topbar-height":r.topbarHeight,"--rlwb-status-height":r.statusHeight,"--rlwb-radius":r.radius,"--rlwb-gap":r.gap,"--rlwb-panel-padding":r.panelPadding,"--rlwb-shadow":r.shadow,"--rlwb-font-family":r.fontFamily}}function me({children:r,nav:t,topbar:e,inspector:o,statusBar:s,tone:i="dark",theme:l,className:d,style:u,...a}){const c=ae(se(i,l));return n.jsxs("div",{...a,"data-rl-workbench":"","data-tone":i,className:Y("rlwb-shell",!!t&&"rlwb-shell--has-nav",!!o&&"rlwb-shell--has-inspector",d),style:{...c,...u},children:[t?n.jsx("aside",{className:"rlwb-shell__nav",children:t}):null,n.jsxs("div",{className:"rlwb-shell__frame",children:[e?n.jsx("header",{className:"rlwb-shell__topbar",children:e}):null,n.jsxs("div",{className:"rlwb-shell__body",children:[n.jsx("main",{className:"rlwb-shell__workspace",children:r}),o?n.jsx("aside",{className:"rlwb-shell__inspector",children:o}):null]}),s?n.jsx("footer",{className:"rlwb-shell__status",children:s}):null]})]})}function xe({children:r,panelId:t,title:e,subtitle:o,actions:s,footer:i,collapsible:l=!1,defaultCollapsed:d=!1,padding:u="md",tone:a="default",className:c,...h}){const b=re(),[v,g]=w.useState({collapsed:d}),y=t&&b?b.state.panels[t]:v,f=(y==null?void 0:y.collapsed)??!1,m=$=>{if(t&&b){b.actions.patchPanelState(t,$);return}g(_=>({..._,...$}))};return n.jsxs("section",{...h,className:Y("rlwb-panel",`rlwb-panel--tone-${a}`,`rlwb-panel--padding-${u}`,f&&"rlwb-panel--collapsed",c),"data-panel-id":t,"data-collapsed":f||void 0,children:[n.jsxs("header",{className:"rlwb-panel__header",children:[n.jsxs("div",{className:"rlwb-panel__titles",children:[n.jsx("div",{className:"rlwb-panel__title",children:e}),o?n.jsx("div",{className:"rlwb-panel__subtitle",children:o}):null]}),n.jsxs("div",{className:"rlwb-panel__actions",children:[s,l?n.jsx("button",{type:"button",className:"rlwb-icon-button","aria-label":f?"Expand panel":"Collapse panel",onClick:()=>m({collapsed:!f}),children:f?"+":"-"}):null]})]}),f?null:n.jsx("div",{className:"rlwb-panel__body",children:r}),!f&&i?n.jsx("footer",{className:"rlwb-panel__footer",children:i}):null]})}function Y(...r){return r.filter(Boolean).join(" ")}const ne={xs:{"--ui-btn-height":"1.5rem","--ui-btn-padding":"0 0.375rem","--ui-btn-font-size":"0.75rem","--ui-btn-radius":"0.25rem","--ui-btn-icon-size":"0.875rem"},sm:{"--ui-btn-height":"2rem","--ui-btn-padding":"0 0.625rem","--ui-btn-font-size":"0.8125rem","--ui-btn-radius":"0.3125rem","--ui-btn-icon-size":"1rem"},md:{"--ui-btn-height":"2.5rem","--ui-btn-padding":"0 1rem","--ui-btn-font-size":"0.875rem","--ui-btn-radius":"0.375rem","--ui-btn-icon-size":"1.125rem"},lg:{"--ui-btn-height":"3rem","--ui-btn-padding":"0 1.5rem","--ui-btn-font-size":"1rem","--ui-btn-radius":"0.5rem","--ui-btn-icon-size":"1.25rem"},xl:{"--ui-btn-height":"3.5rem","--ui-btn-padding":"0 2rem","--ui-btn-font-size":"1.125rem","--ui-btn-radius":"0.625rem","--ui-btn-icon-size":"1.5rem"}},le={primary:{base:"var(--ui-color-primary, #3b82f6)",contrast:"#fff",soft:"var(--ui-color-primary-soft, #dbeafe)",softFg:"var(--ui-color-primary, #3b82f6)"},secondary:{base:"var(--ui-color-secondary, #6366f1)",contrast:"#fff",soft:"var(--ui-color-secondary-soft, #e0e7ff)",softFg:"var(--ui-color-secondary, #6366f1)"},success:{base:"var(--ui-color-success, #22c55e)",contrast:"#fff",soft:"var(--ui-color-success-soft, #dcfce7)",softFg:"var(--ui-color-success, #22c55e)"},warning:{base:"var(--ui-color-warning, #f59e0b)",contrast:"#fff",soft:"var(--ui-color-warning-soft, #fef3c7)",softFg:"var(--ui-color-warning, #f59e0b)"},error:{base:"var(--ui-color-error, #ef4444)",contrast:"#fff",soft:"var(--ui-color-error-soft, #fee2e2)",softFg:"var(--ui-color-error, #ef4444)"},info:{base:"var(--ui-color-info, #06b6d4)",contrast:"#fff",soft:"var(--ui-color-info-soft, #cffafe)",softFg:"var(--ui-color-info, #06b6d4)"},neutral:{base:"var(--ui-color-neutral, #6b7280)",contrast:"#fff",soft:"var(--ui-color-neutral-soft, #f3f4f6)",softFg:"var(--ui-color-neutral, #6b7280)"}};function ce(r,t){const e=le[t];switch(r){case"solid":return{"--ui-btn-bg":e.base,"--ui-btn-color":e.contrast,"--ui-btn-border":"transparent"};case"outlined":return{"--ui-btn-bg":"transparent","--ui-btn-color":e.base,"--ui-btn-border":e.base};case"ghost":return{"--ui-btn-bg":"transparent","--ui-btn-color":e.base,"--ui-btn-border":"transparent"};case"soft":return{"--ui-btn-bg":e.soft,"--ui-btn-color":e.softFg,"--ui-btn-border":"transparent"};case"link":return{"--ui-btn-bg":"transparent","--ui-btn-color":e.base,"--ui-btn-border":"transparent","--ui-btn-padding":"0","--ui-btn-height":"auto",textDecoration:"underline"}}}const de={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5em",height:"var(--ui-btn-height)",padding:"var(--ui-btn-padding)",fontSize:"var(--ui-btn-font-size)",fontFamily:"inherit",fontWeight:600,lineHeight:1,borderRadius:"var(--ui-btn-radius)",border:"1px solid var(--ui-btn-border, transparent)",backgroundColor:"var(--ui-btn-bg)",color:"var(--ui-btn-color)",cursor:"pointer",textDecoration:"none",transition:"background-color 150ms, color 150ms, border-color 150ms, opacity 150ms",outline:"none",userSelect:"none",whiteSpace:"nowrap",boxSizing:"border-box"},ue={opacity:.5,pointerEvents:"none"};function pe(){return n.jsx("svg",{"aria-hidden":"true",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",className:"ui-btn__spinner",children:n.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"50 100"})})}const we=w.forwardRef(function({variant:t="solid",size:e="md",color:o="primary",startIcon:s,endIcon:i,loading:l=!1,disabled:d=!1,fullWidth:u=!1,type:a="button",href:c,as:h,className:b,style:v,xstyle:g,testId:y,children:f,...m},$){const _=h??(c?"a":"button"),A=d||l,C={...de,...ne[e],...ce(t,o),...u?{width:"100%"}:void 0,...A?ue:void 0,...typeof g=="object"&&!Array.isArray(g)?g:void 0,...Array.isArray(g)?g.reduce((S,j)=>j?{...S,...j}:S,{}):void 0,...v},x={ref:$,className:F("ui-btn",b),style:C,"data-testid":y,"data-variant":t,"data-size":e,"data-color":o,"aria-busy":l||void 0,"aria-disabled":A||void 0,...m};return _==="button"?(x.type=a,x.disabled=A):_==="a"&&(x.href=c,x.role="button",A&&(x.tabIndex=-1,x["aria-disabled"]=!0)),n.jsxs(_,{...x,children:[l?n.jsx(pe,{}):s&&n.jsx("span",{"aria-hidden":"true",className:"ui-btn__icon",children:s}),f,i&&!l&&n.jsx("span",{"aria-hidden":"true",className:"ui-btn__icon",children:i})]})}),ye=w.forwardRef(function({label:t,helperText:e,error:o,startAdornment:s,endAdornment:i,variant:l="outlined",size:d="md",multiline:u=!1,rows:a,maxRows:c,fullWidth:h=!1,required:b=!1,type:v="text",disabled:g,className:y,style:f,xstyle:m,testId:$,id:_,...A},C){const x=w.useId(),S=_??x,j=`${S}-helper`,I=o===!0||typeof o=="string",W=typeof o=="string"?o:void 0,P=f||m||h?{...h?{width:"100%"}:void 0,...typeof m=="object"&&!Array.isArray(m)?m:void 0,...Array.isArray(m)?m.reduce((L,M)=>M?{...L,...M}:L,{}):void 0,...f}:void 0,Z=u?"textarea":"input",E={ref:C,id:S,className:F("ui-textfield__input",u&&"ui-textfield__input--multiline"),style:u?{maxHeight:c!==void 0?`calc(${c} * 1.5em)`:void 0,overflowY:c!==void 0?"auto":void 0}:void 0,disabled:g,required:b,"aria-invalid":I?"true":void 0,"aria-describedby":e||W?j:void 0,...A};return u?a!==void 0&&(E.rows=a):E.type=v,n.jsxs("div",{className:F("ui-textfield",y),...P?{style:P}:void 0,"data-testid":$,"data-variant":l,"data-size":d,"data-error":I||void 0,children:[t&&n.jsxs("label",{htmlFor:S,className:"ui-textfield__label",children:[t,b&&n.jsx("span",{"aria-hidden":"true",children:" *"})]}),n.jsxs("div",{className:F("ui-textfield__wrapper",u&&"ui-textfield__wrapper--multiline",g&&"ui-textfield__wrapper--disabled"),children:[s&&n.jsx("span",{"aria-hidden":"true",className:"ui-textfield__adornment",children:s}),n.jsx(Z,{...E}),i&&n.jsx("span",{"aria-hidden":"true",className:"ui-textfield__adornment",children:i})]}),(e||W)&&n.jsx("p",{id:j,role:I?"alert":void 0,className:F("ui-textfield__helper",I?"ui-textfield__helper--error":"ui-textfield__helper--normal"),children:W??e})]})});export{we as B,ye as T,T as U,xe as W,ge as a,me as b,H as c,V as d,q as e,O as f,Q as g,U as h,z as r,ve as u};

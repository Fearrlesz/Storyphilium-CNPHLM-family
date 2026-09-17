// Мелкие DOM-хелперы + тосты + модалки.
export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v !== null && v !== undefined && v !== false) node.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
        if (c == null) continue;
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
}

export function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- Toasts ---------- */
const toastHost = () => document.getElementById('toast-host');
export function toast(text, kind = '') {
    const node = el('div', { class: 'toast ' + kind, text });
    toastHost().appendChild(node);
    setTimeout(() => {
        node.style.transition = 'opacity 0.3s, transform 0.3s';
        node.style.opacity = '0';
        node.style.transform = 'translateX(20px)';
        setTimeout(() => node.remove(), 320);
    }, 2600);
}

/* ---------- Modal ---------- */
export function openModal({ title, body, actions = [], wide = false }) {
    const host = document.getElementById('modal-host');
    host.innerHTML = '';
    host.classList.add('open');

    const modal = el('div', { class: 'modal' });
    const head = el('div', { class: 'modal-head' }, [
        el('span', { text: title }),
        el('span', { class: 'spacer' }),
        el('button', { class: 'btn btn-outline btn-sm', text: '✕', onclick: close })
    ]);
    const bodyEl = el('div', { class: 'modal-body' });
    if (typeof body === 'string') bodyEl.innerHTML = body;
    else if (body instanceof Node) bodyEl.appendChild(body);
    const foot = el('div', { class: 'modal-foot' });
    for (const a of actions) {
        const btn = el('button', { class: 'btn ' + (a.kind || 'btn-secondary'), text: a.label });
        btn.addEventListener('click', () => {
            const keep = a.onClick ? a.onClick() : undefined;
            if (keep !== false) close();
        });
        foot.appendChild(btn);
    }
    if (!actions.length) foot.remove();

    modal.append(head, bodyEl, foot);
    host.appendChild(modal);
    host.onclick = e => { if (e.target === host) close(); };

    function close() {
        host.classList.remove('open');
        host.innerHTML = '';
    }
    return { close, body: bodyEl, modal };
}

export function confirmDialog(title, message, { okLabel = 'Да', cancelLabel = 'Отмена', danger = false } = {}) {
    return new Promise(resolve => {
        const { close } = openModal({
            title,
            body: `<div style="font-size:14px;line-height:1.55">${escapeHtml(message)}</div>`,
            actions: [
                { label: cancelLabel, onClick: () => resolve(false) },
                { label: okLabel, kind: danger ? 'btn-danger' : 'btn-primary', onClick: () => resolve(true) }
            ]
        });
    });
}

export function promptDialog(title, defaultValue = '', label = 'Значение') {
    return new Promise(resolve => {
        const input = el('input', { class: 'input', value: defaultValue });
        const wrap = el('div', { class: 'field' }, [
            el('label', { text: label }),
            input
        ]);
        const { close } = openModal({
            title,
            body: wrap,
            actions: [
                { label: 'Отмена', onClick: () => resolve(null) },
                { label: 'ОК', kind: 'btn-primary', onClick: () => resolve(input.value.trim()) }
            ]
        });
        setTimeout(() => input.focus(), 30);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') { resolve(input.value.trim()); close(); }
        });
    });
}

/* ---------- Small utils ---------- */
export function fmtNum(n) { return new Intl.NumberFormat('ru-RU').format(n); }
export function fmtDate(ts) { return new Date(ts).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
export function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function debounce(fn, wait = 300) {
    let t = null;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}
export function downloadBlob(content, filename, mime) {
    const blob = content instanceof Blob ? content : new Blob(['\uFEFF' + content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

// Читательский вид: типографская вёрстка сценария.
import { store } from '../store.js';
import { el } from '../ui.js';

let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const controls = el('div', { class: 'reader-controls' });
    const fontSel = el('select', { class: 'select' });
    for (const size of [11, 12, 13, 14, 15, 16]) {
        fontSel.appendChild(el('option', { value: size, text: size + ' pt', selected: size === 13 }));
    }
    fontSel.addEventListener('change', () => {
        page.style.fontSize = fontSel.value + 'pt';
    });

    const styleToggle = el('button', { class: 'btn btn-outline btn-sm', text: '🖨 Бумажный вид', onclick: () => {
        page.classList.toggle('hide-page-style');
        styleToggle.textContent = page.classList.contains('hide-page-style') ? '📄 Бумажный вид' : '🖥 Экранный вид';
    }});

    controls.append(
        el('span', { style: 'font-size:12px;color:var(--text-secondary);font-weight:600;', text: 'Читательский вид' }),
        el('span', { style: 'font-size:12px;color:var(--text-light);', text: 'Кегль' }),
        fontSel,
        styleToggle
    );

    const wrap = el('div', { class: 'reader-wrap' });
    const page = el('div', { class: 'reader-page' });
    wrap.appendChild(page);

    view.append(controls, wrap);
    host.appendChild(view);
    render(page);

    _unsubs.push(store.on('content:changed', () => render(page)));
    _unsubs.push(store.on('project:changed', () => render(page)));
}

export function unmount() { _unsubs.forEach(u => u && u()); _unsubs = []; }

function render(page) {
    const text = store.state.project.content || '';
    const meta = store.state.project.meta || {};
    page.innerHTML = '';
    page.style.fontSize = '13pt';

    if (!text.trim()) {
        page.innerHTML = '<div class="r-empty"></div><div style="text-align:center;color:#888;font-family:Inter,sans-serif;font-size:13px;">Сценарий пуст</div>';
        return;
    }

    // Титул
    const title = el('div', { style: 'text-align:center;margin-bottom:36px;padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,0.15);' });
    title.innerHTML = `<div style="font-size:20pt;font-weight:700;letter-spacing:1px;">${escapeHtml(meta.title || store.state.currentProject)}</div>
        <div style="font-size:9pt;letter-spacing:3px;color:#8a7a6a;text-transform:uppercase;margin-top:6px;">Сценарий</div>`;
    if (meta.author) title.innerHTML += `<div style="font-size:10pt;margin-top:8px;">${escapeHtml(meta.author)}</div>`;
    page.appendChild(title);

    const lines = text.split('\n');
    let inDialogue = false;
    for (const raw of lines) {
        const t = raw.trim();
        if (!t) { page.appendChild(el('div', { class: 'r-empty' })); inDialogue = false; continue; }
        if (/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i.test(t)) {
            page.appendChild(el('div', { class: 'r-scene', text: t }));
            inDialogue = false;
        } else if (/^\(.*\)$/.test(t)) {
            page.appendChild(el('div', { class: 'r-paren', text: t }));
        } else if (t === t.toUpperCase() && /[А-ЯA-Z]/.test(t) && t.length < 60) {
            page.appendChild(el('div', { class: 'r-char', text: t }));
            inDialogue = true;
        } else if (inDialogue) {
            page.appendChild(el('div', { class: 'r-dialogue', text: t }));
        } else {
            page.appendChild(el('div', { class: 'r-action', text: t }));
            inDialogue = false;
        }
    }
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

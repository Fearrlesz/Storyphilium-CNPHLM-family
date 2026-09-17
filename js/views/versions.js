// Ревизии: снимки, восстановление, простой диф.
import { store } from '../store.js';
import { el, toast, openModal, confirmDialog, fmtDate, escapeHtml } from '../ui.js';

let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const header = el('div', { class: 'view-header' }, [
        el('div', {}, [
            el('h2', { text: 'Ревизии' }),
            el('div', { class: 'sub', text: 'Снимки текста — с возможностью сравнения и восстановления' })
        ]),
        el('div', { class: 'spacer' }),
        el('button', { class: 'btn btn-primary btn-sm', text: '💾 Сделать снимок', onclick: () => {
            store.addVersion('Снимок ' + new Date().toLocaleString('ru-RU'));
            toast('Снимок сохранён', 'ok');
        }})
    ]);

    const body = el('div', { class: 'view-body', id: 'versionsBody' });
    view.append(header, body);
    host.appendChild(view);
    render(body);

    _unsubs.push(store.on('project:changed', () => render(body)));
    _unsubs.push(store.on('versions:changed', () => render(body)));
}

export function unmount() { _unsubs.forEach(u => u && u()); _unsubs = []; }

function render(root) {
    root.innerHTML = '';
    const versions = store.state.project.versions || [];
    if (!versions.length) {
        root.appendChild(el('div', { class: 'empty-state' }, [
            el('div', { class: 'es-ico', text: '🕘' }),
            el('div', { class: 'es-title', text: 'Снимков нет' }),
            el('div', { class: 'es-hint', text: 'Перед большими правками сохраняйте снимок — можно вернуться в любой момент.' })
        ]));
        return;
    }
    for (let i = 0; i < versions.length; i++) {
        const v = versions[i];
        const item = el('div', { class: 'version-item' + (v.auto ? ' auto' : '') });
        item.innerHTML = `
            <div class="v-info">
                <div class="v-name">${escapeHtml(v.name)}</div>
                <div class="v-meta">${fmtDate(v.createdAt)} · ${v.wordCount} слов · ${(v.content || '').length} символов</div>
            </div>`;
        const actions = el('div', { class: 'v-actions' }, [
            el('button', { class: 'btn btn-outline btn-sm', text: '↩ Восстановить', onclick: async () => {
                if (await confirmDialog('Восстановить?', 'Текущий текст заменится. Перед этим создадим снимок текущего.', { okLabel: 'Восстановить' })) {
                    store.restoreVersion(v.id);
                    toast('Восстановлено', 'ok');
                    location.hash = '#/editor';
                }
            }}),
            el('button', { class: 'btn btn-outline btn-sm', text: '⇄ Диф', onclick: () => showDiff(v) }),
            el('button', { class: 'btn btn-danger btn-sm', text: '✕', onclick: async () => {
                if (await confirmDialog('Удалить снимок?', v.name)) {
                    store.removeVersion(v.id);
                }
            }})
        ]);
        item.appendChild(actions);
        root.appendChild(item);
    }
}

function showDiff(v) {
    const current = store.state.project.content || '';
    const old = v.content || '';
    const oldLines = old.split('\n');
    const newLines = current.split('\n');
    // Простой LCS-diff
    const lcs = lcsTable(oldLines, newLines);
    const ops = backtrack(oldLines, newLines, lcs);

    const html = el('div', { style: 'font-family:Courier Prime, monospace; font-size:12px; max-height:60vh; overflow:auto; white-space:pre-wrap; line-height:1.5;' });
    for (const op of ops) {
        const div = el('div');
        if (op.kind === 'eq') { div.textContent = '  ' + op.line; div.style.color = 'var(--text-secondary)'; }
        else if (op.kind === 'add') { div.textContent = '+ ' + op.line; div.style.color = 'var(--ok)'; div.style.background = 'rgba(110,201,122,0.08)'; }
        else { div.textContent = '− ' + op.line; div.style.color = 'var(--danger)'; div.style.background = 'rgba(232,139,139,0.08)'; }
        html.appendChild(div);
    }
    if (!ops.length) html.innerHTML = '<div style="color:var(--text-light);">Нет изменений</div>';

    openModal({
        title: 'Сравнение: ' + v.name + ' → сейчас',
        body: html,
        actions: [{ label: 'Закрыть', kind: 'btn-primary' }]
    });
}

function lcsTable(a, b) {
    const m = a.length, n = b.length;
    const t = Array.from({ length: m + 1 }, () => new Uint32Array(n + 1));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            t[i][j] = a[i-1] === b[j-1] ? t[i-1][j-1] + 1 : Math.max(t[i-1][j], t[i][j-1]);
    return t;
}

function backtrack(a, b, t) {
    const ops = [];
    let i = a.length, j = b.length;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && a[i-1] === b[j-1]) { ops.unshift({ kind: 'eq', line: a[i-1] }); i--; j--; }
        else if (j > 0 && (i === 0 || t[i][j-1] >= t[i-1][j])) { ops.unshift({ kind: 'add', line: b[j-1] }); j--; }
        else if (i > 0) { ops.unshift({ kind: 'del', line: a[i-1] }); i--; }
        else break;
    }
    return ops;
                          }

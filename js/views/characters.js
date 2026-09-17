// Библия персонажей.
import { store } from '../store.js';
import { el, toast, openModal, confirmDialog, escapeHtml, promptDialog } from '../ui.js';
import { parseScript } from '../parser.js';

let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const header = el('div', { class: 'view-header' }, [
        el('div', {}, [
            el('h2', { text: 'Персонажи' }),
            el('div', { class: 'sub', text: 'Цель, потребность, изъян, арка — и живая статистика из текста' })
        ]),
        el('div', { class: 'spacer' }),
        el('button', { class: 'btn btn-secondary btn-sm', text: '⬇ Из текста', onclick: importFromText }),
        el('button', { class: 'btn btn-primary btn-sm', text: '➕ Персонаж', onclick: () => editChar(null) })
    ]);

    const body = el('div', { class: 'view-body' });
    view.append(header, body);
    host.appendChild(view);

    render(body);

    _unsubs.push(store.on('content:changed', () => render(body)));
    _unsubs.push(store.on('project:changed', () => render(body)));
}

export function unmount() { _unsubs.forEach(u => u && u()); _unsubs = []; }

function render(root) {
    root.innerHTML = '';
    const chars = store.state.project.characters || [];
    const text = store.state.project.content || '';
    const { characters: stat } = parseScript(text);
    const statMap = new Map(stat.map(s => [s.name, s]));

    if (!chars.length) {
        root.appendChild(el('div', { class: 'empty-state' }, [
            el('div', { class: 'es-ico', text: '👥' }),
            el('div', { class: 'es-title', text: 'Персонажи не заведены' }),
            el('div', { class: 'es-hint', text: 'Нажмите «Из текста», чтобы подтянуть имена, распознанные в сценарии, или добавьте вручную.' })
        ]));
        return;
    }

    const grid = el('div', { class: 'char-grid' });
    for (const c of chars) {
        const s = statMap.get(c.name) || { lines: 0, dialogueWords: 0, scenesCount: 0 };
        const node = el('div', { class: 'char-card' });
        node.innerHTML = `
            <div class="char-name">${escapeHtml(c.name || '—')}</div>
            <div class="char-role">${escapeHtml(c.role || 'роль не задана')}</div>
            ${c.goal ? `<div class="char-row"><b>Цель:</b> ${escapeHtml(c.goal)}</div>` : ''}
            ${c.need ? `<div class="char-row"><b>Потребность:</b> ${escapeHtml(c.need)}</div>` : ''}
            ${c.flaw ? `<div class="char-row"><b>Изъян:</b> ${escapeHtml(c.flaw)}</div>` : ''}
            ${c.arc ? `<div class="char-row"><b>Арка:</b> ${escapeHtml(c.arc)}</div>` : ''}
            <div class="char-stats">
                <span>💬 <span class="num">${s.lines}</span> реплик</span>
                <span>📝 <span class="num">${s.dialogueWords}</span> слов</span>
                <span>🎬 <span class="num">${s.scenesCount}</span> сцен</span>
            </div>
        `;
        node.addEventListener('click', () => editChar(c));
        grid.appendChild(node);
    }
    root.appendChild(grid);
}

function importFromText() {
    const { characters } = parseScript(store.state.project.content || '');
    const existing = new Set((store.state.project.characters || []).map(c => c.name));
    let added = 0;
    for (const s of characters) {
        if (existing.has(s.name)) continue;
        store.state.project.characters.push({
            id: 'c_' + Math.random().toString(36).slice(2, 8),
            name: s.name,
            role: '', age: '', goal: '', need: '', flaw: '', arc: '', bio: '', relations: []
        });
        added++;
    }
    store.saveProject();
    toast(added ? `Добавлено ${added} персонажей` : 'Все персонажи уже заведены');
    mount(document.getElementById('view'));
}

function editChar(existing) {
    const isNew = !existing;
    const c = existing || { id: 'c_' + Math.random().toString(36).slice(2, 8), name: '', role: '', age: '', goal: '', need: '', flaw: '', arc: '', bio: '', relations: [] };
    const wrap = el('div', {});
    const fields = [
        ['name', 'Имя', 'ИВАН'],
        ['role', 'Роль в истории', 'протагонист, антагонист, союзник…'],
        ['age', 'Возраст', '35'],
        ['goal', 'Цель (осознанная)', 'Чего добивается'],
        ['need', 'Потребность (неосознанная)', 'Что ему на самом деле нужно'],
        ['flaw', 'Изъян', 'Что мешает'],
        ['arc', 'Арка', 'Из какого состояния в какое приходит'],
        ['bio', 'Биография', 'Что важно знать о персонаже']
    ];
    const inputs = {};
    for (const [key, label, ph] of fields) {
        const f = el('div', { class: 'field' });
        f.appendChild(el('label', { text: label }));
        const inp = el(key === 'bio' ? 'textarea' : 'input', {
            class: key === 'bio' ? 'textarea' : 'input',
            rows: key === 'bio' ? 4 : undefined,
            value: c[key] || '',
            placeholder: ph
        });
        f.appendChild(inp);
        inputs[key] = inp;
        wrap.appendChild(f);
    }

    const actions = [];
    if (!isNew) {
        actions.push({ label: 'Удалить', kind: 'btn-danger', onClick: () => {
            store.state.project.characters = store.state.project.characters.filter(x => x.id !== c.id);
            store.saveProject();
            mount(document.getElementById('view'));
        }});
    }
    actions.push({ label: isNew ? 'Создать' : 'Сохранить', kind: 'btn-primary', onClick: () => {
        const name = inputs.name.value.trim().toUpperCase();
        if (!name) { toast('Введите имя', 'warn'); return false; }
        c.name = name;
        for (const k in inputs) if (k !== 'name') c[k] = inputs[k].value.trim();
        if (isNew) store.state.project.characters.push(c);
        store.saveProject();
        mount(document.getElementById('view'));
        toast(isNew ? 'Персонаж добавлен' : 'Сохранено', 'ok');
    }});

    openModal({ title: isNew ? 'Новый персонаж' : c.name, body: wrap, actions });
}

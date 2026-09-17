// Структура: акты и биты + карточки сцен + шаблоны.
import { store } from '../store.js';
import { el, toast, openModal, confirmDialog, promptDialog } from '../ui.js';
import { parseScript } from '../parser.js';
import { STORY_TEMPLATES } from '../templates.js';

let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const header = el('div', { class: 'view-header' }, [
        el('div', {}, [
            el('h2', { text: 'Структура истории' }),
            el('div', { class: 'sub', text: 'Акты, биты и карточки сцен — рабочий скелет сценария' })
        ]),
        el('div', { class: 'spacer' }),
        el('button', { class: 'btn btn-secondary btn-sm', text: '📐 Шаблон', onclick: pickTemplate }),
        el('button', { class: 'btn btn-secondary btn-sm', text: '➕ Бит', onclick: addBeat }),
        el('button', { class: 'btn btn-primary btn-sm', text: '🔄 Обновить карточки', onclick: syncCards })
    ]);

    const body = el('div', { class: 'view-body' });
    const grid = el('div', { class: 'struct-grid' });
    const beatsCol = el('div', {});
    const cardsCol = el('div', {});
    grid.append(beatsCol, cardsCol);
    body.appendChild(grid);

    view.append(header, body);
    host.appendChild(view);

    render();

    _unsubs.push(store.on('content:changed', () => render()));
    _unsubs.push(store.on('project:changed', () => render()));

    function render() {
        renderBeats(beatsCol);
        renderCards(cardsCol);
    }
}

export function unmount() { _unsubs.forEach(u => u && u()); _unsubs = []; }

function renderBeats(root) {
    root.innerHTML = '';
    const title = el('h3', { style: 'font-size:14px;margin-bottom:10px;', text: 'Акты и биты' });
    root.appendChild(title);

    const beats = store.state.project.beats || [];
    if (!beats.length) {
        root.appendChild(el('div', { class: 'empty-state' }, [
            el('div', { class: 'es-ico', text: '🧩' }),
            el('div', { class: 'es-title', text: 'Скелет пуст' }),
            el('div', { class: 'es-hint', text: 'Возьмите готовый шаблон — «Save the Cat», «Путь героя», «Русская 5-актная драма» — или добавьте свои биты.' })
        ]));
        return;
    }

    // Группируем по акту
    const groups = new Map();
    for (const b of beats) {
        if (!groups.has(b.act)) groups.set(b.act, []);
        groups.get(b.act).push(b);
    }

    const list = el('div', { class: 'acts-list' });
    for (const [act, items] of groups) {
        const block = el('div', { class: 'act-block' });
        const head = el('div', { class: 'act-head' }, [
            el('div', { class: 'act-name', text: act }),
            el('div', { class: 'act-badge', text: items.length + ' бит' })
        ]);
        block.appendChild(head);

        const bl = el('div', { class: 'beats-list' });
        for (const b of items) {
            const node = el('div', { class: 'beat' });
            node.innerHTML = `<div style="flex:1">
                <div class="beat-title">${escapeHtml(b.title)}</div>
                ${b.description ? `<div class="beat-desc">${escapeHtml(b.description)}</div>` : ''}
            </div>`;
            if (b.sceneNum) node.appendChild(el('span', { class: 'beat-link', text: 'Сцена ' + b.sceneNum }));
            node.addEventListener('click', () => editBeat(b.id));
            bl.appendChild(node);
        }
        block.appendChild(bl);
        list.appendChild(block);
    }
    root.appendChild(list);

    const info = el('div', { style: 'font-size:11px;color:var(--text-light);margin-top:10px;text-align:right;' }, [
        el('button', { class: 'btn btn-outline btn-sm', text: 'Сбросить структуру', onclick: async () => {
            if (await confirmDialog('Сбросить структуру?', 'Все биты будут удалены.')) {
                store.state.project.beats = [];
                store.saveProject();
                toast('Структура сброшена');
                mount(document.getElementById('view'));
            }
        }})
    ]);
    root.appendChild(info);
}

function renderCards(root) {
    root.innerHTML = '';
    root.appendChild(el('h3', { style: 'font-size:14px;margin-bottom:10px;', text: 'Карточки сцен' }));

    const text = store.state.project.content || '';
    const { scenes } = parseScript(text);
    if (!scenes.length) {
        root.innerHTML += '<div class="side-empty">Сцены появятся, как только вы начнёте писать заголовки.</div>';
        return;
    }

    const grid = el('div', { class: 'cards-grid' });
    const cards = store.state.project.cards || {};
    for (const s of scenes) {
        const c = cards[s.num] || {};
        const node = el('div', { class: 'scene-card' });
        const chars = Array.from(s.characters);
        node.innerHTML = `
            <span class="sc-num">Сцена ${s.num}</span>
            <div class="sc-title">${escapeHtml(s.location || '—')}${s.tod ? ' — ' + escapeHtml(s.tod) : ''}</div>
            <div class="sc-meta">${s.words} сл. · ${chars.length} перс.</div>
            ${chars.length ? `<div class="sc-chips">${chars.slice(0, 4).map(ch => `<span class="chip">${escapeHtml(ch)}</span>`).join('')}</div>` : ''}
            ${c.purpose ? `<div class="sc-purpose">🎯 ${escapeHtml(c.purpose)}</div>` : ''}
        `;
        node.addEventListener('click', () => editCard(s.num, s));
        grid.appendChild(node);
    }
    root.appendChild(grid);
}

function pickTemplate() {
    const body = el('div', {});
    body.appendChild(el('p', { style: 'font-size:13px;color:var(--text-secondary);margin-bottom:10px;',
        text: 'Шаблон заменит текущий список битов. Текст сценария не тронется.' }));
    const list = el('div', {});
    for (const [key, tpl] of Object.entries(STORY_TEMPLATES)) {
        const item = el('div', { class: 'list-item' }, [
            el('div', { style: 'font-weight:600;', text: tpl.name }),
            el('div', { style: 'font-size:12px;color:var(--text-secondary);margin-top:3px;', text: tpl.description })
        ]);
        item.addEventListener('click', () => {
            applyTemplate(tpl);
            close();
        });
        list.appendChild(item);
    }
    body.appendChild(list);

    const { close } = openModal({ title: 'Выбрать шаблон структуры', body });
}

function applyTemplate(tpl) {
    const beats = [];
    tpl.acts.forEach(act => {
        act.beats.forEach(b => {
            beats.push({
                id: 'b_' + Math.random().toString(36).slice(2, 8),
                act: act.name,
                title: b.title,
                description: b.description,
                sceneNum: null
            });
        });
    });
    store.state.project.beats = beats;
    store.saveProject();
    toast('Шаблон применён: ' + tpl.name, 'ok');
    mount(document.getElementById('view'));
}

function addBeat() {
    const t = el('div', { class: 'field' }, [el('label', { text: 'Акт' })]);
    const inp = el('input', { class: 'input', value: 'Акт I' });
    t.appendChild(inp);
    const t2 = el('div', { class: 'field' }, [el('label', { text: 'Название бита' })]);
    const inp2 = el('input', { class: 'input', placeholder: 'Катализатор' });
    t2.appendChild(inp2);
    const t3 = el('div', { class: 'field' }, [el('label', { text: 'Описание' })]);
    const inp3 = el('textarea', { class: 'textarea', rows: 3, placeholder: 'Что происходит, зачем' });
    t3.appendChild(inp3);
    const wrap = el('div', {}, [t, t2, t3]);
    const { close } = openModal({
        title: 'Новый бит',
        body: wrap,
        actions: [
            { label: 'Отмена', onClick: () => {} },
            { label: 'Добавить', kind: 'btn-primary', onClick: () => {
                const act = inp.value.trim() || 'Акт I';
                const title = inp2.value.trim();
                if (!title) { toast('Введите название', 'warn'); return false; }
                store.state.project.beats.push({
                    id: 'b_' + Math.random().toString(36).slice(2, 8),
                    act, title, description: inp3.value.trim(), sceneNum: null
                });
                store.saveProject();
                mount(document.getElementById('view'));
            }}
        ]
    });
}

function editBeat(id) {
    const b = store.state.project.beats.find(x => x.id === id);
    if (!b) return;
    const t1 = el('div', { class: 'field' }, [el('label', { text: 'Акт' })]);
    const inp1 = el('input', { class: 'input', value: b.act });
    t1.appendChild(inp1);
    const t2 = el('div', { class: 'field' }, [el('label', { text: 'Название' })]);
    const inp2 = el('input', { class: 'input', value: b.title });
    t2.appendChild(inp2);
    const t3 = el('div', { class: 'field' }, [el('label', { text: 'Описание' })]);
    const inp3 = el('textarea', { class: 'textarea', rows: 4 });
    inp3.value = b.description || '';
    t3.appendChild(inp3);
    const wrap = el('div', {}, [t1, t2, t3]);
    openModal({
        title: 'Бит',
        body: wrap,
        actions: [
            { label: 'Удалить', kind: 'btn-danger', onClick: () => {
                store.state.project.beats = store.state.project.beats.filter(x => x.id !== id);
                store.saveProject();
                mount(document.getElementById('view'));
            }},
            { label: 'Сохранить', kind: 'btn-primary', onClick: () => {
                b.act = inp1.value.trim(); b.title = inp2.value.trim(); b.description = inp3.value.trim();
                store.saveProject();
                mount(document.getElementById('view'));
            }}
        ]
    });
}

function editCard(num, scene) {
    const cards = store.state.project.cards;
    const c = cards[num] || {};
    const fields = [
        ['purpose', 'Цель сцены', 'Что сцена делает для истории'],
        ['conflict', 'Конфликт', 'Что сталкивается'],
        ['mood', 'Настроение', 'Тон, атмосфера']
    ];
    const inputs = {};
    const wrap = el('div', {});
    wrap.appendChild(el('div', { style: 'font-size:13px;color:var(--text-secondary);margin-bottom:8px;',
        text: scene.raw || '' }));
    for (const [key, label, ph] of fields) {
        const f = el('div', { class: 'field' });
        f.appendChild(el('label', { text: label }));
        const inp = el('textarea', { class: 'textarea', rows: 2, placeholder: ph });
        inp.value = c[key] || '';
        f.appendChild(inp);
        inputs[key] = inp;
        wrap.appendChild(f);
    }
    openModal({
        title: 'Сцена ' + num,
        body: wrap,
        actions: [
            { label: 'Отмена' },
            { label: 'Сохранить', kind: 'btn-primary', onClick: () => {
                const updated = {};
                for (const k in inputs) updated[k] = inputs[k].value.trim();
                cards[num] = Object.assign({}, c, updated);
                store.saveProject();
                mount(document.getElementById('view'));
            }}
        ]
    });
}

function syncCards() {
    const text = store.state.project.content || '';
    const { scenes } = parseScript(text);
    const cards = store.state.project.cards || {};
    let added = 0, removed = 0;
    // Удалить карточки сцен, которых больше нет
    for (const k in cards) {
        if (!scenes.find(s => String(s.num) === k)) { delete cards[k]; removed++; }
    }
    store.saveProject();
    toast(`Карточки обновлены: +${added}, −${removed}`, 'ok');
    mount(document.getElementById('view'));
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

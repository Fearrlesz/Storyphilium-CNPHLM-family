// Редактор: textarea + вставки + сайдбар сцен/персонажей/заметок + find/replace.
import { store } from '../store.js';
import { $, el, toast, debounce, promptDialog, confirmDialog, fmtNum, todayKey } from '../ui.js';
import { parseScript, countWords } from '../parser.js';
import { fixRussianTypography, pomodoro } from '../features.js';

let ta = null;
let sidebar = null;
let currentSideTab = 'scenes';
let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const { ui, project } = store.state;

    const view = el('div', { class: 'view editor-shell' });

    const main = el('div', { class: 'editor-main' });

    /* ---- Toolbar ---- */
    const toolbar = el('div', { class: 'editor-toolbar' });
    const insertsGroup = el('div', { class: 'group' }, [
        el('span', { class: 'group-label', text: 'Вставка' }),
        mkInsert('НАР'), mkInsert('ИНТ'), mkInsert('ЭКСТ'),
        mkInsert('ПЕРС'), mkInsert('ДИАЛ'), mkInsert('РЕМ'),
        mkInsert('ПАУЗА'), mkInsert('ЗАТЕМНЕНИЕ'), mkInsert('ТИТР')
    ]);
    const actionsGroup = el('div', { class: 'group' }, [
        el('button', { class: 'tbtn', title: 'Исправить типографику', text: '✨ Типографика', onclick: () => {
            const fixed = fixRussianTypography(ta.value);
            if (fixed !== ta.value) {
                ta.value = fixed;
                store.setContent(fixed);
                toast('Типографика исправлена', 'ok');
            } else toast('Нечего исправлять');
        }}),
        el('button', { class: 'tbtn', title: 'Сохранить ревизию', text: '💾 Снимок', onclick: () => {
            store.addVersion('Снимок ' + new Date().toLocaleString('ru-RU'));
            toast('Снимок сохранён', 'ok');
        }})
    ]);
    const spacer = el('div', { class: 'spacer' });
    const sidebarToggle = el('button', {
        class: 'tbtn', title: 'Панель навигации',
        text: '📋', onclick: toggleSidebar
    });

    toolbar.append(insertsGroup, actionsGroup, spacer, sidebarToggle);
    main.appendChild(toolbar);

    /* ---- Textarea ---- */
    ta = el('textarea', {
        id: 'scriptInput', class: 'script-area',
        spellcheck: 'true',
        placeholder: 'Начните писать сценарий…\nНАР. КВАРТИРА — ДЕНЬ — …'
    });
    ta.value = project.content || '';
    main.appendChild(ta);

    /* ---- Sidebar ---- */
    sidebar = buildSidebar();
    if (!ui.sidebarOpen) sidebar.classList.add('closed');

    view.append(main, sidebar);
    host.appendChild(view);

    /* ---- Wire up ---- */
    const onInput = debounce(() => {
        store.setContent(ta.value);
        updateSidebar();
        updateStats();
    }, 250);
    ta.addEventListener('input', onInput);
    ta.addEventListener('blur', () => store.saveProject());

    ta.addEventListener('keydown', e => {
        // Tab в textarea вставляет отступ
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = ta.selectionStart, end = ta.selectionEnd;
            ta.value = ta.value.slice(0, start) + '    ' + ta.value.slice(end);
            ta.setSelectionRange(start + 4, start + 4);
            store.setContent(ta.value);
        }
    });

    _unsubs.push(store.on('project:changed', () => {
        ta.value = store.state.project.content || '';
        updateSidebar(); updateStats();
    }));
    _unsubs.push(store.on('content:changed', () => {
        if (document.activeElement !== ta) ta.value = store.state.project.content || '';
    }));
    _unsubs.push(store.on('ui:changed', p => {
        if (p.focus !== undefined) {
            document.body.classList.toggle('focus-mode', p.focus);
            ensureExitFocusBtn();
        }
    }));

    // Focus-mode
    document.body.classList.toggle('focus-mode', !!ui.focus);
    ensureExitFocusBtn();

    updateSidebar();
    updateStats();

    function mkInsert(type) {
        return el('button', { class: 'tbtn', text: type, onclick: () => insertElement(type) });
    }
}

export function unmount() {
    _unsubs.forEach(u => u && u());
    _unsubs = [];
    document.body.classList.remove('focus-mode');
}

function ensureExitFocusBtn() {
    let btn = document.getElementById('exitFocusBtn');
    if (!btn) {
        btn = el('button', {
            class: 'exit-focus-btn', id: 'exitFocusBtn',
            html: '✕ Выйти из фокуса <span style="font-size:11px;opacity:0.7">Ctrl+F</span>',
            onclick: () => store.setUI({ focus: false })
        });
        document.body.appendChild(btn);
    }
    btn.classList.toggle('visible', !!store.state.ui.focus);
}

/* ============ Вставка ============ */
const INSERTS = {
    'НАР': () => ({ text: 'НАР.  — ДЕНЬ\n\n', cursor: 5 }),
    'ИНТ': () => ({ text: 'ИНТ.  — ДЕНЬ\n\n', cursor: 5 }),
    'ЭКСТ': () => ({ text: 'ЭКСТ.  — ДЕНЬ\n\n', cursor: 6 }),
    'ПЕРС': () => ({ text: '\nПЕРСОНАЖ\n', cursor: 10 }),
    'ДИАЛ': () => ({ text: '(ремарка)\nРеплика.\n\n', cursor: 10 }),
    'РЕМ': () => ({ text: '(ремарка)\n', cursor: 9 }),
    'ПАУЗА': () => ({ text: '\n(пауза)\n', cursor: 8 }),
    'ЗАТЕМНЕНИЕ': () => ({ text: '\nЗАТЕМНЕНИЕ.\n\n', cursor: 13 }),
    'ТИТР': () => ({ text: '\nТИТР: \n\n', cursor: 7 })
};

function insertElement(type) {
    if (!ta) return;
    const gen = INSERTS[type];
    if (!gen) return;
    const { text, cursor } = gen();
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    ta.focus();
    ta.setSelectionRange(start + cursor, start + cursor);
    store.setContent(ta.value);
    updateSidebar();
    updateStats();
}

/* ============ Сайдбар ============ */
function buildSidebar() {
    const side = el('aside', { class: 'editor-side', id: 'sidebar' });
    const tabs = el('div', { class: 'side-tabs' });
    const tabsList = [
        ['scenes', 'Сцены'],
        ['characters', 'Персонажи'],
        ['notes', 'Заметки']
    ];
    for (const [id, label] of tabsList) {
        const b = el('button', {
            class: currentSideTab === id ? 'active' : '',
            text: label,
            onclick: () => {
                currentSideTab = id;
                tabs.querySelectorAll('button').forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                updateSidebar();
            }
        });
        tabs.appendChild(b);
    }
    const body = el('div', { class: 'side-body', id: 'sideBody' });
    side.append(tabs, body);
    return side;
}

function toggleSidebar() {
    const open = !store.state.ui.sidebarOpen;
    store.setUI({ sidebarOpen: open });
    sidebar.classList.toggle('closed', !open);
}

function updateSidebar() {
    if (!sidebar) return;
    const body = sidebar.querySelector('#sideBody');
    if (!body) return;
    const text = store.state.project.content || '';
    body.innerHTML = '';

    if (currentSideTab === 'scenes') {
        const { scenes } = parseScript(text);
        if (!scenes.length) { body.innerHTML = '<div class="side-empty">Сцен пока нет.<br>Добавьте заголовок «НАР.» или «ИНТ.»</div>'; return; }
        for (const s of scenes) {
            const item = el('div', { class: 'side-item' });
            item.innerHTML = `<span class="num">${s.num}</span>${esc(s.location || 'Сцена')}${s.tod ? ' — ' + esc(s.tod) : ''}
                <span class="desc">${s.characters.size} перс. · ${s.words} сл.</span>`;
            item.addEventListener('click', () => jumpToLine(s.lineIndex));
            body.appendChild(item);
        }
    } else if (currentSideTab === 'characters') {
        const { characters } = parseScript(text);
        if (!characters.length) { body.innerHTML = '<div class="side-empty">Персонажи не найдены.<br>Имя пишите ВЕРХНИМИ БУКВАМИ.</div>'; return; }
        for (const c of characters) {
            const item = el('div', { class: 'side-item' });
            item.innerHTML = `${esc(c.name)}<span class="desc">${c.lines} реплик · ${c.dialogueWords} слов · ${c.scenesCount} сцен</span>`;
            item.addEventListener('click', () => {
                const i = text.indexOf(c.name);
                if (i < 0) return;
                ta.focus();
                ta.setSelectionRange(i, i + c.name.length);
                ta.scrollTop = Math.max(0, (text.slice(0, i).split('\n').length - 1) * 24 - 80);
            });
            body.appendChild(item);
        }
    } else if (currentSideTab === 'notes') {
        const notes = store.state.project.notes || [];
        if (!notes.length) { body.innerHTML = '<div class="side-empty">Заметок нет.<br>Создайте во вкладке «Заметки».</div>'; return; }
        for (const n of notes.slice(0, 30)) {
            const item = el('div', { class: 'side-item' });
            item.innerHTML = `<b>${esc(n.text.slice(0, 40))}${n.text.length > 40 ? '…' : ''}</b>
                <span class="desc">${n.resolved ? '✓ ' : ''}${new Date(n.createdAt).toLocaleDateString('ru-RU')}</span>`;
            body.appendChild(item);
        }
    }
}

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

function jumpToLine(lineIndex) {
    if (!ta) return;
    const lines = ta.value.split('\n');
    let pos = 0;
    for (let i = 0; i < lineIndex; i++) pos += lines[i].length + 1;
    ta.focus();
    ta.setSelectionRange(pos, pos);
    const lh = parseFloat(getComputedStyle(ta).lineHeight) || 30;
    ta.scrollTop = Math.max(0, lineIndex * lh - 120);
}

/* ============ Статистика в статусбаре ============ */
function updateStats() {
    const text = store.state.project.content || '';
    const words = countWords(text);
    const chars = text.length;
    const { scenes, characters } = parseScript(text);
    const pages = Math.max(1, Math.ceil(chars / 1000));
    const map = {
        'stat-chars': fmtNum(chars),
        'stat-words': fmtNum(words),
        'stat-scenes': scenes.length,
        'stat-characters': characters.length,
        'stat-pages': pages
    };
    for (const [id, val] of Object.entries(map)) {
        const node = document.getElementById(id);
        if (node) node.textContent = val;
    }
  }

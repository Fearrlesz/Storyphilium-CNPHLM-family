// Командная палитра (Ctrl+K).
import { store } from './store.js';
import { $, el, toast, promptDialog, confirmDialog } from './ui.js';
import { parseScript } from './parser.js';
import { pomodoro } from './features.js';
import { runExport, EXPORT_FORMATS } from './exports.js';

const THEMES = [
    ['cosmic', '🌌 Космос'], ['espresso', '☕ Эспрессо'],
    ['neural-white', '⬜ Neural White'], ['emerald', '🌿 Изумруд'],
    ['neural-blue', '🔵 Neural Blue']
];

const VIEWS = [
    ['editor', '📝', 'Редактор'],
    ['structure', '🧩', 'Структура'],
    ['characters', '👥', 'Персонажи'],
    ['notes', '🗒', 'Заметки'],
    ['reader', '📖', 'Читатель'],
    ['dashboard', '📊', 'Дэшборд'],
    ['versions', '🕘', 'Ревизии']
];

function getCommands() {
    const cmds = [];
    for (const [id, ico, label] of VIEWS) {
        cmds.push({ id: 'view:' + id, ico, label: 'Открыть: ' + label, run: () => location.hash = '#/' + id });
    }
    cmds.push({ id: 'project:new', ico: '➕', label: 'Новый проект', run: async () => {
        const name = await promptDialog('Новый проект', 'Новый сценарий', 'Название');
        if (name && store.createProject(name)) { store.loadProject(name); toast('Проект создан', 'ok'); }
    }});
    cmds.push({ id: 'project:switch', ico: '📁', label: 'Переключить проект…', run: () => {
        // Просто фокус на селект
        document.getElementById('projectSelect')?.focus();
    }});
    for (const [id, label] of THEMES) {
        cmds.push({ id: 'theme:' + id, ico: '🎨', label: 'Тема: ' + label, run: () => store.setUI({ theme: id }) });
    }
    for (const f of EXPORT_FORMATS) {
        cmds.push({ id: 'export:' + f.id, ico: '📤', label: 'Экспорт: ' + f.label, run: () => runExport(f.id) });
    }
    cmds.push({ id: 'snapshot', ico: '💾', label: 'Сохранить ревизию', run: () => {
        store.addVersion('Снимок ' + new Date().toLocaleString('ru-RU'));
        toast('Снимок сохранён', 'ok');
    }});
    cmds.push({ id: 'typography', ico: '✨', label: 'Исправить русскую типографику', run: () => {
        import('./features.js').then(({ fixRussianTypography }) => {
            const fixed = fixRussianTypography(store.state.project.content);
            if (fixed !== store.state.project.content) {
                store.setContent(fixed);
                store.saveProject();
                toast('Типографика исправлена', 'ok');
            } else toast('Нечего исправлять');
        });
    }});
    cmds.push({ id: 'pomodoro', ico: '⏱', label: 'Помодоро: старт 25 мин', run: () => {
        pomodoro.start(25, 'work');
        toast('Помодоро 25 мин — поехали!', 'ok');
    }});
    cmds.push({ id: 'focus', ico: '◎', label: 'Режим фокуса', run: () => {
        store.setUI({ focus: !store.state.ui.focus });
    }});
    cmds.push({ id: 'find', ico: '🔍', label: 'Найти/заменить', run: () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', ctrlKey: true }));
    }});
    cmds.push({ id: 'save', ico: '💾', label: 'Сохранить сейчас', run: () => {
        store.saveProject();
        toast('Сохранено', 'ok');
    }});

    // Сцены
    const { scenes, characters } = parseScript(store.state.project.content || '');
    for (const s of scenes.slice(0, 30)) {
        cmds.push({
            id: 'scene:' + s.num, ico: '🎬',
            label: `Сцена ${s.num}: ${s.location}${s.tod ? ' — ' + s.tod : ''}`,
            run: () => {
                location.hash = '#/editor';
                setTimeout(() => {
                    const ta = document.getElementById('scriptInput');
                    if (!ta) return;
                    const lines = (store.state.project.content || '').split('\n');
                    let pos = 0;
                    for (let i = 0; i < s.lineIndex; i++) pos += lines[i].length + 1;
                    ta.focus();
                    ta.setSelectionRange(pos, pos);
                    const lh = parseFloat(getComputedStyle(ta).lineHeight) || 30;
                    ta.scrollTop = s.lineIndex * lh - 120;
                }, 80);
            }
        });
    }
    // Персонажи
    for (const c of characters.slice(0, 30)) {
        cmds.push({
            id: 'char:' + c.name, ico: '👤', label: 'Персонаж: ' + c.name,
            run: () => { location.hash = '#/characters'; }
        });
    }
    return cmds;
}

let activePalette = null;

export function openPalette() {
    if (activePalette) return;
    const host = document.body.appendChild(el('div', { class: 'palette-host' }));
    const box = el('div', { class: 'palette' });
    const input = el('input', { placeholder: 'Команда, сцена, персонаж…', spellcheck: 'false' });
    const list = el('div', { class: 'p-list' });
    box.append(input, list);
    host.appendChild(box);

    let commands = getCommands();
    let filtered = commands.slice(0, 30);
    let selected = 0;

    function renderList() {
        list.innerHTML = '';
        if (!filtered.length) {
            list.innerHTML = '<div class="p-empty">Ничего не найдено</div>';
            return;
        }
        filtered.forEach((c, i) => {
            const item = el('div', { class: 'p-cmd' + (i === selected ? ' selected' : '') });
            item.innerHTML = `<span class="p-ico">${c.ico}</span><span>${c.label}</span>`;
            item.addEventListener('click', () => { run(c); });
            item.addEventListener('mouseenter', () => { selected = i; renderList(); });
            list.appendChild(item);
        });
    }

    function run(cmd) {
        close();
        try { cmd.run(); } catch (e) { console.error(e); toast('Ошибка команды', 'err'); }
    }

    function close() {
        host.remove();
        activePalette = null;
    }

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) filtered = commands.slice(0, 30);
        else filtered = commands.filter(c => c.label.toLowerCase().includes(q)).slice(0, 40);
        selected = 0;
        renderList();
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') return close();
        if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(filtered.length - 1, selected + 1); renderList(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(0, selected - 1); renderList(); }
        if (e.key === 'Enter') { e.preventDefault(); if (filtered[selected]) run(filtered[selected]); }
    });

    host.addEventListener('click', e => { if (e.target === host) close(); });

    renderList();
    setTimeout(() => input.focus(), 30);
    activePalette = { close };
}

// Точка входа: шапка, навигация, статусбар, роутер, горячие клавиши.
import { store } from './store.js';
import { $, el, toast, promptDialog, confirmDialog, todayKey, fmtNum } from './ui.js';
import { EXPORT_FORMATS, runExport } from './exports.js';
import { openPalette } from './palette.js';
import { pomodoro, computeStreak } from './features.js';

import * as Editor from './views/editor.js';
import * as Structure from './views/structure.js';
import * as Characters from './views/characters.js';
import * as Notes from './views/notes.js';
import * as Reader from './views/reader.js';
import * as Dashboard from './views/dashboard.js';
import * as Versions from './views/versions.js';

const VIEWS = [
    ['editor','Редактор', Editor],
    ['structure','Структура', Structure],
    ['characters','Персонажи', Characters],
    ['notes','Заметки', Notes],
    ['reader','Читатель', Reader],
    ['dashboard','Дэшборд', Dashboard],
    ['versions','Ревизии', Versions]
];

const THEMES = [
    ['cosmic', 'Космос'], ['espresso', 'Эспрессо'],
    ['neural-white', 'Neural White'], ['emerald', 'Изумруд'],
    ['neural-blue', 'Neural Blue']
];

let currentView = null;
let currentMount = null;

function buildTopbar() {
    const top = document.getElementById('topbar');
    top.innerHTML = '';
    const brand = el('div', { class: 'brand' }, [
        el('span', { class: 'story', text: 'СЦЕНАРИУМ' }),
        el('span', { class: 'sep', text: '·' }),
        el('span', { class: 'family', text: 'среда сценариста' })
    ]);
    top.appendChild(brand);

    // Project selector
    const projSel = el('div', { class: 'project-selector' });
    const sel = el('select', { id: 'projectSelect' });
    refreshProjectSelect(sel);
    sel.addEventListener('change', () => store.loadProject(sel.value));
    projSel.appendChild(sel);
    projSel.appendChild(el('button', { class: 'btn btn-secondary btn-sm', text: '＋', title: 'Новый проект', onclick: async () => {
        const name = await promptDialog('Новый проект', 'Сценарий ' + new Date().toLocaleDateString('ru-RU'), 'Название');
        if (!name) return;
        if (store.createProject(name)) { store.loadProject(name); toast('Проект создан', 'ok'); refreshProjectSelect(sel); }
        else toast('Проект с таким именем уже есть', 'warn');
    }}));
    projSel.appendChild(el('button', { class: 'btn btn-secondary btn-sm', text: '✕', title: 'Удалить проект', onclick: async () => {
        const cur = store.state.currentProject;
        if (cur === 'default') return toast('Проект default удалить нельзя', 'warn');
        if (!await confirmDialog('Удалить проект?', `Проект «${cur}» и все его ревизии будут удалены безвозвратно.`, { okLabel: 'Удалить', danger: true })) return;
        store.deleteProject(cur);
        refreshProjectSelect(sel);
        toast('Удалено');
    }}));
    top.appendChild(projSel);

    top.appendChild(el('div', { class: 'spacer' }));

    // Theme
    const themeSel = el('select', { class: 'select', style: 'padding:6px 10px;font-size:12px;' });
    for (const [id, label] of THEMES) themeSel.appendChild(el('option', { value: id, text: label, selected: store.state.ui.theme === id }));
    themeSel.addEventListener('change', () => store.setUI({ theme: themeSel.value }));
    top.appendChild(themeSel);

    // Palette
    top.appendChild(el('button', { class: 'btn btn-secondary btn-sm', title: 'Палитра (Ctrl+K)', html: '⌘ <span style="opacity:0.6;font-size:10px;">Ctrl+K</span>', onclick: openPalette }));

    // Focus
    top.appendChild(el('button', { class: 'btn btn-secondary btn-icon', id: 'focusBtn', title: 'Фокус (Ctrl+F)', text: '◎', onclick: () => store.setUI({ focus: !store.state.ui.focus }) }));

    // Export
    const expSel = el('select', { class: 'select', style: 'padding:6px 8px;font-size:12px;' });
    for (const f of EXPORT_FORMATS) expSel.appendChild(el('option', { value: f.id, text: f.label }));
    expSel.addEventListener('change', () => { runExport(expSel.value); expSel.selectedIndex = 0; });
    top.appendChild(expSel);
    top.appendChild(el('button', { class: 'btn btn-primary btn-sm', text: 'Экспорт', onclick: () => runExport(expSel.value) }));
}

function refreshProjectSelect(sel) {
    sel.innerHTML = '';
    for (const name of store.listProjects()) {
        sel.appendChild(el('option', { value: name, text: name, selected: name === store.state.currentProject }));
    }
}

function buildNav() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = '';
    for (const [id, ico, label] of VIEWS) {
        const btn = el('button', {
            class: id === store.state.ui.view ? 'active' : '',
            html: `<span class="ico">${ico}</span><span class="label">${label}</span>`,
            onclick: () => { location.hash = '#/' + id; }
        });
        btn.dataset.route = id;
        nav.appendChild(btn);
    }
}

function buildStatusbar() {
    const bar = document.getElementById('statusbar');
    bar.innerHTML = '';
    bar.appendChild(el('span', { class: 'stat' }, [
        el('span', { html: '<span class="num" id="stat-chars">0</span>' })
    ]));
    bar.appendChild(el('span', { class: 'stat' }, [
        el('span', { html: '<span class="num" id="stat-words">0</span>' })
    ]));
    bar.appendChild(el('span', { class: 'stat' }, [
        el('span', { html: '<span class="num" id="stat-scenes">0</span>' })
    ]));
    bar.appendChild(el('span', { class: 'stat' }, [
        el('span', { html: '<span class="num" id="stat-characters">0</span>' })
    ]));
    bar.appendChild(el('span', { class: 'stat' }, [
        el('span', { html: '<span class="num" id="stat-pages">0</span>' })
    ]));

    bar.appendChild(el('span', { class: 'spacer' }));

    const dot = el('span', { class: 'dot saved', id: 'saveDot' });
    const txt = el('span', { id: 'saveText', text: 'Сохранено' });
    bar.appendChild(el('span', { class: 'stat' }, [dot, txt]));

    bar.appendChild(el('span', { class: 'stat hint', html: '<kbd>Ctrl+K</kbd> палитра <kbd>Ctrl+F</kbd> фокус <kbd>Ctrl+S</kbd> сохранить' }));
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', store.state.ui.theme);
}

/* ---- Router ---- */
function currentRoute() {
    const raw = location.hash.replace(/^#\/?/, '');
    return VIEWS.find(v => v[0] === raw) ? raw : 'editor';
}

function renderView() {
    const route = currentRoute();
    store.setUI({ view: route });

    const viewHost = document.getElementById('view');
    if (currentMount && currentMount.unmount) {
        try { currentMount.unmount(); } catch (e) { console.error(e); }
    }
    viewHost.innerHTML = '';
    const found = VIEWS.find(v => v[0] === route);
    currentMount = found ? found[3] : Editor;
    currentView = route;

    document.querySelectorAll('.main-nav button').forEach(b => {
        b.classList.toggle('active', b.dataset.route === route);
    });

    currentMount.mount(viewHost);
}

/* ---- Global events ---- */
window.addEventListener('hashchange', renderView);

document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
    if (mod && e.key.toLowerCase() === 's') {
        e.preventDefault(); store.saveProject();
        toast('Сохранено', 'ok');
        return;
    }
    if (mod && e.key.toLowerCase() === 'f') { e.preventDefault(); store.setUI({ focus: !store.state.ui.focus }); return; }
    if (mod && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        // Открываем редактор и фокус на поиск
        location.hash = '#/editor';
        toast('Поиск в редакторе: Ctrl+F браузера', 'warn');
        return;
    }
    if (mod && e.key.toLowerCase() === 't') {
        e.preventDefault();
        const idx = THEMES.findIndex(t => t[0] === store.state.ui.theme);
        const next = THEMES[(idx + 1) % THEMES.length][0];
        store.setUI({ theme: next });
        const sel = document.querySelector('.topbar select');
        const selAll = document.querySelectorAll('.topbar select');
        for (const s of selAll) if (s.querySelector(`option[value="${next}"]`)) s.value = next;
        return;
    }
    if (mod && !e.shiftKey && e.key >= '1' && e.key <= '7') {
        // Вставки — только если открыт редактор
        if (currentRoute() !== 'editor') return;
        // Пропустим — редактор слушает сам через textarea
    }
    if (e.key === 'Escape' && store.state.ui.focus) {
        store.setUI({ focus: false });
    }
});

/* ---- Подписки ---- */
store.on('ui:changed', patch => {
    if (patch.theme) applyTheme();
    if (patch.focus !== undefined) {
        document.body.classList.toggle('focus-mode', !!patch.focus);
        const btn = document.getElementById('focusBtn');
        if (btn) btn.textContent = patch.focus ? '◉' : '◎';
    }
});

store.on('save:status', status => {
    const dot = document.getElementById('saveDot');
    const txt = document.getElementById('saveText');
    if (!dot) return;
    if (status === 'saving') { dot.className = 'dot saving'; txt.textContent = 'Сохранение…'; }
    else { dot.className = 'dot saved'; txt.textContent = 'Сохранено'; }
});

store.on('project:changed', () => {
    const sel = document.getElementById('projectSelect');
    if (sel) sel.value = store.state.currentProject;
});

/* ---- Старт ---- */
function boot() {
    applyTheme();
    buildTopbar();
    buildNav();
    buildStatusbar();
    document.body.classList.toggle('focus-mode', !!store.state.ui.focus);

    // Начальный экран
    if (!location.hash) location.hash = '#/editor';
    renderView();

    // Ежедневный автоснимок (один раз в день)
    const today = todayKey();
    const flagKey = 'sp.lastAutoSnapshot';
    if (localStorage.getItem(flagKey) !== today) {
        const content = store.state.project.content || '';
        if (content.trim()) store.addVersion('Автоснимок ' + today, { auto: true });
        localStorage.setItem(flagKey, today);
    }

    console.log('%cСценариум', 'font-size:20px;font-weight:bold;color:#8A6CD4', '— среда сценариста');
    console.log('Ctrl+K — палитра команд');
    console.log('Горячие клавиши: Ctrl+S, Ctrl+F, Ctrl+K, Ctrl+T');
}

boot();

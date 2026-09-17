// Центральное состояние + сохранение в localStorage + подписки.
const LS_PROJECTS = 'sp.projects';       // список имён
const LS_CURRENT  = 'sp.current';        // активный проект
const LS_PROJECT  = n => `sp.project.${n}`;
const LS_UI       = 'sp.ui';
const LS_DISCIPLINE = 'sp.discipline';

function readJSON(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function writeJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error('LS write fail', key, e); } }

const DEFAULT_PROJECT = () => ({
    name: 'default',
    content: `НАР. КВАРТИРА ИВАНА — ДЕНЬ

Иван сидит на диване, смотрит в стену. За окном шумят машины.

ИВАН
(вздыхая)
Опять этот кошмар. Сколько можно?

Он встаёт, подходит к окну.

ИНТ. КАФЕ «У КОФЕЙНИ» — УТРО

В кафе тихо играет джаз. Ольга и Дмитрий сидят за столиком у окна.

ОЛЬГА
Ты сегодня какой-то задумчивый.

ДМИТРИЙ
Просто мысли. Много мыслей.

ОЛЬГА
Рассказывай. Я слушаю.

ДМИТРИЙ
(пауза)
Не знаю, с чего начать.`,
    meta: {
        title: 'Новый сценарий', subtitle: '', author: '', format: 'film',
        genre: '', deadline: '', targetPages: 110, logline: '', synopsis: '', tags: []
    },
    characters: [],
    beats: [],              // [{ id, act, title, description, sceneNum }]
    cards: {},              // { [sceneNum]: { purpose, conflict, location, tod, characters: [], mood } }
    notes: [],              // [{ id, text, anchor: {start,end}, createdAt, resolved }]
    versions: [],           // [{ id, name, content, createdAt, wordCount, auto }]
    sessions: [],           // [{ start, end, words, date }]
    dailyProgress: {},      // { 'YYYY-MM-DD': { words, minutes } }
    settings: {}
});

class Store {
    constructor() {
        this.listeners = new Map();
        this.state = {
            currentProject: localStorage.getItem(LS_CURRENT) || 'default',
            project: null,
            ui: readJSON(LS_UI, { view: 'editor', theme: 'cosmic', focus: false, sidebarOpen: true, sideTab: 'scenes' }),
            discipline: readJSON(LS_DISCIPLINE, {
                goalDaily: 500,
                goalType: 'words',
                pomodoro: { work: 25, break: 5, state: 'idle', endsAt: null, mode: 'work' },
                sound: null
            }),
            saveStatus: 'saved',  // saved | saving | dirty
            sessionStart: Date.now(),
            sessionWords: 0
        };
        this._ensureProject();
    }

    /* -------- pub/sub -------- */
    on(evt, fn) {
        if (!this.listeners.has(evt)) this.listeners.set(evt, new Set());
        this.listeners.get(evt).add(fn);
        return () => this.listeners.get(evt).delete(fn);
    }
    emit(evt, payload) {
        const set = this.listeners.get(evt);
        if (set) set.forEach(fn => { try { fn(payload); } catch (e) { console.error(e); } });
        const any = this.listeners.get('*');
        if (any) any.forEach(fn => fn(evt, payload));
    }

    /* -------- projects -------- */
    _listProjects() {
        let list = readJSON(LS_PROJECTS, null);
        if (!Array.isArray(list) || !list.length) { list = ['default']; writeJSON(LS_PROJECTS, list); }
        return list;
    }
    listProjects() { return this._listProjects(); }

    _ensureProject() {
        const names = this._listProjects();
        if (!names.includes(this.state.currentProject)) this.state.currentProject = names[0];
        const data = readJSON(LS_PROJECT(LS_PROJECT, this.state.currentProject), null)
                  || readJSON(LS_PROJECT(this.state.currentProject), null);
        this.state.project = data || DEFAULT_PROJECT();
        this.state.project.name = this.state.currentProject;
        // Миграция: гарантируем наличие полей.
        const p = this.state.project;
        p.meta = Object.assign(DEFAULT_PROJECT().meta, p.meta || {});
        p.characters = p.characters || [];
        p.beats = p.beats || [];
        p.cards = p.cards || {};
        p.notes = p.notes || [];
        p.versions = p.versions || [];
        p.sessions = p.sessions || [];
        p.dailyProgress = p.dailyProgress || {};
        p.settings = p.settings || {};
    }

    loadProject(name) {
        this.saveProject();
        this.state.currentProject = name;
        localStorage.setItem(LS_CURRENT, name);
        this._ensureProject();
        this.emit('project:changed', name);
        this.emit('change');
    }

    createProject(name, template = null) {
        const names = this._listProjects();
        if (names.includes(name)) return false;
        names.push(name);
        names.sort();
        writeJSON(LS_PROJECTS, names);
        const p = template ? { ...DEFAULT_PROJECT(), ...template, name } : DEFAULT_PROJECT();
        p.name = name;
        writeJSON(LS_PROJECT(name), p);
        return true;
    }

    deleteProject(name) {
        if (name === 'default') return false;
        const names = this._listProjects().filter(n => n !== name);
        writeJSON(LS_PROJECTS, names);
        localStorage.removeItem(LS_PROJECT(name));
        if (this.state.currentProject === name) this.loadProject(names[0] || 'default');
        return true;
    }

    saveProject() {
        if (!this.state.project) return;
        writeJSON(LS_PROJECT(this.state.currentProject), this.state.project);
    }

    /* -------- content -------- */
    setContent(text) {
        const prev = this.state.project.content || '';
        const prevW = prev.trim() ? prev.trim().split(/\s+/).length : 0;
        const newW = text.trim() ? text.trim().split(/\s+/).length : 0;
        const delta = newW - prevW;
        this.state.project.content = text;
        if (delta > 0) this._addProgress(delta);
        this.state.sessionWords += Math.max(0, delta);
        this._scheduleSave();
        this.emit('content:changed');
    }

    _addProgress(deltaWords) {
        const key = new Date().toISOString().slice(0, 10);
        const dp = this.state.project.dailyProgress;
        if (!dp[key]) dp[key] = { words: 0, minutes: 0 };
        dp[key].words += deltaWords;
    }

    /* -------- UI prefs -------- */
    setUI(patch) {
        Object.assign(this.state.ui, patch);
        writeJSON(LS_UI, this.state.ui);
        this.emit('ui:changed', patch);
    }
    setDiscipline(patch) {
        Object.assign(this.state.discipline, patch);
        writeJSON(LS_DISCIPLINE, this.state.discipline);
        this.emit('discipline:changed');
    }

    /* -------- autosave -------- */
    _scheduleSave() {
        this.state.saveStatus = 'saving';
        this.emit('save:status', 'saving');
        clearTimeout(this._t);
        this._t = setTimeout(() => {
            this.saveProject();
            this.state.saveStatus = 'saved';
            this.emit('save:status', 'saved');
        }, 700);
    }

    /* -------- versions -------- */
    addVersion(name, { auto = false } = {}) {
        const v = {
            id: 'v_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            name: name || (auto ? 'Автоснимок' : 'Снимок'),
            content: this.state.project.content || '',
            createdAt: Date.now(),
            wordCount: (this.state.project.content || '').trim().split(/\s+/).filter(Boolean).length,
            auto
        };
        this.state.project.versions.unshift(v);
        // Ограничение: 30 снимков + авто-снимки храним не более 20
        const manual = this.state.project.versions.filter(x => !x.auto);
        const autos = this.state.project.versions.filter(x => x.auto).slice(0, 20);
        this.state.project.versions = [...manual.slice(0, 30), ...autos]
            .sort((a, b) => b.createdAt - a.createdAt);
        this.saveProject();
        this.emit('versions:changed');
        return v;
    }
    removeVersion(id) {
        this.state.project.versions = this.state.project.versions.filter(v => v.id !== id);
        this.saveProject();
        this.emit('versions:changed');
    }
    restoreVersion(id) {
        const v = this.state.project.versions.find(x => x.id === id);
        if (!v) return false;
        this.addVersion('Перед восстановлением');
        this.setContent(v.content);
        this.saveProject();
        this.emit('versions:changed');
        this.emit('content:changed');
        return true;
    }
}

export const store = new Store();

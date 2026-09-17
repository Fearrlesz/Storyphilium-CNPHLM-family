// Помодоро, типографика, звуки, стрик, аналитика прогресса.
import { store } from './store.js';
import { toast, todayKey } from './ui.js';

/* ========== Помодоро ========== */
class Pomodoro {
    constructor() {
        this.timer = null;
        this.onTick = null;
    }
    get state() { return store.state.discipline.pomodoro; }
    _tick() {
        const s = this.state;
        const now = Date.now();
        const left = Math.max(0, Math.round((s.endsAt - now) / 1000));
        this.onTick && this.onTick(left, s.mode);
        if (left <= 0) {
            this._complete();
        }
    }
    start(minutes, mode = 'work') {
        const s = this.state;
        s.mode = mode;
        s.state = 'running';
        s.endsAt = Date.now() + minutes * 60 * 1000;
        store.setDiscipline({ pomodoro: s });
        clearInterval(this.timer);
        this.timer = setInterval(() => this._tick(), 500);
        this._tick();
    }
    pause() {
        const s = this.state;
        s.state = 'paused';
        s.remaining = Math.max(0, Math.round((s.endsAt - Date.now()) / 1000));
        store.setDiscipline({ pomodoro: s });
        clearInterval(this.timer);
        this.onTick && this.onTick(s.remaining || 0, s.mode);
    }
    resume() {
        const s = this.state;
        s.state = 'running';
        s.endsAt = Date.now() + (s.remaining || 0) * 1000;
        store.setDiscipline({ pomodoro: s });
        clearInterval(this.timer);
        this.timer = setInterval(() => this._tick(), 500);
    }
    stop() {
        clearInterval(this.timer);
        const s = this.state;
        s.state = 'idle'; s.endsAt = null; s.remaining = null;
        store.setDiscipline({ pomodoro: s });
        this.onTick && this.onTick(0, s.mode);
    }
    _complete() {
        clearInterval(this.timer);
        const s = this.state;
        const finishedMode = s.mode;
        s.state = 'idle'; s.endsAt = null; s.remaining = null;
        // Автоматически переключаемся
        if (finishedMode === 'work') {
            store.state.project.sessions = store.state.project.sessions || [];
            store.state.project.sessions.push({ start: Date.now() - 25 * 60000, end: Date.now(), words: store.state.sessionWords, date: todayKey() });
            store.state.sessionWords = 0;
            store.saveProject();
            s.mode = 'break';
            toast('✅ Спринт завершён! 5 минут отдыха.', 'ok');
            this.start(s.break || 5, 'break');
        } else {
            s.mode = 'work';
            toast('☕ Перерыв закончен. Пора писать!', 'ok');
        }
        store.setDiscipline({ pomodoro: s });
    }
    getRemaining() {
        const s = this.state;
        if (s.state === 'running') return Math.max(0, Math.round((s.endsAt - Date.now()) / 1000));
        if (s.state === 'paused') return s.remaining || 0;
        return (s.mode === 'work' ? (s.work || 25) : (s.break || 5)) * 60;
    }
}
export const pomodoro = new Pomodoro();

/* ========== Русская типографика ========== */
export function fixRussianTypography(text) {
    let t = text;
    // Многоточие
    t = t.replace(/\.{3,}/g, '…');
    // Двойные кавычки -> ёлочки (только пары)
    t = t.replace(/"([^"\n]+)"/g, '«$1»');
    t = t.replace(/'([^'\n]+)'/g, '«$1»');
    // Длинное тире в диалогах и ремарках (пробел-дефис-пробел -> пробел-тире-пробел)
    t = t.replace(/(\S)\s+-\s+(\S)/g, '$1 — $2');
    // Дефис между словами без пробелов, но только если это не диалоговая ремарка
    // (не трогаем compound words: «что-то», «какой-то»)
    // Неразрывный пробел перед длинным тире
    t = t.replace(/ — /g, '\u00A0— ');
    // Неразрывный пробел после коротких предлогов/союзов (1–2 буквы)
    t = t.replace(/(\s)([вВкКсСуУоОаАиИ]|[нН]а|[пП]о|[зЗ]а|[иИ]з|[оО]т|[дД]о|[бБ]ез|[дД]ля|[пП]ри|[оО]бо|[нН]о|[чЧ]то|[кК]ак)\s+/g, '$1$2\u00A0');
    // Кавычки внутри ёлочек — лапки
    // (упрощённо, оставляем как есть)
    return t;
}

/* ========== Прогресс и стрик ========== */
export function computeStreak(progress) {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        const p = progress[key];
        if (p && p.words > 0) streak++;
        else if (i === 0) continue; // сегодня ещё не писали — стрик не разрываем
        else break;
    }
    return streak;
}

export function buildHeatmap(progress, days = 30) {
    const cells = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        const p = progress[key] || { words: 0 };
        cells.push({ key, date: d, words: p.words });
    }
    const max = Math.max(1, ...cells.map(c => c.words));
    return cells.map(c => {
        let level = 0;
        if (c.words > 0) level = Math.min(4, Math.ceil((c.words / max) * 4));
        return { ...c, level };
    });
}

/* ========== Фоновые звуки (Web Audio, без файлов) ========== */
let soundCtx = null;
let soundNodes = null;

function createNoiseBuffer(ctx, seconds = 4) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buf;
}

function startSounds(kind) {
    stopSounds();
    soundCtx = soundCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (soundCtx.state === 'suspended') soundCtx.resume();
    const ctx = soundCtx;
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    if (kind === 'rain' || kind === 'white') {
        const src = ctx.createBufferSource();
        src.buffer = createNoiseBuffer(ctx, 6);
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = kind === 'rain' ? 'bandpass' : 'highpass';
        filter.frequency.value = kind === 'rain' ? 1400 : 500;
        filter.Q.value = kind === 'rain' ? 0.7 : 1;
        src.connect(filter).connect(master);
        src.start();
        soundNodes = { src, master };
    } else if (kind === 'cafe') {
        const src = ctx.createBufferSource();
        src.buffer = createNoiseBuffer(ctx, 6);
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 900;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.15;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.05;
        lfo.connect(lfoGain).connect(master.gain);
        src.connect(filter).connect(master);
        src.start(); lfo.start();
        soundNodes = { src, lfo, master };
    } else if (kind === 'fire') {
        const src = ctx.createBufferSource();
        src.buffer = createNoiseBuffer(ctx, 4);
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        src.connect(filter).connect(master);
        src.start();
        soundNodes = { src, master };
    }
    store.setDiscipline({ sound: kind });
}

function stopSounds() {
    if (soundNodes) {
        try { soundNodes.src?.stop(); } catch {}
        try { soundNodes.lfo?.stop(); } catch {}
        soundNodes = null;
    }
    store.setDiscipline({ sound: null });
}

export function toggleSound(kind) {
    if (store.state.discipline.sound === kind) stopSounds();
    else startSounds(kind);
    return store.state.discipline.sound;
}

// Дэшборд: цели, стрик, heatmap, помодоро, глубокая аналитика.
import { store } from '../store.js';
import { el, fmtNum, todayKey, promptDialog } from '../ui.js';
import { parseScript, countWords, estimateReadTime, estimateScreenTime, fmtDuration, topWords, extractLocations } from '../parser.js';
import { computeStreak, buildHeatmap, pomodoro } from '../features.js';

let _unsubs = [];
let _tickInterval = null;

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const header = el('div', { class: 'view-header' }, [
        el('div', {}, [
            el('h2', { text: 'Дэшборд' }),
            el('div', { class: 'sub', text: 'Цель, стрик, сессии и аналитика сценария' })
        ]),
        el('div', { class: 'spacer' }),
        el('button', { class: 'btn btn-secondary btn-sm', text: '⚙ Цель дня', onclick: editGoal })
    ]);

    const body = el('div', { class: 'view-body' });
    view.append(header, body);
    host.appendChild(view);

    render(body);
    _tickInterval = setInterval(() => updatePomodoro(body), 1000);

    _unsubs.push(store.on('content:changed', () => render(body)));
    _unsubs.push(store.on('project:changed', () => render(body)));
    _unsubs.push(store.on('discipline:changed', () => render(body)));
}

export function unmount() {
    _unsubs.forEach(u => u && u()); _unsubs = [];
    clearInterval(_tickInterval); _tickInterval = null;
}

function render(root) {
    root.innerHTML = '';
    const text = store.state.project.content || '';
    const meta = store.state.project.meta || {};
    const { scenes, characters } = parseScript(text);
    const words = countWords(text);
    const today = store.state.project.dailyProgress[todayKey()]?.words || 0;
    const goal = store.state.discipline.goalDaily || 500;
    const streak = computeStreak(store.state.project.dailyProgress);
    const readTime = estimateReadTime(text);
    const screenTime = estimateScreenTime(text);

    /* ---- Метрики ---- */
    const grid = el('div', { class: 'dash-grid' });

    const goalPct = Math.min(100, Math.round((today / goal) * 100));
    const ringHtml = goalRing(today, goal, goalPct);
    grid.appendChild(metricCard('Цель дня', ringHtml, `${today} из ${goal} слов · ${goalPct}%`));
    grid.appendChild(metricCard('🔥 Стрик', `${streak}`, streak ? `дней подряд` : 'начните сегодня'));
    grid.appendChild(metricCard('📝 Всего слов', fmtNum(words), `${scenes.length} сцен · ${characters.length} персонажей`));
    grid.appendChild(metricCard('📖 Экранное время', fmtDuration(screenTime), `чтение ~${readTime} мин`));

    if (meta.deadline) {
        const d = new Date(meta.deadline);
        const days = Math.ceil((d - Date.now()) / 86400000);
        const pages = Math.max(1, Math.ceil(text.length / 1000));
        const target = meta.targetPages || 110;
        const remaining = Math.max(0, target - pages);
        const perDay = days > 0 ? Math.ceil(remaining / days) : remaining;
        grid.appendChild(metricCard(
            '📅 Дедлайн',
            days > 0 ? `${days} дн.` : (days === 0 ? 'сегодня' : 'просрочен'),
            `осталось ${remaining} стр. · ~${perDay} стр./день`
        ));
    }

    root.appendChild(grid);

    /* ---- Помодоро + heatmap ---- */
    const row = el('div', { style: 'display:grid;grid-template-columns:minmax(240px, 1fr) 2fr;gap:16px;margin-bottom:20px;' });

    const pomo = el('div', { class: 'pomodoro', id: 'pomodoroBox' });
    pomo.innerHTML = pomodoroHtml();
    wirePomodoro(pomo);
    row.appendChild(pomo);

    const heatBox = el('div', { class: 'card' });
    heatBox.appendChild(el('div', { class: 'card-title', text: 'Активность за 30 дней' }));
    const cells = buildHeatmap(store.state.project.dailyProgress, 30);
    const grid2 = el('div', { class: 'heatmap' });
    for (const c of cells) {
        const cell = el('div', { class: 'cell' + (c.level ? ' h' + c.level : ''), title: `${c.key}: ${c.words} сл.` });
        grid2.appendChild(cell);
    }
    heatBox.appendChild(grid2);
    heatBox.appendChild(el('div', { class: 'heatmap-legend' }, [
        el('span', { text: 'меньше' }),
        el('span', { class: 'cell', style: 'width:14px;height:14px;display:inline-block;' }),
        el('span', { class: 'cell h1', style: 'width:14px;height:14px;display:inline-block;' }),
        el('span', { class: 'cell h2', style: 'width:14px;height:14px;display:inline-block;' }),
        el('span', { class: 'cell h3', style: 'width:14px;height:14px;display:inline-block;' }),
        el('span', { class: 'cell h4', style: 'width:14px;height:14px;display:inline-block;' }),
        el('span', { text: 'больше' })
    ]));
    row.appendChild(heatBox);
    root.appendChild(row);

    /* ---- Аналитика ---- */
    const analytics = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px;' });

    // Диалог vs действие
    let dialogueW = 0, actionW = 0;
    for (const s of scenes) { dialogueW += s.dialogueWords; actionW += s.actionWords; }
    const totalW = dialogueW + actionW || 1;
    const dlgCard = el('div', { class: 'card' });
    dlgCard.appendChild(el('div', { class: 'card-title', text: 'Соотношение' }));
    dlgCard.appendChild(statRow('Диалоги', dialogueW, totalW));
    dlgCard.appendChild(statRow('Действие', actionW, totalW));
    analytics.appendChild(dlgCard);

    // Экранное время по персонажам
    const charCard = el('div', { class: 'card' });
    charCard.appendChild(el('div', { class: 'card-title', text: 'Реплики по персонажам' }));
    const maxLines = Math.max(1, ...characters.map(c => c.lines));
    for (const c of characters.slice(0, 8)) {
        charCard.appendChild(statRow(c.name, c.lines, maxLines));
    }
    if (!characters.length) charCard.appendChild(el('div', { style: 'font-size:12px;color:var(--text-light);', text: 'Пока никого' }));
    analytics.appendChild(charCard);

    // Длина сцен
    const lenCard = el('div', { class: 'card' });
    lenCard.appendChild(el('div', { class: 'card-title', text: 'Длина сцен (слов)' }));
    const maxScene = Math.max(1, ...scenes.map(s => s.words));
    for (const s of scenes.slice(0, 12)) {
        lenCard.appendChild(statRow(`Сцена ${s.num}: ${s.location || '—'}`, s.words, maxScene));
    }
    if (!scenes.length) lenCard.appendChild(el('div', { style: 'font-size:12px;color:var(--text-light);', text: 'Сцен пока нет' }));
    analytics.appendChild(lenCard);

    // Топ-слова
    const wordsCard = el('div', { class: 'card' });
    wordsCard.appendChild(el('div', { class: 'card-title', text: 'Частые слова' }));
    const top = topWords(text, 12);
    const maxW = Math.max(1, ...top.map(([, n]) => n));
    for (const [w, n] of top) wordsCard.appendChild(statRow(w, n, maxW));
    if (!top.length) wordsCard.appendChild(el('div', { style: 'font-size:12px;color:var(--text-light);', text: 'Пока мало текста' }));
    analytics.appendChild(wordsCard);

    root.appendChild(analytics);
}

function metricCard(label, valueHtml, sub) {
    const c = el('div', { class: 'metric' });
    c.appendChild(el('div', { class: 'metric-label', text: label }));
    if (typeof valueHtml === 'string' && valueHtml.includes('<svg')) {
        c.innerHTML += `<div class="metric-value">${valueHtml}</div>`;
    } else {
        c.appendChild(el('div', { class: 'metric-value', text: valueHtml }));
    }
    c.appendChild(el('div', { class: 'metric-sub', text: sub }));
    return c;
}

function goalRing(current, goal, pct) {
    const r = 26, c = 2 * Math.PI * r;
    const offset = c * (1 - Math.min(1, current / goal));
    return `<div class="goal-ring">
        <svg width="66" height="66">
            <circle class="ring-bg" cx="33" cy="33" r="${r}"></circle>
            <circle class="ring-fg" cx="33" cy="33" r="${r}"
                stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"></circle>
        </svg>
        <div>
            <div style="font-size:22px;font-weight:700;color:var(--accent);">${current}</div>
            <div style="font-size:11px;color:var(--text-light);">из ${goal}</div>
        </div>
    </div>`;
}

function statRow(label, value, max) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    const row = el('div', { class: 'stat-row' });
    row.appendChild(el('div', { class: 'label', text: label }));
    const bar = el('div', { class: 'bar' });
    const fill = el('span');
    fill.style.width = pct + '%';
    bar.appendChild(fill);
    row.appendChild(bar);
    row.appendChild(el('div', { class: 'val', text: String(value) }));
    return row;
}

/* ---- Помодоро ---- */
function pomodoroHtml() {
    const s = store.state.discipline.pomodoro;
    const remain = pomodoro.getRemaining();
    const m = String(Math.floor(remain / 60)).padStart(2, '0');
    const sec = String(remain % 60).padStart(2, '0');
    const modeLabel = s.mode === 'work' ? 'работа' : 'перерыв';
    return `
        <div class="p-mode">Помодоро · ${modeLabel}</div>
        <div class="p-time" id="pTime">${m}:${sec}</div>
        <div class="p-actions">
            ${s.state === 'running'
                ? `<button class="btn btn-secondary btn-sm" data-act="pause">⏸ Пауза</button>
                   <button class="btn btn-danger btn-sm" data-act="stop">✕ Стоп</button>`
                : s.state === 'paused'
                ? `<button class="btn btn-primary btn-sm" data-act="resume">▶ Продолжить</button>
                   <button class="btn btn-danger btn-sm" data-act="stop">✕ Стоп</button>`
                : `<button class="btn btn-primary btn-sm" data-act="start">▶ 25 мин</button>
                   <button class="btn btn-secondary btn-sm" data-act="short">5 мин</button>`}
        </div>`;
}

function wirePomodoro(root) {
    root.addEventListener('click', e => {
        const btn = e.target.closest('button[data-act]');
        if (!btn) return;
        const act = btn.dataset.act;
        if (act === 'start') pomodoro.start(25, 'work');
        if (act === 'short') pomodoro.start(5, 'break');
        if (act === 'pause') pomodoro.pause();
        if (act === 'resume') pomodoro.resume();
        if (act === 'stop') pomodoro.stop();
        root.innerHTML = pomodoroHtml();
        wirePomodoro(root);
    });
}

function updatePomodoro() {
    const node = document.getElementById('pTime');
    if (!node) return;
    const remain = pomodoro.getRemaining();
    const m = String(Math.floor(remain / 60)).padStart(2, '0');
    const s = String(remain % 60).padStart(2, '0');
    node.textContent = `${m}:${s}`;
}

async function editGoal() {
    const val = await promptDialog('Цель дня (слов)', String(store.state.discipline.goalDaily || 500), 'Сколько слов в день');
    const n = parseInt(val, 10);
    if (n > 0) {
        store.setDiscipline({ goalDaily: n });
        render(document.getElementById('view').querySelector('.view-body'));
    }
                         }

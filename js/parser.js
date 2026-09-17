// Разбор текста сценария: сцены, персонажи, диалоги, ремарки, действия.
const SCENE_RE = /^(НАР\.|ИНТ\.|ЭКСТ\.|НАРУЖ\.|ВНУТР\.|ИНТ\/ЭКСТ\.|NAR\.|INT\.|EXT\.)/i;
const TRANSITION_RE = /^(ЗАТЕМНЕНИЕ|ПЕРЕХОД\s*:|НАПЛЫВ|СМАЗКА|CUT TO:|FADE|SMASH CUT|DISSOLVE|ТИТР|TITLES?)/i;
const PAREN_RE = /^\(.*\)$/;
const UPPER_NAME_RE = /^[А-ЯЁA-Z][А-ЯЁA-Z\s\-'\.\d]*$/;

const isSceneHeading = t => SCENE_RE.test(t);
const isTransition = t => TRANSITION_RE.test(t);
const isParenthetical = t => PAREN_RE.test(t);
const isUpperName = t => t && t.length < 60 && UPPER_NAME_RE.test(t) && !isSceneHeading(t) && !isTransition(t);

export function parseScript(text) {
    const lines = (text || '').split('\n');
    const scenes = [];
    const charMap = new Map(); // name -> { name, dialogueWords, lines, scenes: Set }
    let currentScene = null;
    let dialogueTarget = null;

    const pushScene = () => { if (currentScene) scenes.push(currentScene); };

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        const trimmed = raw.trim();

        if (isSceneHeading(trimmed)) {
            pushScene();
            const prefix = (trimmed.match(SCENE_RE) || [''])[0].toUpperCase();
            const rest = trimmed.slice(prefix.length).replace(/^\s*[-–—]?\s*/, '');
            const parts = rest.split(/\s*[-–—]\s*/);
            currentScene = {
                num: scenes.length + 1,
                lineIndex: i,
                raw: trimmed,
                prefix,
                location: parts[0] || '',
                tod: parts[1] || '',
                characters: new Set(),
                words: 0,
                dialogueWords: 0,
                actionWords: 0,
                startLine: i,
                endLine: i
            };
            dialogueTarget = null;
            continue;
        }

        if (currentScene) currentScene.endLine = i;

        if (!trimmed) { dialogueTarget = null; continue; }
        if (isParenthetical(trimmed)) continue; // часть предыдущего диалога
        if (isTransition(trimmed)) { dialogueTarget = null; continue; }

        // Имя персонажа: смотрим, идёт ли после него реплика (не заголовок, не действие в верхнем регистре).
        if (isUpperName(trimmed)) {
            const next = (lines[i + 1] || '').trim();
            const nextNonEmpty = next || (lines.slice(i + 1).find(l => l.trim()) || '').trim();
            if (nextNonEmpty && (!UPPER_NAME_RE.test(nextNonEmpty) || PAREN_RE.test(nextNonEmpty) || isParenthetical(nextNonEmpty))) {
                dialogueTarget = trimmed;
                if (!charMap.has(trimmed)) charMap.set(trimmed, { name: trimmed, dialogueWords: 0, lines: 0, scenes: new Set() });
                charMap.get(trimmed).scenes.add(scenes.length + 1);
                if (currentScene) currentScene.characters.add(trimmed);
                continue;
            }
        }

        const words = trimmed.split(/\s+/).filter(Boolean).length;
        if (dialogueTarget) {
            const c = charMap.get(dialogueTarget);
            if (c) { c.dialogueWords += words; c.lines += 1; }
            if (currentScene) currentScene.dialogueWords += words;
        } else if (currentScene) {
            currentScene.actionWords += words;
        }
        if (currentScene) currentScene.words += words;
    }
    pushScene();

    const characters = Array.from(charMap.values())
        .map(c => ({ ...c, scenesCount: c.scenes.size }))
        .sort((a, b) => b.dialogueWords - a.dialogueWords);

    return { scenes, characters };
}

export function countWords(text) {
    const t = (text || '').trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
}

export function estimateReadTime(text) {
    // ~180 слов/мин для чтения вслух сценария
    const w = countWords(text);
    const min = Math.max(1, Math.round(w / 180));
    return min;
}

export function estimateScreenTime(text) {
    // Средний сценарий: ~1 страница / ~55 сек экранного времени.
    // Считаем «страницы» как 1000 знаков.
    const chars = (text || '').length;
    const pages = Math.max(1, Math.ceil(chars / 1000));
    const sec = pages * 55;
    return sec;
}

export function fmtDuration(sec) {
    if (!sec || sec < 60) return `${sec} сек`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m < 60) return s ? `${m} мин ${s} сек` : `${m} мин`;
    const h = Math.floor(m / 60);
    const rm = m % 60;
    return rm ? `${h} ч ${rm} мин` : `${h} ч`;
}

export function topWords(text, n = 15) {
    const stop = new Set(('и в во не что он на я с со как а то все она так его но да ты к у же вы за бы по только ее мне было вот от меня еще нет о из ему теперь когда даже ну вдруг ли если или ни быть был него до вас нибудь опять уж вам ведь там потом себя ничего ей может они тут где есть надо ней для мы тебя их чем была сам чтоб без будто чего раз тоже себе под будет ж тогда кто этот того потому этого какой совсем ним здесь этом один почти мой тем чтобы нее сейчас были куда зачем всех никогда можно при наконец два об другой хоть после над больше тот через эти нас про всего них какая много разве три эту моя впрочем хорошо свою этой перед иногда лучше чуть том нельзя такой им более всегда конечно всю между'.split(/\s+/)));
    const counts = new Map();
    const words = (text || '').toLowerCase().match(/[а-яёa-z]{4,}/g) || [];
    for (const w of words) {
        if (stop.has(w)) continue;
        counts.set(w, (counts.get(w) || 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, n);
}

export function extractLocations(scenes) {
    const map = new Map();
    for (const s of scenes) {
        if (!s.location) continue;
        const key = s.location.toUpperCase();
        map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

// Экспорт во все форматы. Общие правила: BOM для текстовых, аккуратные имена.
import { store } from './store.js';
import { downloadBlob, escapeHtml, toast } from './ui.js';
import { parseScript } from './parser.js';

function fileBase() {
    const name = store.state.currentProject || 'script';
    const d = new Date();
    const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return `${name}_${date}`;
}

function getContent() { return store.state.project.content || ''; }

/* ---------- TXT ---------- */
export function exportTxt() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    downloadBlob(c, fileBase() + '.txt', 'text/plain;charset=utf-8');
    toast('TXT сохранён', 'ok');
}

/* ---------- Fountain ---------- */
export function exportFountain() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const meta = store.state.project.meta;
    const head = [
        `Title: ${meta.title || store.state.currentProject}`,
        `Author: ${meta.author || ''}`,
        `Credit: Сценариум`,
        `Date: ${new Date().toISOString().slice(0,10)}`
    ].join('\n');
    downloadBlob(`${head}\n\n${c}`, fileBase() + '.fountain', 'text/plain;charset=utf-8');
    toast('Fountain сохранён', 'ok');
}

/* ---------- JSON ---------- */
export function exportJson() {
    const data = {
        version: '2.0',
        format: 'screenarium',
        exportedAt: new Date().toISOString(),
        project: store.state.project
    };
    downloadBlob(JSON.stringify(data, null, 2), fileBase() + '.json', 'application/json;charset=utf-8');
    toast('JSON сохранён', 'ok');
}

/* ---------- Markdown ---------- */
export function exportMarkdown() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const meta = store.state.project.meta;
    const { scenes } = parseScript(c);
    const lines = c.split('\n');
    const out = [];
    out.push(`# ${meta.title || store.state.currentProject}`);
    if (meta.logline) out.push(`\n> ${meta.logline}`);
    out.push('');
    for (const raw of lines) {
        const t = raw.trim();
        if (!t) { out.push(''); continue; }
        if (/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i.test(t)) { out.push(`\n## ${t}\n`); continue; }
        if (/^\(.*\)$/.test(t)) { out.push(`*${t}*`); continue; }
        if (t === t.toUpperCase() && /[А-ЯA-Z]/.test(t) && t.length < 60) { out.push(`**${t}**`); continue; }
        out.push(t);
    }
    downloadBlob(out.join('\n'), fileBase() + '.md', 'text/markdown;charset=utf-8');
    toast('Markdown сохранён', 'ok');
}

/* ---------- RTF ---------- */
export function exportRtf() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const esc = c.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
    const rtf = `{\\rtf1\\ansi\\ansicpg1251\\deff0{\\fonttbl{\\f0 Courier New;}}\\f0\\fs24\n` + esc.replace(/\n/g, '\\par\n') + `}`;
    downloadBlob(rtf, fileBase() + '.rtf', 'application/rtf');
    toast('RTF сохранён', 'ok');
}

/* ---------- Final Draft (.fdx) ---------- */
export function exportFdx() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const { scenes } = parseScript(c);
    const lines = c.split('\n');
    const paras = [];
    let inDialogue = false;
    for (const raw of lines) {
        const t = raw.trim();
        if (!t) { inDialogue = false; continue; }
        let type = 'Action';
        if (/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i.test(t)) { type = 'Scene Heading'; inDialogue = false; }
        else if (/^\(.*\)$/.test(t)) { type = 'Parenthetical'; }
        else if (t === t.toUpperCase() && /[А-ЯA-Z]/.test(t) && t.length < 60) { type = 'Character'; inDialogue = true; }
        else if (inDialogue) { type = 'Dialogue'; }
        paras.push(`<Paragraph Type="${type}"><Text>${escapeHtml(t)}</Text></Paragraph>`);
    }
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<FinalDraft DocumentType="Script" Template="No" Version="5">
<Content>
${paras.join('\n')}
</Content>
</FinalDraft>`;
    downloadBlob(xml, fileBase() + '.fdx', 'application/xml;charset=utf-8');
    toast('Final Draft сохранён', 'ok');
}

/* ---------- Scene list (TXT) ---------- */
export function exportSceneList() {
    const { scenes, characters } = parseScript(getContent());
    if (!scenes.length) return toast('Сцен не найдено', 'warn');
    const lines = [];
    lines.push(`СПИСОК СЦЕН — ${store.state.project.meta.title || store.state.currentProject}`);
    lines.push('='.repeat(60));
    for (const s of scenes) {
        lines.push(`${String(s.num).padStart(3, ' ')}. ${s.raw}`);
        lines.push(`     Локация: ${s.location || '—'}   Время: ${s.tod || '—'}`);
        if (s.characters.size) lines.push(`     Персонажи: ${Array.from(s.characters).join(', ')}`);
        const card = store.state.project.cards[s.num];
        if (card) {
            if (card.purpose) lines.push(`     Цель сцены: ${card.purpose}`);
            if (card.conflict) lines.push(`     Конфликт: ${card.conflict}`);
            if (card.mood) lines.push(`     Настроение: ${card.mood}`);
        }
        lines.push('');
    }
    lines.push('='.repeat(60));
    lines.push(`Персонажей: ${characters.length}`);
    for (const ch of characters) lines.push(`  • ${ch.name} — реплик: ${ch.lines}, слов: ${ch.dialogueWords}, сцен: ${ch.scenesCount}`);
    downloadBlob(lines.join('\n'), fileBase() + '_scenes.txt', 'text/plain;charset=utf-8');
    toast('Список сцен сохранён', 'ok');
}

/* ---------- HTML ---------- */
export function exportHtml() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const meta = store.state.project.meta;
    const title = escapeHtml(meta.title || store.state.currentProject);
    const lines = c.split('\n');
    const body = [];
    let inDialogue = false;
    for (const raw of lines) {
        const t = raw.trim();
        if (!t) { body.push('<div class="empty"></div>'); inDialogue = false; continue; }
        if (/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i.test(t)) {
            body.push(`<div class="scene">${escapeHtml(t)}</div>`);
            inDialogue = false;
        } else if (/^\(.*\)$/.test(t)) {
            body.push(`<div class="paren">${escapeHtml(t)}</div>`);
        } else if (t === t.toUpperCase() && /[А-ЯA-Z]/.test(t) && t.length < 60) {
            body.push(`<div class="char">${escapeHtml(t)}</div>`);
            inDialogue = true;
        } else if (inDialogue) {
            body.push(`<div class="dialogue">${escapeHtml(t)}</div>`);
        } else {
            body.push(`<div class="action">${escapeHtml(t)}</div>`);
            inDialogue = false;
        }
    }
    const html = `<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"><title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>
body{background:#f8f6f2;color:#1a1a1a;font-family:'Courier Prime',monospace;margin:0;padding:40px 20px;line-height:1.6;}
.page{max-width:820px;margin:0 auto;background:#fff;padding:70px 80px;box-shadow:0 8px 40px rgba(0,0,0,0.08);border-radius:6px;}
.title{text-align:center;margin-bottom:50px;padding-bottom:30px;border-bottom:2px solid #e8e0d6;}
.title h1{font-family:'Playfair Display',serif;font-size:34px;margin:0 0 6px;letter-spacing:2px;}
.title .sub{color:#8a7a6a;letter-spacing:4px;text-transform:uppercase;font-size:13px;}
.title .date{color:#b0a090;font-size:13px;margin-top:10px;}
.scene{font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:28px 0 12px;padding-bottom:4px;border-bottom:1px solid #ece6de;}
.action{margin:8px 0;}
.char{font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:16px 0 2px;padding-left:35%;}
.paren{font-style:italic;color:#6a5a4a;padding-left:28%;font-size:0.95em;}
.dialogue{padding-left:25%;padding-right:20%;margin:2px 0 8px;}
.empty{height:12px;}
@media print{body{background:#fff;padding:0;}.page{box-shadow:none;padding:0;}}
</style></head>
<body><div class="page">
<div class="title"><h1>${title}</h1><div class="sub">Сценарий</div><div class="date">${new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})}</div></div>
${body.join('\n')}
</div></body></html>`;
    downloadBlob(html, fileBase() + '.html', 'text/html;charset=utf-8');
    toast('HTML сохранён', 'ok');
}

/* ---------- PDF (через печать) ---------- */
export function exportPdf() {
    const c = getContent();
    if (!c.trim()) return toast('Сценарий пуст', 'warn');
    const target = document.getElementById('printContent');
    target.textContent = c;
    window.print();
}

export function runExport(format) {
    switch (format) {
        case 'txt': return exportTxt();
        case 'fountain': return exportFountain();
        case 'json': return exportJson();
        case 'md': return exportMarkdown();
        case 'rtf': return exportRtf();
        case 'fdx': return exportFdx();
        case 'scenes': return exportSceneList();
        case 'html': return exportHtml();
        case 'pdf': return exportPdf();
        default: return toast('Неизвестный формат', 'err');
    }
}

export const EXPORT_FORMATS = [
    { id: 'txt', label: 'TXT' },
    { id: 'fountain', label: 'Fountain' },
    { id: 'fdx', label: 'Final Draft (.fdx)' },
    { id: 'md', label: 'Markdown' },
    { id: 'rtf', label: 'RTF' },
    { id: 'html', label: 'HTML (типографский)' },
    { id: 'pdf', label: 'PDF (печать)' },
    { id: 'scenes', label: 'Список сцен' },
    { id: 'json', label: 'JSON (полный проект)' }
];

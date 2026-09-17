// Заметки: привязанные к позициям в тексте + свободные.
import { store } from '../store.js';
import { el, toast, openModal, confirmDialog, escapeHtml, promptDialog } from '../ui.js';

let _unsubs = [];

export function mount(host) {
    host.innerHTML = '';
    const view = el('div', { class: 'view' });

    const header = el('div', { class: 'view-header' }, [
        el('div', {}, [
            el('h2', { text: 'Заметки' }),
            el('div', { class: 'sub', text: 'Комментарии к тексту и свободные записи' })
        ]),
        el('div', { class: 'spacer' }),
        el('button', { class: 'btn btn-secondary btn-sm', text: '📌 Из выделения', onclick: addFromSelection }),
        el('button', { class: 'btn btn-primary btn-sm', text: '➕ Свободная заметка', onclick: () => editNote(null) })
    ]);

    const body = el('div', { class: 'view-body', id: 'notesBody' });
    view.append(header, body);
    host.appendChild(view);
    render(body);

    _unsubs.push(store.on('project:changed', () => render(body)));
}

export function unmount() { _unsubs.forEach(u => u && u()); _unsubs = []; }

function render(root) {
    root.innerHTML = '';
    const notes = store.state.project.notes || [];
    if (!notes.length) {
        root.appendChild(el('div', { class: 'empty-state' }, [
            el('div', { class: 'es-ico', text: '🗒' }),
            el('div', { class: 'es-title', text: 'Заметок нет' }),
            el('div', { class: 'es-hint', text: 'Выделите фрагмент в редакторе и нажмите «Из выделения» — или создайте свободную заметку.' })
        ]));
        return;
    }
    for (const n of notes) {
        const node = el('div', { class: 'note-item' + (n.resolved ? ' resolved' : '') });
        if (n.anchor && n.anchor.text) {
            node.appendChild(el('div', { class: 'note-anchor', text: '«' + n.anchor.text.slice(0, 100) + '»' }));
        }
        node.appendChild(el('div', { class: 'note-text', text: n.text }));
        const meta = el('div', { style: 'font-size:11px;color:var(--text-light);' ,
            text: new Date(n.createdAt).toLocaleString('ru-RU') });
        node.appendChild(meta);
        const actions = el('div', { class: 'note-actions' }, [
            el('button', { class: 'btn btn-outline btn-sm', text: n.resolved ? '↺ Открыть' : '✓ Решить', onclick: () => {
                n.resolved = !n.resolved;
                store.saveProject();
                render(root);
            }}),
            el('button', { class: 'btn btn-outline btn-sm', text: '↪ Перейти', onclick: () => {
                if (!n.anchor) return toast('Заметка без привязки');
                location.hash = '#/editor';
                setTimeout(() => {
                    const ta = document.getElementById('scriptInput');
                    if (!ta) return;
                    ta.focus();
                    ta.setSelectionRange(n.anchor.start, n.anchor.end);
                }, 80);
            }}),
            el('button', { class: 'btn btn-outline btn-sm', text: '✎ Изменить', onclick: () => editNote(n, () => render(root)) }),
            el('button', { class: 'btn btn-danger btn-sm', text: '✕', onclick: async () => {
                if (await confirmDialog('Удалить заметку?', n.text.slice(0, 80))) {
                    store.state.project.notes = store.state.project.notes.filter(x => x.id !== n.id);
                    store.saveProject();
                    render(root);
                }
            }})
        ]);
        node.appendChild(actions);
        root.appendChild(node);
    }
}

function addFromSelection() {
    const ta = document.getElementById('scriptInput');
    if (!ta) { toast('Откройте редактор', 'warn'); return; }
    if (ta.selectionStart === ta.selectionEnd) { toast('Выделите фрагмент в редакторе', 'warn'); return; }
    const start = ta.selectionStart, end = ta.selectionEnd;
    const text = ta.value.slice(start, end);
    // Спросим текст заметки
    const input = el('textarea', { class: 'textarea', rows: 3, placeholder: 'Что отметить в этом фрагменте' });
    const wrap = el('div', {}, [
        el('div', { style: 'font-size:12px;color:var(--text-secondary);margin-bottom:6px;',
            text: 'Фрагмент: «' + text.slice(0, 120) + (text.length > 120 ? '…' : '') + '»' }),
        input
    ]);
    openModal({
        title: 'Новая заметка',
        body: wrap,
        actions: [
            { label: 'Отмена' },
            { label: 'Добавить', kind: 'btn-primary', onClick: () => {
                const t = input.value.trim();
                if (!t) return false;
                store.state.project.notes.unshift({
                    id: 'n_' + Math.random().toString(36).slice(2, 8),
                    text: t,
                    anchor: { start, end, text },
                    createdAt: Date.now(),
                    resolved: false
                });
                store.saveProject();
                toast('Заметка добавлена', 'ok');
                mount(document.getElementById('view'));
            }}
        ]
    });
}

function editNote(existing, cb) {
    const isNew = !existing;
    const n = existing || { id: 'n_' + Math.random().toString(36).slice(2, 8), text: '', anchor: null, createdAt: Date.now(), resolved: false };
    const input = el('textarea', { class: 'textarea', rows: 5, placeholder: 'Текст заметки' });
    input.value = n.text;
    openModal({
        title: isNew ? 'Новая заметка' : 'Заметка',
        body: input,
        actions: [
            { label: 'Отмена' },
            { label: isNew ? 'Создать' : 'Сохранить', kind: 'btn-primary', onClick: () => {
                const t = input.value.trim();
                if (!t) return false;
                n.text = t;
                if (isNew) store.state.project.notes.unshift(n);
                store.saveProject();
                cb ? cb() : mount(document.getElementById('view'));
            }}
        ]
    });
}

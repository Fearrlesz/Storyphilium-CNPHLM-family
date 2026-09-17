// Шаблоны структуры под русские и международные форматы.
export const STORY_TEMPLATES = {
    three_act: {
        name: 'Трёхактная структура',
        description: 'Классическая драматургия: завязка, развитие, развязка.',
        acts: [
            { name: 'Акт I — Завязка', beats: [
                { title: 'Экспозиция', description: 'Мир героя до перемен. Что он теряет, если ничего не изменится.' },
                { title: 'Катализатор', description: 'Событие, которое выбивает героя из привычной колеи.' },
                { title: 'Первый поворот', description: 'Герой принимает вызов и входит в новую реальность.' }
            ]},
            { name: 'Акт II — Развитие', beats: [
                { title: 'Испытания', description: 'Герой пробует, ошибается, обзаводится союзниками и врагами.' },
                { title: 'Середина', description: 'Точка невозврата. Ставки выросли. Иллюзия рухнула.' },
                { title: 'Всё потеряно', description: 'Тёмная ночь души. Герой на дне.' }
            ]},
            { name: 'Акт III — Развязка', beats: [
                { title: 'Прозрение', description: 'Герой понимает, что нужно сделать.' },
                { title: 'Кульминация', description: 'Финальная схватка — физическая и внутренняя.' },
                { title: 'Развязка', description: 'Новый баланс. Кем стал герой.' }
            ]}
        ]
    },
    save_the_cat: {
        name: 'Save the Cat (15 бит)',
        description: 'Блейк Снайдер, адаптировано для кино и сериалов.',
        acts: [
            { name: 'Акт I', beats: [
                { title: 'Открывающий образ', description: 'Образ, задающий тон.' },
                { title: 'Тема заявлена', description: 'Кто-то проговорил тему фильма.' },
                { title: 'Завязка', description: 'Мир героя, рутина, изъян.' },
                { title: 'Катализатор', description: 'Событие, меняющее всё.' },
                { title: 'Спор', description: 'Герой сопротивляется.' },
                { title: 'Переход ко II акту', description: 'Герой делает выбор и входит.' }
            ]},
            { name: 'Акт II', beats: [
                { title: 'B-история', description: 'Любовная линия, наставник, союзник.' },
                { title: 'Игра с темой', description: 'Развлечение, знакомство с миром.' },
                { title: 'Середина', description: 'Ложная победа или ложное поражение.' },
                { title: 'Плохие парни приближаются', description: 'Давление.' },
                { title: 'Всё потеряно', description: 'Смерть, разрыв, провал.' },
                { title: 'Ночь души', description: 'Тишина, осознание.' }
            ]},
            { name: 'Акт III', beats: [
                { title: 'Переход к III акту', description: 'Внезапное озарение.' },
                { title: 'Финал', description: 'Схватка, кульминация.' },
                { title: 'Финальный образ', description: 'Зеркало открывающего.' }
            ]}
        ]
    },
    hero_journey: {
        name: 'Путь героя (12 ступеней)',
        description: 'Кэмпбелл/Кэмерон, для крупных мифов и франшиз.',
        acts: [
            { name: 'Обычный мир', beats: [
                { title: 'Обычный мир', description: 'Дом героя.' },
                { title: 'Зов приключений', description: 'Проблема зовёт.' },
                { title: 'Отказ от зова', description: 'Страх.' },
                { title: 'Встреча с наставником', description: 'Помощь.' },
                { title: 'Пересечение порога', description: 'Вход в новый мир.' }
            ]},
            { name: 'Испытания', beats: [
                { title: 'Испытания, союзники, враги', description: 'Правила нового мира.' },
                { title: 'Подход к пещере', description: 'Приготовление.' },
                { title: 'Главное испытание', description: 'Смерть и возрождение.' },
                { title: 'Награда', description: 'Сокровище.' }
            ]},
            { name: 'Возвращение', beats: [
                { title: 'Обратный путь', description: 'Погоня.' },
                { title: 'Воскрешение', description: 'Финальная проверка.' },
                { title: 'Возвращение с эликсиром', description: 'Дом изменён.' }
            ]}
        ]
    },
    five_act_russian: {
        name: 'Русская 5-актная драма',
        description: 'Традиция сценарной школы: экспозиция — завязка — развитие — кульминация — развязка.',
        acts: [
            { name: 'Экспозиция', beats: [{ title: 'Экспозиция', description: 'Знакомство с героем и миром.' }] },
            { name: 'Завязка', beats: [{ title: 'Завязка', description: 'Основной конфликт обозначен.' }] },
            { name: 'Развитие', beats: [
                { title: 'Перипетии', description: 'Череда осложнений.' },
                { title: 'Кризис', description: 'Герой у грани.' }
            ]},
            { name: 'Кульминация', beats: [{ title: 'Кульминация', description: 'Высшая точка конфликта.' }] },
            { name: 'Развязка', beats: [{ title: 'Развязка', description: 'Итог, вывод, изменённый герой.' }] }
        ]
    },
    youtube: {
        name: 'YouTube-видео (10–20 мин)',
        description: 'Хук, контекст, основная часть, кульминация, призыв.',
        acts: [
            { name: 'Хук', beats: [
                { title: 'Хук (0:00–0:15)', description: 'Зацепить внимание. Обещание видео.' },
                { title: 'Интро (0:15–0:45)', description: 'О чём и почему это важно.' }
            ]},
            { name: 'Основная часть', beats: [
                { title: 'Контекст', description: 'Ввод в тему.' },
                { title: 'Основные пункты', description: '2–4 смысловых блока.' },
                { title: 'Пик', description: 'Самое яркое.' }
            ]},
            { name: 'Завершение', beats: [
                { title: 'Итог', description: 'Резюме.' },
                { title: 'Призыв', description: 'Подписка, комментарий, следующее видео.' }
            ]}
        ]
    },
    tiktok: {
        name: 'TikTok / Shorts (30–60 сек)',
        description: 'Три удара: хук — конфликт — разворот.',
        acts: [
            { name: 'Первая секунда', beats: [{ title: 'Хук', description: 'Первая фраза держит до конца.' }] },
            { name: 'Разворот', beats: [
                { title: 'Конфликт', description: 'Проблема, вопрос, напряжение.' },
                { title: 'Пик', description: 'Яркая точка.' }
            ]},
            { name: 'Точка', beats: [{ title: 'Разворот/панч', description: 'Неожиданный финал или прямой призыв.' }] }
        ]
    },
    ad: {
        name: 'Рекламный ролик (30 сек)',
        description: 'Проблема — решение — преимущество — призыв.',
        acts: [
            { name: 'Проблема', beats: [
                { title: 'Хук (0–3 сек)', description: 'Цепляет боль или любопытство.' },
                { title: 'Боль', description: 'Разворачиваем проблему.' }
            ]},
            { name: 'Решение', beats: [
                { title: 'Продукт', description: 'Показываем.' },
                { title: 'Преимущество', description: 'Одна ключевая выгода.' }
            ]},
            { name: 'Финал', beats: [{ title: 'Призыв', description: 'Что сделать зрителю.' }] }
        ]
    },
    theater: {
        name: 'Театральная пьеса',
        description: 'Действия и явления, крупные сцены, диалог преобладает.',
        acts: [
            { name: 'Действие I', beats: [
                { title: 'Явление 1. Экспозиция', description: 'Мир и герои.' },
                { title: 'Явление 2. Конфликт', description: 'Первое столкновение.' }
            ]},
            { name: 'Действие II', beats: [
                { title: 'Развитие', description: 'Нагнетание.' },
                { title: 'Кризис', description: 'Перелом.' }
            ]},
            { name: 'Действие III', beats: [
                { title: 'Кульминация', description: 'Пик.' },
                { title: 'Развязка', description: 'Точка.' }
            ]}
        ]
    }
};

export const FORMAT_PRESETS = {
    film:    { label: '🎬 Фильм', targetPages: 110, pageWords: 220 },
    series:  { label: '📺 Сериал', targetPages: 45, pageWords: 220 },
    youtube: { label: '▶️ YouTube', targetPages: 5,  pageWords: 200 },
    tiktok:  { label: '🎵 TikTok/Shorts', targetPages: 1, pageWords: 120 },
    ad:      { label: '📣 Реклама', targetPages: 1, pageWords: 90 },
    theater: { label: '🎭 Пьеса', targetPages: 60, pageWords: 240 },
    podcast: { label: '🎙 Подкаст', targetPages: 10, pageWords: 250 }
};

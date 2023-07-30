# Поиск по ОКВЭД

## Описание и возможности приложения

Приложение позволяет просматривать, выбирать, искать, скрывать/раскрывать элементы списка ОКВЭД.

Выбранные элементы списка сохраняются в localStorage.

При обновлении приложения, состояние выбранных
элементов восстанавливается из localStorage, а состояние раскрытых элементов формируется из списка выбранных, причем
самый "глубокий" выбранный элемент автоматически не раскрывается.

При поиске по ОКВЭД, показываются только те элементы, название которых содержит искомую фразу. Также, приложение
автоматически раскрывает список до самых "глубоких" найденных элементов.

В случае, если отсутствуют совпадения при поиске или произошла ошибка загрузки данных, выводится соответствущее
сообщение на экран.

Проект построен с использованием Flux архитектуры (самописные actions, reducer, ContextProvider).

## Stack

- `Typescript`
- `React`
- `Styled-components`
- `Vite`

## Установка зависимостей и запуск проекта

1. Установка зависимостей: `yarn install` или `npm install`
2. Запуск проекта (локально): `yarn dev` или `npm run dev`

Приложение будет доступно по адресу: http://localhost:5173/

## Структура проекта

Корневая папка проекта: `src`.

Содержимое папки `src`:

<table>
    <tr>
        <th>Папка</th>
        <th>Описание содержимого</th>
    </tr>
    <tr>
        <td>api</td>
        <td>Файл с данными data.json (список кодов ОКВЭД), метод его загрузки getList.ts, файл с типами</td>
    </tr>
    <tr>
        <td>components</td>
        <td>Компоненты, которые не предполагается переиспользовать</td>
    </tr>
    <tr>
        <td>constants</td>
        <td>Эскпортируемый объект с глобальными константами</td>
    </tr>
    <tr>
        <td>hooks</td>
        <td>Кастомные хуки</td>
    </tr>
    <tr>
        <td>icon-components</td>
        <td>React-компоненты иконок</td>
    </tr>
    <tr>
        <td>pages</td>
        <td>Компонент главной страницы приложения (MainPage)</td>
    </tr>
    <tr>
        <td>store</td>
        <td>Самописный store (redux-like), использующий context и useReducer; хуки, специфичные для конкретного стора. Здесь располагается вся основная бизнес-логика</td>
    </tr>
    <tr>
        <td>theme</td>
        <td>Тема приложения и глобальные стили</td>
    </tr>
    <tr>
        <td>ui-toolkit</td>
        <td>Библиотека переиспользуемых компонентов</td>
    </tr>
    <tr>
        <td>utils</td>
        <td>Утилиты, используемые в различных частях проекта</td>
    </tr>
</table>

## Дополнительно

Шрифты, используемые на проекте, располагаются в папке `public/font/Roboto`. Подключение и настройка шрифтов
располагается в файле `src/fonts.css`.

Данные взяты из источника https://www.regfile.ru/okved2.html.



# Приложение для визуализации выравнивания аминокислотных последовательностей

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-blue)](https://abayreushenov.github.io/amino-acid-aligner)

## Описание

В области вычислительной биологии и биоинформатики одним из важнейших методов анализа белковых последовательностей является их выравнивание. Это позволяет определить сходство и различия между множеством последовательностей, исследовать функцию белков и их связи с другими белками.

Вот так может выглядеть аминокислотная последовательность (например, гемоглобин из мангуста) в буквенном представлении:

`VLSPADKTNIKASWEKIGSHGGEYGAEALERTFLCFPTTKTYFPHFDLSHGSAQVKAHGKKVADALTNAVGHLDDLPGALSALSDLHAYKLRVDPVNFKLLSHCLLVTLASHHPAEFT`

А вот её же представление в 3D: [https://www.rcsb.org/3d-view/4YU3/1](https://www.rcsb.org/3d-view/4YU3/1)

Каждая "буква" — это аминокислота, обладающая своими физическими и биологическими свойствами, которые влияют на структуру и функцию белка.

## Основные компоненты приложения

### Валидация ввода аминокислотных последовательностей
- Данные могут содержать только латинские буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ `-`
- Проверка одинаковой длины последовательностей
- Обязательные поля для ввода

### Визуализация выравнивания
- Цветовая схема для различных аминокислот
- Подсветка различий между последовательностями
- Адаптивный дизайн для разных размеров экрана

### Дополнительные функции
- Копирование выделенных фрагментов в буфер обмена
- Поддержка встроенного поиска (Ctrl+F)
- Уведомления о действиях пользователя

## Технологии

- **React** с **TypeScript**
- **Material UI** для компонентов интерфейса
- **React Hook Form** для валидации форм
- **GitHub Pages** для хостинга

## Деплой

Приложение доступно по адресу:
[https://abayreushenov.github.io/amino-acid-aligner](https://abayreushenov.github.io/amino-acid-aligner)

## Установка и запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/abayreushenov/amino-acid-aligner.git
cd biocode
```

2. Установить зависимости:
```bash
npm install
```

3. Запустить приложение:
```bash
npm start
```

4. Для сборки production-версии:
```bash
npm run build
```

## Лицензия

Этот проект распространяется под лицензией MIT.

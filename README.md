# MotorVault

MotorVault — маркетплейс премиальных подержанных автомобилей, разработанный на Next.js 16. Приложение позволяет просматривать каталог автомобилей, фильтровать лоты по типу кузова, изучать подробную информацию о каждом автомобиле и отправлять заявки продавцам.

Проект также интегрируется с публичным API NHTSA для получения актуального списка производителей автомобилей.

## Технологии

-   Next.js 16 (App Router)
-   React 19
-   TypeScript
-   CSS Variables
-   REST API
-   Server Components
-   Dynamic Routes

## Основной функционал

-   Каталог автомобилей
-   Фильтрация по типу кузова
-   Детальные страницы автомобилей
-   Форма связи с продавцом
-   Кастомная страница 404
-   Интеграция с внешним API NHTSA
-   API Routes в Next.js
-   Кэширование запросов через `revalidate`

## Структура проекта

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── catalog/
│   │   ├── page.tsx
│   │   ├── CatalogClient.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   └── api/makes/route.ts
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── VehicleCard.tsx
│   └── MakesWidget.tsx
├── lib/
│   └── vehicles.ts
└── types/
    └── vehicle.ts
```

## Работа с API

Проект использует собственный API Route:

```http
GET /api/makes
```

Маршрут получает данные из публичного сервиса NHTSA vPIC:

```text
https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json
```

Для уменьшения количества запросов используется кэширование:

```ts
revalidate: 86400;
```

Обновление данных происходит один раз в 24 часа.

## Запуск проекта

Установка зависимостей:

```bash
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```

## Production-сборка

Сборка проекта:

```bash
npm run build
```

Запуск production-версии:

```bash
npm run start
```

## Страницы

| Маршрут         | Описание                               |
| --------------- | -------------------------------------- |
| /               | Главная страница с featured listings   |
| /catalog        | Каталог автомобилей                    |
| /catalog/[slug] | Детальная информация об автомобиле     |
| /about          | Информация о компании                  |
| /api/makes      | API Endpoint со списком производителей |

## Что демонстрирует проект

-   Работа с App Router
-   Server Components и Client Components
-   Dynamic Routing
-   API Routes
-   Интеграция с внешними REST API
-   Кэширование данных
-   Типизация TypeScript
-   Организация проекта по feature-based структуре
-   Адаптивная верстка
-   Работа с пользовательскими сценариями и каталогом данных

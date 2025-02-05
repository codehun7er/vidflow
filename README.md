# VidFlow - A YouTube Alternative

[English](#english) | [Русский](#русский)

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo">

## Русский

### 🚀 Современная видеохостинговая платформа

VidFlow — это альтернатива YouTube с возможностью загрузки видео, создания каналов, комментариев и воспроизведения видео с поддержкой разных разрешений. Платформа обладает современным дизайном и плавными анимациями.

### ✨ Возможности

- 📹 Загрузка видео
- 📺 Просмотр видео
- 👥 Создание каналов
- 💬 Комментарии к видео
- 🎞 Пользовательский видеоплеер
- ⚙️ Разные разрешения видео
- 💫 Плавные анимации
- 🎨 Адаптивный дизайн (SCSS + Tailwind CSS)

### 🛠 Требования

- Node.js (версия 18 или выше)
- npm
- Docker (для базы данных)

### 🚀 Начало работы

1. Клонируйте репозиторий:

```bash
git clone https://github.com/codehun7er/vidflow.git
```

2. Запустите Docker для базы данных:

```bash
docker-compose up --build
```

3. Установите:

```bash
cd client
npm install
```

4. Запустите клиент:

```bash
npm run dev
```

5. Установите зависимости:

```bash
cd server
npm install
```

6. Загрузите схемы prisma в базу данных:

```bash
npx prisma db push
```

7. Запустите seeder для заполнения проекта данными:

```bash
npm run seed:run
```

8. Запустите сервер:

```bash
npm run start:dev
```

9. Откройте браузер и перейдите по адресу:

```
http://localhost:3000
```

---

## English

### 🚀 Modern Video Hosting Platform

VidFlow is a YouTube alternative featuring video uploads, channels, comments, and video playback with multiple resolutions. It has a sleek modern design with smooth animations.

### ✨ Features

- 📹 Video uploading
- 📺 Video viewing
- 👥 Channel creation
- 💬 Comments on videos
- 🎞 Custom video player
- ⚙️ Multiple video resolutions
- 💫 Smooth animations
- 🎨 Responsive design (SCSS + Tailwind CSS)

### 🛠 Prerequisites

- Node.js (version 18 or higher)
- npm
- Docker (for database)

### 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/codehun7er/vidflow.git
```

2. Start Docker for the database:

```bash
docker-compose up --build
```

3. Install dependencies:

```bash
cd client
npm install --force
```

4. start the frontend

```bash
npm run dev
```

5. Install dependencies:

```bash
cd server
npm install
```

6. Push prisma schemas to database:

```bash
npx prisma db push
```

7. Start seeder to fill project with some data:

```bash
npm run seed:run
```

8. Start the backend:

```bash
npm run start:dev
```

9. Open your browser and navigate to:

```
http://localhost:3000
```

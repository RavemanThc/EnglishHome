# EnglishHome

EnglishHome — веб-приложение для поиска преподавателей английского языка. Пользователь может просматривать преподавателей, фильтровать их по языку, уровню и стоимости занятия, добавлять преподавателей в избранное и бронировать уроки.

## ✨ Features

- 👨‍🏫 Просмотр списка преподавателей
- 🔎 Фильтрация преподавателей:
  - по языку преподавания
  - по уровню ученика
  - по стоимости занятия
  - только избранные преподаватели

- ❤️ Добавление и удаление преподавателей из избранного
- 🔐 Регистрация и авторизация пользователей
- 👤 Отображение профиля авторизованного пользователя
- 📅 Бронирование уроков
- 📚 Просмотр информации о преподавателе
- 📱 Адаптивный интерфейс для различных устройств
- ➕ `Load more` для постепенной загрузки списка преподавателей
- 🔒 Защита функций, доступных только авторизованным пользователям

## 🛠 Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **CSS Modules**
- **React Hook Form**
- **Yup**
- **React Icons**

### Backend / Services

- **Firebase Authentication** — регистрация и авторизация пользователей
- **Firebase Realtime Database** — хранение пользовательских данных и избранных преподавателей

## 📂 Project Structure

```text
EnglishHome/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── Filters/
│   ├── Teacher/
│   ├── Teachers/
│   ├── Modals/
│   └── ...
│
├── context/
│   └── AuthContext.tsx
│
├── hooks/
│   └── useFavorites.ts
│
├── lib/
│   └── firebase/
│       ├── api/
│       └── ...
│
├── types/
│   └── teachers.ts
│
├── public/
│
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd EnglishHome
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Add your Firebase project configuration values.

### 5. Run the development server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## 🔐 Authentication

Authentication is implemented using Firebase Authentication.

Users can:

- create an account
- log in
- log out
- access features available only to authenticated users

## ❤️ Favorites

The application allows authenticated users to save teachers to their favorites.

The favorites system is implemented using:

- Firebase Realtime Database
- `useFavorites` custom hook
- user-specific Firebase data

The favorites filter allows users to display only teachers they have saved.

## 🔎 Filtering

Teachers can be filtered using several parameters simultaneously:

```text
Language
   +
Level
   +
Price
   +
Favorites
```

Filters are combined, so the resulting list contains only teachers matching all selected criteria.

## 📱 Responsive Design

The interface is designed to work across different screen sizes:

- 💻 Desktop

The project follows a responsive and adaptive approach to provide a consistent user experience on different devices.

## 🧩 Component Architecture

The application is divided into reusable React components.

Examples include:

- `Filters` — filtering controls
- `TeachersList` — displaying and filtering teachers
- `Teacher` — individual teacher card
- `RegModal` — registration modal
- `AuthContext` — authentication state management
- `useFavorites` — favorites management

This approach keeps the application modular and makes individual features easier to maintain and extend.

## 🚀 Future Improvements

Possible future improvements include:

- pagination / infinite scrolling
- teacher search
- sorting by price
- improved booking functionality
- teacher availability calendar
- improved loading and error states
- additional user profile functionality
- performance optimizations

## 👨‍💻 Author

**Vladyslav Harkusha**

Full Stack Developer

---

⭐ If you find this project useful, feel free to give it a star.

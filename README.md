# EnglishHome

EnglishHome is a web application for finding English language teachers. Users can browse teachers, filter them by language, level, and hourly rate, add teachers to their favorites, and book lessons.

## ✨ Features

- 👨‍🏫 Browse a list of English teachers
- 🔎 Filter teachers by:
  - Teaching language
  - Student level
  - Hourly rate
  - Favorites only

- ❤️ Add and remove teachers from favorites
- 🔐 User registration and authentication
- 👤 Display the authenticated user's profile
- 📅 Book lessons with teachers
- 📚 View detailed teacher information
- ➕ `Load more` functionality for the teacher list
- 🔒 Authentication-based access to protected features

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

- **Firebase Authentication** — user registration and authentication
- **Firebase Realtime Database** — storing user data and favorite teachers

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
├── firebase/
│   ├── auth/
│   └── ...
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
git clone <git@github.com:RavemanThc/EnglishHome.git>
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

The application will be available at:

```text
https://english-home.vercel.app/teachers
```

## 🔐 Authentication

Authentication is implemented using **Firebase Authentication**.

Users can:

- Create an account
- Log in
- Log out
- Access features available only to authenticated users

## ❤️ Favorites

Authenticated users can save teachers to their favorites.

The favorites functionality is implemented using:

- Firebase Realtime Database
- The `useFavorites` custom hook
- User-specific Firebase data

Users can also enable the favorites filter to display only teachers they have saved.

## 🔎 Filtering

Teachers can be filtered using multiple criteria simultaneously:

```text
Language
   +
Level
   +
Price
   +
Favorites
```

All selected filters are applied together, so the resulting list contains only teachers that match the selected criteria.

The application is designed to provide a consistent user experience across different screen sizes:

- 💻 Desktop

The project follows a responsive and adaptive design approach.

## 🧩 Component Architecture

The application is built using reusable React components.

Key components include:

- `Filters` — teacher filtering controls
- `TeachersList` — displays and filters the teacher list
- `Teacher` — individual teacher card
- `RegModal` — user registration modal
- `AuthContext` — global authentication state management
- `useFavorites` — favorite teachers management

This component-based architecture keeps the application modular, maintainable, and easy to extend.

## 🚀 Future Improvements

Possible future improvements include:

- Pagination or infinite scrolling
- Teacher search functionality
- Sorting by price
- Enhanced booking functionality
- Teacher availability calendar
- Improved loading and error states
- Additional user profile functionality
- Performance optimizations

## 👨‍💻 Author

**Vladyslav Harkusha**

Full Stack Developer

---

⭐ If you find this project useful, feel free to give it a star.

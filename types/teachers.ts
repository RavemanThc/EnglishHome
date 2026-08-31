export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}
export interface SubmitBook {
  reason: string;
  userName: string;
  email: string;
  phone: string;
  teacherId: string;
  teacherName: string;
  teacherSurname: string;
}
export interface FiltersState {
  language: string | null;
  level: string | null;
  price: number | null;
  favoritesOnly: boolean;
}

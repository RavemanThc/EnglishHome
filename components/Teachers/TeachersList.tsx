"use client";

import { useState } from "react";
import { FiltersState, Teacher } from "@/types/teachers";
import Teach from "@/components/Teacher/Teacher";
import RegModal from "../Modals/RegModal/RegModal";
import css from "./TeacerList.module.css";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  teachers: Teacher[];
  filters: FiltersState;
}

export default function TeachersList({ teachers, filters }: Props) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const { user } = useAuth();
  const { favorites } = useFavorites(user?.uid);

  const filteredTeachers = teachers.filter((teacher) => {
    const languageMatch =
      !filters.language || teacher.languages.includes(filters.language);

    const levelMatch = !filters.level || teacher.levels.includes(filters.level);

    const priceMatch =
      filters.price === null || teacher.price_per_hour === filters.price;

    const favoriteMatch =
      !filters.favoritesOnly || favorites.includes(teacher.id);

    return languageMatch && levelMatch && priceMatch && favoriteMatch;
  });

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleRequireAuth = () => {
    setIsRegModalOpen(true);
  };

  return (
    <>
      <div className={css.teacherListWrap}>
        <ul className={css.listwrap}>
          {visibleTeachers.map((teacher) => (
            <li key={teacher.id}>
              <Teach
                teacher={teacher}
                onRequireAuth={handleRequireAuth}
                filters={filters}
              />
            </li>
          ))}
        </ul>

        {visibleCount < filteredTeachers.length && (
          <button
            type="button"
            className={css.loadMore}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}

        {filteredTeachers.length === 0 && <p>No teachers found.</p>}
      </div>

      {isRegModalOpen && <RegModal onClose={() => setIsRegModalOpen(false)} />}
    </>
  );
}

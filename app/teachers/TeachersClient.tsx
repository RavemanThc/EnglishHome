"use client";

import { useState } from "react";
import Filters from "@/components/Filters/Filters";
import TeachersList from "@/components/Teachers/TeachersList";
import { Teacher } from "@/types/teachers";
import css from "./TeachersPage.module.css";

interface Props {
  teachers: Teacher[];
}

interface FiltersState {
  language: string | null;
  level: string | null;
  price: number | null;
}

const TeachersClient = ({ teachers }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({
    language: null,
    level: null,
    price: null,
  });

  const filteredTeachers = teachers.filter((teacher) => {
    const languageMatch =
      !filters.language || teacher.languages.includes(filters.language);

    const levelMatch = !filters.level || teacher.levels.includes(filters.level);

    const priceMatch =
      filters.price === null || teacher.price_per_hour === filters.price;

    return languageMatch && levelMatch && priceMatch;
  });

  return (
    <section className={css.TeachersPage}>
      <Filters
        teachers={teachers}
        filters={filters}
        onFilterChange={setFilters}
      />

      <TeachersList teachers={filteredTeachers} filters={filters} />
    </section>
  );
};

export default TeachersClient;

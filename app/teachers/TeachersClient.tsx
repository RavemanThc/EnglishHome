"use client";

import { useState } from "react";
import Filters from "@/components/Filters/Filters";
import TeachersList from "@/components/Teachers/TeachersList";
import { FiltersState, Teacher } from "@/types/teachers";
import css from "./TeachersPage.module.css";

interface Props {
  teachers: Teacher[];
}

const TeachersClient = ({ teachers }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({
    language: null,
    level: null,
    price: null,
    favoritesOnly: false,
  });

  return (
    <section className={css.TeachersPage}>
      <Filters teachers={teachers} onFilterChange={setFilters} />

      <TeachersList teachers={teachers} filters={filters} />
    </section>
  );
};

export default TeachersClient;

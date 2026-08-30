"use client";

import { useState } from "react";
import { FiltersState, Teacher } from "@/types/teachers";
import Teach from "@/components/Teacher/Teacher";
import RegModal from "../Modals/RegModal/RegModal";
import css from "./TeacerList.module.css";

interface Props {
  teachers: Teacher[];
  filters: FiltersState;
}

export default function TeachersList({ teachers, filters }: Props) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const handleRequireAuth = () => {
    setIsRegModalOpen(true);
  };

  return (
    <>
      <div>
        <ul className={css.listwrap}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <Teach
                teacher={teacher}
                onRequireAuth={handleRequireAuth}
                filters={filters}
              />
            </li>
          ))}
        </ul>
      </div>

      {isRegModalOpen && <RegModal onClose={() => setIsRegModalOpen(false)} />}
    </>
  );
}

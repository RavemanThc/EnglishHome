"use client";

import { useState } from "react";
import { Teacher } from "@/types/teachers";
import Teach from "@/components/Teacher/Teacher";
import RegModal from "../Modals/RegModal/RegModal";
import css from "./TeacerList.module.css";
interface Props {
  teachers: Teacher[];
}

export default function TeachersList({ teachers }: Props) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const handleRequireAuth = () => {
    console.log("OPEN MODAL");

    setIsRegModalOpen(true);
  };

  return (
    <>
      <div>
        <ul className={css.listwrap}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <Teach teacher={teacher} onRequireAuth={handleRequireAuth} />
            </li>
          ))}
        </ul>
      </div>

      {isRegModalOpen && <RegModal onClose={() => setIsRegModalOpen(false)} />}
    </>
  );
}

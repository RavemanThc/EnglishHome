import Teach from "@/components/Teacher/Teacher";
import { getTeachers } from "../../firebase/api";
import css from "./TeachersPage.module.css";
const TeachersPage = async () => {
  const teachers = await getTeachers();

  return (
    <section className={css.TeachersPage}>
      <ul className={css.listwrap}>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <Teach teacher={teacher} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeachersPage;

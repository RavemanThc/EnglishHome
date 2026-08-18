import Teach from "@/components/Teacher/Teacher";
import { getTeachers } from "../../firebase/api";
import css from "./TeachersPage.module.css";
import TeachersList from "@/components/Teachers/TeachersList";
const TeachersPage = async () => {
  const teachers = await getTeachers();

  return (
    <section className={css.TeachersPage}>
      <TeachersList teachers={teachers} />
    </section>
  );
};

export default TeachersPage;

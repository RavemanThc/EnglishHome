import { getTeachers } from "../../firebase/api";
import TeachersClient from "./TeachersClient";

const TeachersPage = async () => {
  const teachers = await getTeachers();

  return <TeachersClient teachers={teachers} />;
};

export default TeachersPage;

import { Teacher } from "@/types/teachers";
import css from "./SubmitModal.module.css";
import Image from "next/image";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { submitSchema } from "@/validation/submitSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBooking } from "@/firebase/api";
interface Props {
  teacher: Teacher;
  onClose: () => void;
}
type SubmitFormData = yup.InferType<typeof submitSchema>;
const SubmitModal = ({ teacher, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmitFormData>({
    resolver: yupResolver(submitSchema),
    defaultValues: {
      reason: "career",
    },
  });
  const onSubmit = async (data: SubmitFormData) => {
    try {
      const bookingData = {
        ...data,
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherSurname: teacher.surname,
      };

      await createBooking(bookingData);

      toast.success("Your trial lesson has been booked!");

      onClose();
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackdropClick} className={css.ModalBack}>
      <div className={css.modalWrap}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close submit modal"
          className={css.CloseButt}
        >
          <svg width="32" height="32" className={css.closeIcon}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>
        <h1>Book trial lesson</h1>
        <p className={css.modalDescription}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.TeacherBox}>
          <Image
            src={teacher.avatar_url}
            alt={teacher.name}
            width={44}
            height={44}
            className={css.avatar}
          />
          <div className={css.TeacherNameBox}>
            <span className={css.teacherText}>Your teacher</span>
            <span className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.Form}>
          <fieldset className={css.radiobuttons}>
            <legend className={css.legend}>
              What is your main reason for learning English?
            </legend>

            <label>
              <input
                type="radio"
                value="Career and business"
                {...register("reason")}
                className={css.button}
              />
              Career and business
            </label>

            <label>
              <input
                type="radio"
                value=" Lesson for kids"
                {...register("reason")}
              />
              Lesson for kids
            </label>

            <label>
              <input
                type="radio"
                value="Living abroad"
                {...register("reason")}
              />
              Living abroad
            </label>

            <label>
              <input
                type="radio"
                value="Exams and coursework"
                {...register("reason")}
              />
              Exams and coursework
            </label>

            <label>
              <input
                type="radio"
                value="Culture, travel or hobby"
                {...register("reason")}
              />
              Culture, travel or hobby
            </label>
          </fieldset>
          <div className={css.textform}>
            <label>
              <input
                className={css.textInput}
                type="text"
                placeholder="Full Name"
                {...register("userName")}
              />
            </label>
            {errors.userName && <p>{errors.userName.message}</p>}
            <label>
              <input
                className={css.textInput}
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </label>
            {errors.email && <p>{errors.email.message}</p>}
            <label>
              <input
                className={css.textInput}
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
              />
            </label>
          </div>

          {errors.phone && <p>{errors.phone.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={css.SubmitButton}
          >
            {isSubmitting ? "Booking" : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitModal;

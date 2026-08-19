"use client";
import { useEffect, useState } from "react";
import css from "./LogModal.module.css";
import * as yup from "yup";
import { loginSchema } from "@/validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { login } from "@/firebase/auth";
type LoginFormData = yup.InferType<typeof loginSchema>;
interface Props {
  onClose: () => void;
}
const LogModal = ({ onClose }: Props) => {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");
      const user = await login(data.email, data.password);
      onClose();
    } catch (error: unknown) {
      console.error("Login Failed:", error);
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-credential).":
            setServerError("Invalid email or password.");
            break;

          case "Firebase: Error (auth/user-not-found).":
            setServerError("Invalid email or password.");
            break;

          case "Firebase: Error (auth/wrong-password).":
            setServerError("Invalid email or password.");
            break;

          default:
            setServerError("Login failed. Please try again.");
        }
      } else {
        setServerError("Login failed. Please try again.");
      }
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
          aria-label="Close registration modal"
          className={css.CloseButt}
        >
          ×
        </button>

        <h1 className={css.ModalTitle}>Log In</h1>

        <p className={css.ModalSubTitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.Form}>
          <label>
            <input
              type="email"
              {...registerField("email")}
              placeholder="Email"
            />

            {errors.email && <p>{errors.email.message}</p>}
          </label>

          <label className={css.ButterflyLabel}>
            <input
              type={showPassword ? "text" : "password"}
              {...registerField("password")}
              placeholder="Password"
              className={css.Butterfly}
            />

            <button
              type="button"
              className={css.eyeOff}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg width="18" height="18">
                <use
                  href={
                    showPassword
                      ? "/icons.svg#icon-eye-on"
                      : "/icons.svg#icon-eye-off"
                  }
                />
              </svg>
            </button>

            {errors.password && <p>{errors.password.message}</p>}
          </label>

          {serverError && <p role="alert">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={css.SubmitButton}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LogModal;

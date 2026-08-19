"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { registerSchema } from "@/validation/registerSchema";
import { register } from "@/firebase/auth";
import css from "./RegModal.module.css";
import LogModal from "../LogModal/LogModal";

type RegisterFormData = yup.InferType<typeof registerSchema>;

interface Props {
  onClose: () => void;
}

export default function RegModal({ onClose }: Props) {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      const user = await register(data);

      onClose();
    } catch (error: unknown) {
      console.error("Registration failed:", error);

      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setServerError("This email is already registered.");
            break;

          case "Firebase: Error (auth/invalid-email).":
            setServerError("Invalid email address.");
            break;

          case "Firebase: Error (auth/weak-password).":
            setServerError("Password is too weak.");
            break;

          default:
            setServerError("Registration failed. Please try again.");
        }
      } else {
        setServerError("Registration failed. Please try again.");
      }
    }
  };

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

        <h1 className={css.ModalTitle}>Registration</h1>

        <p className={css.ModalSubTitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.Form}>
          <label>
            <input
              type="text"
              {...registerField("userName")}
              placeholder="Name"
            />

            {errors.userName && <p>{errors.userName.message}</p>}
          </label>

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
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

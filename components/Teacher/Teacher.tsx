"use client";

import { Teacher } from "@/types/teachers";
import Image from "next/image";
import { useState } from "react";
import css from "./Teacher.module.css";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
interface Props {
  teacher: Teacher;
  onRequireAuth: () => void;
}

const Teach = ({ teacher, onRequireAuth }: Props) => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const { favorites, toggleFavorite } = useFavorites(user?.uid);

  const isFavorite = favorites.includes(teacher.id);

  const handleFavorite = () => {
    console.log("FAVORITE CLICK");
    console.log("USER:", user);
    if (!user) {
      onRequireAuth();
      return;
    }

    toggleFavorite(teacher.id);
  };
  return (
    <article className={css.TeachCard}>
      <div className={css.avatarWrap}>
        <Image
          src={teacher.avatar_url}
          alt={teacher.name}
          width={96}
          height={96}
          className={css.avatar}
        />
        <svg width="12" height="12" className={css.onlineIco}>
          <use href="/icons.svg#icon-online" />
        </svg>
      </div>
      <div className={css.TeachInfoCard}>
        <header className={css.headwrap}>
          <div className={css.teachNameWrap}>
            <h2>Languages</h2>
            <p className={css.teachName}>{teacher.name}</p>
          </div>
          <ul className={css.headlist}>
            <li>
              <svg width="16" height="16" className={css.book}>
                <use href="/icons.svg#icon-book" />
              </svg>
              <p>Lessons online</p>
            </li>{" "}
            <span className={css.palka}>|</span>
            <li>
              <p>Lessons done: {teacher.lessons_done}</p>
            </li>{" "}
            <span className={css.palka}>|</span>
            <li>
              <svg width="16" height="16">
                <use href="/icons.svg#icon-star" />
              </svg>
              <p>Rating: {teacher.rating}</p>
            </li>{" "}
            <span className={css.palka}>|</span>
            <li>
              Price / 1 hour:{" "}
              <span className={css.price}>{teacher.price_per_hour}$</span>
            </li>
          </ul>
          <button type="button" onClick={handleFavorite}>
            <svg
              width="22"
              height="20"
              className={`${css.heart} ${isFavorite ? css.heartActive : ""}`}
            >
              <use href="/icons.svg#icon-heart" />
            </svg>
          </button>
        </header>
        <section className={css.info}>
          <div className={css.infobox}>
            <h3>
              <span>Speaks: </span>
              {teacher.languages.join(", ")}
            </h3>
            <h3>
              <span>Lesson Info: </span>
              {teacher.lesson_info}
            </h3>
            <h3>
              <span>Conditions: </span>
              {teacher.conditions.join(" ")}
            </h3>
          </div>
          <button
            type="button"
            className={css.prevButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Hide" : "ReadMore"}
          </button>
          {isOpen && (
            <div className={css.more}>
              <p className={css.expirience}>{teacher.experience}</p>

              <div className={css.reviewSection}>
                {teacher.reviews.map((review, index) => (
                  <div className={css.reviewWrap} key={index}>
                    <div className={css.reviewBox}>
                      <p className={css.reviewerName}>{review.reviewer_name}</p>

                      <div className={css.ratebox}>
                        <svg width="15" height="14">
                          <use href="/icons.svg#icon-star" />
                        </svg>
                        <p className={css.ratingReview}>
                          {review.reviewer_rating}
                        </p>
                      </div>
                    </div>

                    <p className={css.comment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ul className={css.levelsWrap}>
            {teacher.levels.map((level, index) => (
              <li className={css.levels} key={index}>
                {level}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default Teach;

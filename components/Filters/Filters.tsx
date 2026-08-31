"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import css from "./Filters.module.css";
import { FiltersState, Teacher } from "@/types/teachers";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  teachers: Teacher[];
  onFilterChange: (filters: FiltersState) => void;
}

const Filters = ({ teachers, onFilterChange }: Props) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersState>({
    language: null,
    level: null,
    price: null,
    favoritesOnly: false,
  });

  const { user, logout } = useAuth();
  const { favorites } = useFavorites(user?.uid);
  const languages = [
    ...new Set(teachers.flatMap((teacher) => teacher.languages)),
  ];

  const levels = [...new Set(teachers.flatMap((teacher) => teacher.levels))];

  const prices = [
    ...new Set(teachers.map((teacher) => teacher.price_per_hour)),
  ];

  const toggleFilter = (filter: string) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  return (
    <section className={css.filter}>
      <div className={css.filterWrap}>
        <div className={css.filterItem}>
          <span className={css.filterTitle}>Languages</span>

          <div className={css.filterHeader}>
            <button
              type="button"
              onClick={() => toggleFilter("languages")}
              className={css.filterlist}
            >
              <span>{filters.language ?? languages[0]}</span>

              <FaChevronDown
                className={`${css.filterButton} ${
                  openFilter === "languages" ? css.rotate : ""
                }`}
              />
            </button>
          </div>

          {openFilter === "languages" && (
            <ul className={css.dropdown}>
              {languages.map((language) => (
                <li key={language}>
                  <button
                    type="button"
                    className={`${css.FilterButton} ${
                      (filters.language ?? languages[0]) === language
                        ? css.active
                        : ""
                    }`}
                    onClick={() => {
                      onFilterChange({
                        ...filters,
                        language,
                      });

                      setOpenFilter(null);
                    }}
                  >
                    {language}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Level */}
        <div className={css.filterItem}>
          <span className={css.filterTitle}>Level</span>

          <div className={css.filterHeader}>
            <button
              type="button"
              onClick={() => toggleFilter("level")}
              className={css.filterlist}
            >
              <span>{filters.level ?? "All levels"}</span>

              <FaChevronDown
                className={`${css.filterButton} ${
                  openFilter === "level" ? css.rotate : ""
                }`}
              />
            </button>
          </div>

          {openFilter === "level" && (
            <ul className={css.dropdown}>
              {levels.map((level) => (
                <li key={level}>
                  <button
                    className={`${css.FilterButton} ${
                      (filters.level ?? levels[0]) === level ? css.active : ""
                    }`}
                    type="button"
                    onClick={() => {
                      onFilterChange({
                        ...filters,
                        level,
                      });

                      setOpenFilter(null);
                    }}
                  >
                    {level}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price */}
        <div className={css.filterItem}>
          <span className={css.filterTitle}>Price</span>

          <div className={css.filterHeader}>
            <button
              type="button"
              onClick={() => toggleFilter("price")}
              className={css.filterlist}
            >
              <span>
                {filters.price !== null ? `$${filters.price}` : "All prices"}
              </span>

              <FaChevronDown
                className={`${css.filterButton} ${
                  openFilter === "price" ? css.rotate : ""
                }`}
              />
            </button>
          </div>

          {openFilter === "price" && (
            <ul className={css.dropdown}>
              {prices.map((price) => (
                <li key={price}>
                  <button
                    className={`${css.FilterButton} ${
                      (filters.price ?? prices[0]) === price ? css.active : ""
                    }`}
                    type="button"
                    onClick={() => {
                      onFilterChange({
                        ...filters,
                        price,
                      });

                      setOpenFilter(null);
                    }}
                  >
                    ${price}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {user && (
          <div
            className={`${css.favoriteWrap} ${filters.favoritesOnly ? css.favoriteWrapActive : ""}`}
          >
            <button
              type="button"
              onClick={() => {
                const newFilters = {
                  ...filters,
                  favoritesOnly: !filters.favoritesOnly,
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className={`${css.toggle} ${
                filters.favoritesOnly ? css.Favorite : ""
              }`}
              aria-label="Show favorites"
            >
              <span className={css.icon}>
                <svg
                  width="28"
                  height="26"
                  className={`${css.heart} ${filters.favoritesOnly ? css.heartActive : ""}`}
                >
                  <use href="/icons.svg#icon-heart" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;

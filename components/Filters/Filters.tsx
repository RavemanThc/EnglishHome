"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import css from "./Filters.module.css";
import { Teacher } from "@/types/teachers";

interface FiltersState {
  language: string | null;
  level: string | null;
  price: number | null;
}

interface Props {
  teachers: Teacher[];
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const Filters = ({ teachers, filters, onFilterChange }: Props) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

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
      </div>
    </section>
  );
};

export default Filters;

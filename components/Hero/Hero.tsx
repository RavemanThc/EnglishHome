import Image from "next/image";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.Hero}>
      <div className={css.HeroBox}>
        <div className={css.descriptionBox}>
          <h1>Unlock your potential with the best language tutors</h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your <span className={css.spanLang}>language</span>{" "}
            proficiency to new heights by connecting with highly qualified and
            experienced tutors.
          </p>
          <button className={css.heroButton} type="button">
            Get started
          </button>
        </div>
        <div className={css.HeroSecBox}>
          <Image
            src="/Hero.webp"
            alt="Hero"
            width={339}
            height={339}
            className={css.HeroImage}
          />
          <Image
            src="/Mac.webp"
            alt="Hero mac"
            width={360}
            height={304}
            className={css.HeroMacImage}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;

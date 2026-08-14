import css from "./Hero.module.css";

const BottomHero = () => {
  return (
    <section className={css.BottomHero}>
      <div className={css.BottomWrap}>
        <ul className={css.BottomList}>
          <li>
            <p>32,000 +</p>
            <h2>Experienced tutors</h2>
          </li>
          <li>
            <p>300,000 +</p>
            <h2>5-star tutor reviews</h2>
          </li>
          <li>
            <p>120 +</p>
            <h2>Subjects taught</h2>
          </li>
          <li>
            <p>200 +</p>
            <h2>Tutor nationalities</h2>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BottomHero;

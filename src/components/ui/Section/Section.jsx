import clsx from "clsx";
import css from "./Section.module.css";
import { useSelector } from "react-redux";

const Section = ({ className, children }) => {
  const theme = useSelector((state) => state.theme.theme); // Отримуємо активну тему

  return (
    <section className={clsx(css.section, css.fullWidth, css[theme], className)}>
      {children}
    </section>
  );
};

export default Section;
import { PropagateLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return <PropagateLoader color='var(--button-bg-color)' className={css.loader} />;
};

export default Loader;
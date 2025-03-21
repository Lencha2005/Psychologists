import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/theme/themeSlice";

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleThemeChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <div>
      <p>Theme: {theme}</p>
      <select value={theme} onChange={handleThemeChange}>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
}

export default useTheme;

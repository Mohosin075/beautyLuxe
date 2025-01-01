import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

function Test() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="p-4">
        <h1 className="text-3xl font-bold">Dark/Light Mode Toggle</h1>
        <button
          onClick={toggleTheme}
          className="mt-4 p-2 bg-primaryAccent text-textLight rounded-full"
        >
          Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}

export default Test;

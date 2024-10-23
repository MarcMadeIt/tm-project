import { useEffect, useState } from "react";
import "./TopBar.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

type Theme = "light" | "dark";

const TopBar = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="topbar">
      <div className="left"></div>
      <div className="center"></div>
      <div className="right">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <MdOutlineDarkMode />
          ) : (
            <MdOutlineLightMode className="lightIcon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
import { useEffect, useState } from "react";
import "./TopBar.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Profile from "../admin/Admin";

type Theme = "light" | "dark";

const TopBar = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="topbar">
      <div className="left">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <MdOutlineDarkMode size={35} />
          ) : (
            <MdOutlineLightMode size={35} className="lightIcon" />
          )}
        </button>
      </div>
      <div className="center">
        <div className="logo-img">
          <img src="src/assets/logo-FF.png" alt="logo" />
        </div>
        <span>FamilyFlow</span>
      </div>
      <div className="right">
        <Profile />
      </div>
    </div>
  );
};

export default TopBar;

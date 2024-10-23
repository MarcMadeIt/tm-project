import { useEffect, useState } from "react";
import "./TopBar.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

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
        <span>FamilyFlow</span>
      </div>
      <div className="right">
        <IoMdSettings size={35} />
      </div>
    </div>
  );
};

export default TopBar;

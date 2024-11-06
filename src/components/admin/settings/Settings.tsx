import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import "./Settings.scss";

type SettingsProps = {
  setViewChange: (view: string) => void;
};

const Settings = ({ setViewChange }: SettingsProps) => {
  const colors = [
    { name: "Purple", hex: "#A235D9", hover: "#8C31B9" },
    { name: "Orange", hex: "#f97316", hover: "#ea580c" },
    { name: "Green", hex: "#22c55e", hover: "#16a34a" },
    { name: "Blue", hex: "#0ea5e9", hover: "#0284c7" },
  ];

  const [actionColor, setActionColor] = useState(
    localStorage.getItem("actionColor") || ""
  );
  const [hoverColor, setHoverColor] = useState(
    localStorage.getItem("hoverColor") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  useEffect(() => {
    if (actionColor)
      document.documentElement.style.setProperty("--action", actionColor);
    if (hoverColor)
      document.documentElement.style.setProperty("--action-hover", hoverColor);
  }, [actionColor, hoverColor]);

  useEffect(() => {
    if (actionColor) localStorage.setItem("actionColor", actionColor);
    if (hoverColor) localStorage.setItem("hoverColor", hoverColor);
    document.documentElement.style.setProperty("--action", actionColor);
    document.documentElement.style.setProperty("--action-hover", hoverColor);
  }, [actionColor, hoverColor]);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value;
    setUserName(newUserName);
    localStorage.setItem("userName", newUserName); // Gem brugerens nye navn i localStorage
  };

  const handleColorChange = (colorHex: string, hoverHex: string) => {
    setActionColor(colorHex);
    setHoverColor(hoverHex);
  };

  return (
    <div className="settings-content">
      <div className="settings-title">
        <button className="btn-back" onClick={() => setViewChange("profile")}>
          <MdArrowBack size={28} />
        </button>
        <h4>Settings</h4>
      </div>
      <div className="settings-color">
        <h5>Customize Color</h5>
        <div className="settings-options">
          {colors.map((color) => (
            <button
              key={color.hex}
              className="btn-options"
              style={{
                backgroundColor: color.hex,
              }}
              onClick={() => handleColorChange(color.hex, color.hover)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      <div className="settings-username">
        <h5>Change Username</h5>
        <input
          className="inp settings-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
    </div>
  );
};

export default Settings;

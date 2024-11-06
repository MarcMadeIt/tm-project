import { MdArrowBack } from "react-icons/md";

type SettingsProps = {
  setViewChange: (view: string) => void;
};

const Settings = ({ setViewChange }: SettingsProps) => {
  return (
    <div className="settings-content">
      <button onClick={() => setViewChange("profile")}>
        <MdArrowBack size={28} />
      </button>
    </div>
  );
};

export default Settings;

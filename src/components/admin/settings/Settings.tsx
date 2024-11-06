import { MdArrowBack } from "react-icons/md";

const Settings = ({ setViewChange }) => {
  return (
    <div>
      <button onClick={() => setViewChange("profile")}>
        <MdArrowBack />
      </button>
    </div>
  );
};

export default Settings;

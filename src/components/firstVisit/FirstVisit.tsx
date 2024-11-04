import { useEffect, useState } from "react";
import "./FirstVisit.scss";

const FirstVisit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsModalVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseModal = () => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <>
      {isModalVisible && (
        <div className="fv-modal">
          <div className="fv-top">
            <div className="fv-logo">
              <img src="src/assets/logo-FF.png" alt="logo" />
            </div>
            <div className="fv-logoname">
              <span>FamilyFlow</span>
            </div>
          </div>
          <form className="fv-content">
            <h2>Welcome to FamilyFlow!</h2>
            <p>
              Create and share tasks with your family! Just enter your name, and
              you're ready to start.
            </p>
            <label htmlFor="userName"></label>
            <input
              id="userName"
              className="inp"
              type="text"
              placeholder="Type your name"
              value={userName}
              onChange={handleInputChange}
              maxLength={10}
              required
            />
            <button type="submit" className="btn" onClick={handleCloseModal}>
              Create User
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FirstVisit;

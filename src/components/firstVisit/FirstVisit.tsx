import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import "./FirstVisit.scss";

const FirstVisit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
    setError(false);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsModalVisible(true);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("hasVisited", "true"); // Gem besøget efter at brugeren har angivet et navn
      setIsModalVisible(false);
    } else {
      setError(true);
    }
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
              <span role="Title text" aria-label="Logo Name">
                FamilyFlow
              </span>
            </div>
          </div>
          <form className="fv-content" onSubmit={handleSubmit}>
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
            />
            {error && (
              <p className="error-text">Please enter your name to continue.</p>
            )}
            <button type="submit" className="btn">
              Create User
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FirstVisit;

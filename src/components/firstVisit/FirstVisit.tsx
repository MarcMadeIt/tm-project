import { useEffect, useState } from "react";
import "./FirstVisit.scss";

const FirstVisit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsModalVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseModal = () => {
    if (userName) {
      localStorage.setItem("userName", userName); // Save the user's name to localStorage
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value); // Update the user's name as they type
  };

  return (
    <>
      {isModalVisible && (
        <div className="firstvisit-modal">
          <div className="firstvisit-content">
            <h3>Welcome to FamilyFlow</h3>
            <p>
              Create and share tasks with your family! Just enter your name, and
              you’re ready to start.
            </p>

            <input
              className="inp"
              type="text"
              placeholder="Type your name"
              value={userName} // Bind the input value to the state
              onChange={handleInputChange} // Update state on input change
            />
            <button className="btn" onClick={handleCloseModal}>
              Create User
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstVisit;

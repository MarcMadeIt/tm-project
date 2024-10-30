import { useEffect, useState } from "react";
import "./FirstVisit.scss";

const FirstVisit = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsModalVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
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

            <input className="inp" type="text" placeholder="Type your name?" />
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

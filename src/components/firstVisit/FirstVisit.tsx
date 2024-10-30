import { useEffect, useState } from "react";

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
            <h2>Welcome</h2>
            <p></p>
            <input type="text" placeholder="Type your name?" />
            <button onClick={handleCloseModal}>Create User</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstVisit;

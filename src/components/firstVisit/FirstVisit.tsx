import { useEffect, useState } from "react";

const FirstVisit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Tjek om brugeren har besøgt siden før
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Hvis ikke, vis modalen og gem besøget i localStorage
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
        <div className="modal">
          <div className="modal-content">
            <h2>Velkommen!</h2>
            <p>Dette er din første gang her.</p>
            <button onClick={handleCloseModal}>Luk</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstVisit;

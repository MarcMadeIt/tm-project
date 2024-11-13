import { MdFilterList, MdHealthAndSafety, MdHome, MdOutlineFamilyRestroom } from "react-icons/md";
import { useState } from "react";
import { useTasks } from "../../context/TasksContext"; // Adjust the path to your context file
import "./Filter.scss";

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter = ({ setFilter }: FilterProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("Upcoming");

  const { setFilter: setFilterCriteria } = useTasks(); // Access setFilter from context

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    
    if (["Normal", "Necessary", "Urgent"].includes(filter)) {
      setFilterCriteria({ priority: filter }); // Update priority
    } else if (["Home", "Family", "Health"].includes(filter)) {
      setFilterCriteria({ category: filter }); // Update category
    } else {
      setFilterCriteria({ sortBy: filter }); // Update sorting
    }

    setFilterOpen(false);
  };

  return (
    <div className="filter">
      <button aria-label="Filter button" className="filter-open " onClick={toggleFilter}>
        <span>{activeFilter}</span>
        <MdFilterList size={25} />
      </button>
      {filterOpen && (
        <div className="filter-content">
          <div className="sortby">
            <h5>Sort by</h5>
            <div className="sortby-items">
              <button
                aria-label="Latest button"
                onClick={() => handleFilterClick("Latest")}
                className={`btn-filter ${activeFilter === "Latest" ? "active" : ""}`}
              >
                Latest
              </button>
              <button
                aria-label="Upcoming button"
                onClick={() => handleFilterClick("Upcoming")}
                className={`btn-filter ${activeFilter === "Upcoming" ? "active" : ""}`}
              >
                Upcoming
              </button>
            </div>
          </div>
          <div className="priority">
            <h5>Filter by Priority</h5>
            <div className="priority-items">
              <button
                aria-label="Priority Normal button"
                onClick={() => handleFilterClick("Normal")}
                className={`btn-filter ${activeFilter === "Normal" ? "active" : ""}`}
              >
                Normal
              </button>
              <button
                aria-label="Priority Necessary button"
                onClick={() => handleFilterClick("Necessary")}
                className={`btn-filter ${activeFilter === "Necessary" ? "active" : ""}`}
              >
                Necessary
              </button>
              <button
                aria-label="Priority Urgent button"
                onClick={() => handleFilterClick("Urgent")}
                className={`btn-filter ${activeFilter === "Urgent" ? "active" : ""}`}
              >
                Urgent
              </button>
            </div>
          </div>
          <div className="category">
            <h5>Filter by Category</h5>
            <div className="category-items">
              <button
                aria-label="Category Home button"
                onClick={() => handleFilterClick("Home")}
                className={`btn-filter ${activeFilter === "Home" ? "active" : ""}`}
              >
                <MdHome /> Home
              </button>
              <button
                aria-label="Category Family button"
                onClick={() => handleFilterClick("Family")}
                className={`btn-filter ${activeFilter === "Family" ? "active" : ""}`}
              >
                <MdOutlineFamilyRestroom /> Family
              </button>
              <button
                aria-label="Category Health button"
                onClick={() => handleFilterClick("Health")}
                className={`btn-filter ${activeFilter === "Health" ? "active" : ""}`}
              >
                <MdHealthAndSafety /> Health
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

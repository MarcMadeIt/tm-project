import {
  MdFilterList,
  MdHealthAndSafety,
  MdHome,
  MdOutlineFamilyRestroom,
} from "react-icons/md";
import "./Filter.scss";
import { useState } from "react";

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter = ({ setFilter }: FilterProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("Upcoming");

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (["Normal", "Necessary", "Urgent"].includes(filter)) {
      setFilter(`Priority: ${filter}`);
    } else if (["Home", "Family", "Health"].includes(filter)) {
      setFilter(`Category: ${filter}`);
    } else {
      setFilter(filter);
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
              <button aria-label="Latest button"
                onClick={() => handleFilterClick("Latest")}
                className={`btn-filter  ${
                  activeFilter === "Latest" ? "active" : ""
                }`}
              >
                Latest
              </button>
              <button aria-label="Upcoming button"
                onClick={() => handleFilterClick("Upcoming")}
                className={`btn-filter  ${
                  activeFilter === "Upcoming" ? "active" : ""
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>
          <div className="priority">
            <h5>Filter by Priority</h5>
            <div className="priority-items">
              <button aria-label="Priority Normal button"
                onClick={() => handleFilterClick("Normal")}
                className={`btn-filter  ${
                  activeFilter === "Normal" ? "active" : ""
                }`}
              >
                Normal
              </button>
              <button aria-label="Priority Necessary button"
                onClick={() => handleFilterClick("Necessary")}
                className={`btn-filter  ${
                  activeFilter === "Priority: Necessary" ? "active" : ""
                }`}
              >
                Necessary
              </button>
              <button aria-label="Priority urgent button"
                onClick={() => handleFilterClick("Urgent")}
                className={`btn-filter  ${
                  activeFilter === "Priority: Urgent" ? "active" : ""
                }`}
              >
                Urgent
              </button>
            </div>
          </div>
          <div className="category">
            <h5>Filter by Category</h5>
            <div className="category-items">
              <button aria-label="Category Home button"
                onClick={() => handleFilterClick("Home")}
                className={`btn-filter  ${
                  activeFilter === "Category: Home" ? "active" : ""
                }`}
              >
                <MdHome /> Home
              </button>
              <button aria-label="Category Family button"
                onClick={() => handleFilterClick("Family")}
                className={`btn-filter  ${
                  activeFilter === "Category: Family" ? "active" : ""
                }`}
              >
                <MdOutlineFamilyRestroom /> Family
              </button>
              <button aria-label="Category Health button"
                onClick={() => handleFilterClick("Health")}
                className={`btn-filter  ${
                  activeFilter === "Category: Health" ? "active" : ""
                }`}
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

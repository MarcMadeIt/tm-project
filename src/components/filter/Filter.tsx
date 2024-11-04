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
  const [activeFilter, setActiveFilter] = useState<string>("");

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterClick = (filter: string) => {
    setFilter(filter);
    setActiveFilter(filter); // Sæt det aktive filter
    setFilterOpen(false); // Luk filtermenuen efter valg
  };

  return (
    <div className="filter">
      <button className="filter-btn" onClick={toggleFilter}>
        <span>Filter</span>
        <MdFilterList size={20} />
      </button>
      {filterOpen && (
        <div className="filter-content">
          <div className="sortby">
            <button
              onClick={() => handleFilterClick("Latest")}
              className={activeFilter === "Latest" ? "active" : ""}
            >
              Latest
            </button>
            <button
              onClick={() => handleFilterClick("Upcoming")}
              className={activeFilter === "Upcoming" ? "active" : ""}
            >
              Upcoming
            </button>
          </div>
          <div className="priority">
            <button
              onClick={() => handleFilterClick("Priority: Normal")}
              className={activeFilter === "Priority: Normal" ? "active" : ""}
            >
              🟢 Normal
            </button>
            <button
              onClick={() => handleFilterClick("Priority: Necessary")}
              className={activeFilter === "Priority: Necessary" ? "active" : ""}
            >
              🟠 Necessary
            </button>
            <button
              onClick={() => handleFilterClick("Priority: Urgent")}
              className={activeFilter === "Priority: Urgent" ? "active" : ""}
            >
              🔴 Urgent
            </button>
          </div>
          <div className="category">
            <button
              onClick={() => handleFilterClick("Category: Home")}
              className={activeFilter === "Category: Home" ? "active" : ""}
            >
              <MdHome /> Home
            </button>
            <button
              onClick={() => handleFilterClick("Category: Family")}
              className={activeFilter === "Category: Family" ? "active" : ""}
            >
              <MdOutlineFamilyRestroom /> Family
            </button>
            <button
              onClick={() => handleFilterClick("Category: Health")}
              className={activeFilter === "Category: Health" ? "active" : ""}
            >
              <MdHealthAndSafety /> Health
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

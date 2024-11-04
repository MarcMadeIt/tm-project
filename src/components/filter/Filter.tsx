import { MdFilterList, MdHealthAndSafety, MdHome, MdOutlineFamilyRestroom } from 'react-icons/md';
import './Filter.scss';
import { useState } from 'react';
 
interface FilterProps {
    setFilter: (filter: string) => void;
}
 
const Filter = ({ setFilter }: FilterProps) => {
    const [filterOpen, setFilterOpen] = useState(false);
 
    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };
 
    const handleFilterClick = (filter: string) => {
        setFilter(filter);
        setFilterOpen(false); // Luk filtermenuen efter valg
    };
 
    return (
    <div className="filter">
        <button onClick={toggleFilter}>
            <span>Filter</span>
            <MdFilterList />
        </button>
            {filterOpen && (
        <div className="filter-content">
        <div className="sortby">
            <button onClick={() => handleFilterClick("Latest")}>Latest</button>
            <button onClick={() => handleFilterClick("Upcoming")}>Upcoming</button>
        </div>
        <div className="priority">
            <button onClick={() => handleFilterClick("Priority: Normal")}>🟢 Normal</button>
            <button onClick={() => handleFilterClick("Priority: Necessary")}>🟠 Necessary</button>
            <button onClick={() => handleFilterClick("Priority: Urgent")}>🔴 Urgent</button>
        </div>
        <div className="category">
            <button onClick={() => handleFilterClick("Category: Home")}><MdHome /> Home</button>
            <button onClick={() => handleFilterClick("Category: Family")}><MdOutlineFamilyRestroom /> Family</button>
            <button onClick={() => handleFilterClick("Category: Health")}><MdHealthAndSafety /> Health</button>
        </div>
        </div>
            )}
    </div>
    );
};
 
export default Filter;
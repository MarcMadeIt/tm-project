import { MdFilterList, MdHealthAndSafety, MdHome, MdOutlineFamilyRestroom } from 'react-icons/md';
import './Filter.scss';
import { useState } from 'react';

const Filter = () => {
    const [filterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    }

  return (
    <div className='filter'>
        <button onClick={toggleFilter}>
            <span>Filter</span>
            <MdFilterList />
        </button>
        {filterOpen && (
            <div className='filter-content'>
                <div className="sortby">
                    <button>Latest</button>
                    <button>Upcoming</button>
                </div>
                <div className="priority">
                    <button>🟢 Normal</button>
                    <button>🟠 Necessary</button>
                    <button>🔴 Urgent</button>
                </div>
                <div className="category">
                    <button><MdHome />Home</button>
                    <button><MdOutlineFamilyRestroom />Family</button>
                    <button><MdHealthAndSafety />Health</button>
                </div>
            </div>
        )

        }
    </div>
  )
}

export default Filter
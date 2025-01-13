import { Link } from 'react-router-dom';
import { HomeIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <HomeIcon className="w-6 h-6" />
          <span className="hidden md:inline">Home</span>
        </Link>
        
        <Link to="/add-entry" className="flex items-center space-x-2">
          <PlusIcon className="w-6 h-6" />
          <span className="hidden md:inline">Add Entry</span>
        </Link>
        
        <Link to="/about" className="flex items-center space-x-2">
          <InformationCircleIcon className="w-6 h-6" />
          <span className="hidden md:inline">About</span>
        </Link>
      </div>
      
      <button className="md:hidden text-white">
      </button>
    </div>
  );
};

export default Navbar;

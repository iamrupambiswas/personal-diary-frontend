import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEntries } from '../api/diaryApi'; // Assume this function fetches the diary entries
import { motion } from 'framer-motion';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const EntryDetail = () => {
  const { id } = useParams(); // Get the entry ID from URL parameters
  const { state } = useLocation(); // Access the passed state
  const [entry, setEntry] = useState(state || null); // Initialize with state if available
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entries = await getEntries(); // Fetch all entries
        const foundEntry = entries.find((entry) => String(entry.id) === String(id)); // Compare both as strings
        if (foundEntry) {
          setEntry(foundEntry);
        } else {
          setError('Entry not found');
        }
      } catch (err) {
        setError('Failed to load entry details. Please try again later.');
      }
    };
    fetchEntry();
  }, [id, state]); // Re-fetch if the ID changes

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      key={location.pathname} // This is key to enable re-animation on route change
      initial={{ opacity: 0 }} // Initial state: invisible
      animate={{ opacity: 1 }} // Final state: visible
      exit={{ opacity: 0 }} // When exiting: invisible
      transition={{ duration: 0.5 }} // Transition duration
    >
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-primary font-semibold hover:underline mb-4 flex items-center"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2" />  {/* Set width, height, and margin */}
        Back
      </button>

      {/* Entry Details */}
      <h2 className="text-2xl font-bold text-gray-800">{entry.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{new Date(entry.date).toLocaleDateString()}</p>
      <p className="text-gray-700">{entry.content}</p>
    </div>
    </motion.div>
  );
};

export default EntryDetail;

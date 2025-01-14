import { useState, useEffect } from 'react';
import { getEntries, deleteEntry } from '../api/diaryApi';
import DiaryCard from './DiaryCard';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const location = useLocation();


  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);

      // Clear the success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getEntries();
        console.log('Fetched entries: ', data);
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch entries: ', error);
      }
    };
    fetchEntries();
  }, []);

  const handleDeleteEntry = async (id) => {
    try {
        await deleteEntry(id);
        setEntries(entries.filter((entry) => entry.id !== id));
        setSuccessMessage('Entry deleted successfully!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
    } catch (error) {
        console.error('Failed to delete entry:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Diary Entries</h1>

        {/* Display success message in top-right corner */}
        {successMessage && (
          <motion.div
            className="fixed top-16 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {successMessage}
          </motion.div>
        )}

        {/* Conditional rendering for empty state */}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-600">
            <DocumentTextIcon className="w-24 h-24 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No diary entries found</h2>
            <p className="mb-4 text-center">
              Start by adding a new entry using the button below.
            </p>
            <Link
              to="/add-entry"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Add Your First Entry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <DiaryCard key={entry.id} entry={entry} onDelete={handleDeleteEntry} />
            ))}
          </div>
        )}

        {/* Floating Add Button - Only visible when there are entries */}
        {entries.length > 0 && (
          <Link
            to="/add-entry"
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all"
          >
            <PlusIcon className="w-8 h-8" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default DiaryEntries;

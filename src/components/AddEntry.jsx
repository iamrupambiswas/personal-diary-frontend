import { getEntries, addEntry } from '../api/diaryApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const AddEntry = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ 
        title: '', 
        date: new Date().toISOString().split('T')[0], // Automatically set the current date
        content: '' 
    });
    const [isLoading, setIsLoading] = useState(false); // For API call loading state
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();

    // Fetch entries on mount
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const data = await getEntries();
                console.log('Fetched entries: ', data);
                setEntries(data);
            } catch (err) {
                console.error('Failed to fetch entries: ', err);
                setError('Failed to load entries. Please try again later.');
            }
        };
        fetchEntries();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    // Add new entry
    const handleAddEntry = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true);
        setError(null);
        try {
            const addedEntry = await addEntry(newEntry);
            setEntries([addedEntry, ...entries]); // Add the new entry to the list
            setNewEntry({ 
                title: '', 
                date: new Date().toISOString().split('T')[0], // Reset to current date
                content: '' 
            }); // Clear the form
            navigate('/', { state: { successMessage: 'Entry added successfully!' } });
        } catch (err) {
            console.error('Failed to add entry:', err);
            setError('Failed to add entry. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-primary font-semibold hover:underline mb-4 flex items-center"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />  {/* Set width, height, and margin */}
                    Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Entry</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleAddEntry} className="space-y-4">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newEntry.title}
                            onChange={handleChange}
                            placeholder="Enter a title for your entry"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Content Field */}
                    <div>
                        <label htmlFor="content" className="block text-gray-600 font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={newEntry.content}
                            onChange={handleChange}
                            placeholder="Write your thoughts here..."
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntry;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEntry, getEntryById } from '../api/diaryApi';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const EditEntry = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntry = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedEntry = await getEntryById(id);
                console.log('Fetched Entry:', fetchedEntry); // Debug API response
                setEntry(fetchedEntry);
            } catch (err) {
                console.error('Failed to fetch entry:', err);
                setError('Failed to load entry. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntry();
    }, [id]);

    const handleChange = (e) => {
        setEntry((prevEntry) => {
            const updatedEntry = [...prevEntry]; // Create a copy of the array
            updatedEntry[0] = {
                ...updatedEntry[0], // Update the first object in the array
                [e.target.name]: e.target.value,
            };
            return updatedEntry;
        });
    };

    const handleEditEntry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const updatedEntry = {
        title: entry[0].title, // Ensure title is correctly set
        date: entry[0].date,   // Ensure date is correctly set
        content: entry[0].content // Ensure content is correctly set
    };

    try {
        await updateEntry(id, updatedEntry);
        navigate('/', { state: { successMessage: 'Entry updated successfully!' } });
    } catch (err) {
        console.error('Failed to update entry:', err);
        setError('Failed to update entry. Please try again later.');
    } finally {
        setIsLoading(false);
    }
};


    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) return <p>Loading entry...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // If entry is null, show a message
    if (!entry || !entry[0]) return <p>Entry not found!</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full" key={entry[0]?.id}>
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-primary font-semibold hover:underline mb-4 flex items-center"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />  {/* Set width, height, and margin */}
                    Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Entry</h2>
                <form onSubmit={handleEditEntry} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={entry[0]?.title || ''}  // Ensure empty string fallback
                            onChange={handleChange}  // Handle input change to update the state
                            placeholder="Enter a title for your entry"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-gray-600 font-medium mb-2">
                            Date
                        </label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={formatDate(entry[0]?.date) || ''}  // Ensure empty string fallback
                            readOnly
                            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-gray-600 font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={entry[0]?.content || ''}  // Ensure empty string fallback
                            onChange={handleChange}  // Handle input change to update the state
                            placeholder="Write your thoughts here..."
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required
                        ></textarea>
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEntry;

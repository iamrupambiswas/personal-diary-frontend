import { useState, useEffect } from 'react'
import { getEntries, addEntry, updateEntry, deleteEntry } from '../api/diaryApi'

const Diary = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ title: '', date: '', content: '' });

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const data = await getEntries();
                console.log("Fetched entries: ", data)
                setEntries(data);
            } catch (error) {
                console.error("Failed to fetch entries: ", error);
            }
        };
        fetchEntries();
    }, []);

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    // Add new entry
    const handleAddEntry = async () => {
        try {
            const addedEntry = await addEntry(newEntry);
            setEntries([addedEntry, ...entries]); // Add to state
            setNewEntry({ title: '', date: '', content: '' }); // Clear form
        } catch (error) {
            console.error('Failed to add entry:', error);
        }
    };

    // Delete an entry
    const handleDeleteEntry = async (id) => {
        try {
            await deleteEntry(id);
            setEntries(entries.filter((entry) => entry.id !== id)); // Remove from state
        } catch (error) {
            console.error('Failed to delete entry:', error);
        }
    };


    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleString('en-US', {
            weekday: 'long', // Day of the week (e.g., Monday)
            year: 'numeric', // Year (e.g., 2025)
            month: 'long', // Month (e.g., January)
            day: 'numeric', // Day of the month (e.g., 10)
            hour: 'numeric', // Hour in 12-hour format (e.g., 6)
            minute: 'numeric', // Minute (e.g., 30)
            second: 'numeric', // Second (e.g., 00)
            hour12: true, // 12-hour clock format
        });
    };



    return (
        <div>
            <h1>My Diary</h1>
            <div>
                <h2>Add New Entry</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newEntry.title}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    value={newEntry.date}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={newEntry.content}
                    onChange={handleChange}
                ></textarea>
                <button onClick={handleAddEntry}>Add Entry</button>
            </div>
            <div>
                <h2>Diary Entries</h2>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <h3>{entry.title}</h3>
                        <p>{formatDate(entry.date)}</p>
                        <p>{entry.content}</p>
                        <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Diary;
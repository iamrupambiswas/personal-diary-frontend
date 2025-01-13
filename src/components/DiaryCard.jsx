import { Link } from 'react-router-dom';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'; // Import Trash and Pencil Icons from Heroicons

const DiaryCard = ({ entry, onDelete }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    onDelete(entry.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 relative">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{entry.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{formatDate(entry.date)}</p>
      <p className="text-gray-700 truncate">{entry.content}</p>

      {/* Link to Entry Detail Page */}
      <Link
        className="mt-4 text-primary font-semibold hover:underline"
        to={{
          pathname: `/entry/${entry.id}`,
          state: {
            title: entry.title,
            date: entry.date,
            content: entry.content,
          },
        }}
      >
        Read More
      </Link>

      {/* Edit Icon */}
      <Link
        to={{
          pathname: `/edit-entry/${entry.id}`
        }}
        className="absolute top-2 right-10 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        aria-label="Edit entry"
      >
        <PencilSquareIcon className="w-5 h-5 text-blue-500" />
      </Link>

      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        aria-label="Delete entry"
      >
        <TrashIcon className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
};

export default DiaryCard;

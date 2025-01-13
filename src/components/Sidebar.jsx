const Sidebar = () => {
    return (
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-4 text-lg font-bold">My Diary</div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            <li>
              <a href="#" className="block px-4 py-2 rounded hover:bg-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="add-entry" className="block px-4 py-2 rounded hover:bg-secondary">
                Add Entry
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded hover:bg-secondary">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
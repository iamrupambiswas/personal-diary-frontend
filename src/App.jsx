import './App.css';
import DiaryEntries from "./components/DiaryEntries";
import AddEntry from './components/AddEntry';
import EntryDetail from './components/EntryDetail';
import EditEntry from './components/EditEntry';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Navbar */}
        {/* <Navbar /> */}
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path='/' element={<DiaryEntries />} />
            <Route path='/add-entry' element={<AddEntry />} />
            <Route path="/entry/:id" element={<EntryDetail />} />
            <Route path='/edit-entry/:id' element={<EditEntry />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

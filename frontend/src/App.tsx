import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientList } from './components/PatientList';
import { PatientDetail } from './components/PatientDetail';
import { NewNote } from './components/NewNote';
import { NoteDetail } from './components/NoteDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Medical Dashboard</h1>
                  <p className="mt-2 text-gray-600">Manage and view patient information</p>
                </div>
                <PatientList />
              </>
            } />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/patients/:id/new-note" element={<NewNote />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

import { Routes, Route } from 'react-router-dom';
import Pages from './components/Pages';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';

import './styles/App.css';
import './styles/Pages.css';

export const FORM_KEY = 'medicalData';

function App() {
  return (
    <div className="container">
      <div className="page-container" data-testid="page-container">
        <Routes>
          <Route path="/" element={<Pages />}>
            <Route index element={<PageOne />} />
            <Route path="/ailments" element={<PageTwo />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

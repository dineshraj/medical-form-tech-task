import { Routes, Route } from 'react-router-dom';
import Pages from './components/Pages';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';
import PageThree from './components/Pages/PageThree';

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
            <Route path="/symptoms" element={<PageTwo />} />
            <Route path="/details" element={<PageThree />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

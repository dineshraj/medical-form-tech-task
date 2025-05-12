


import './styles/App.css';
import Pages from './components/Pages';
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
  return (
    <div className="container">
      <ProgressBar sections={4} />
      <Pages />
    </div>
  );
}

export default App;
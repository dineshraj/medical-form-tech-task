import './styles/App.css';
import Form from './components/Page';
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
  return (
    <div className="container">
      <ProgressBar sections={4} />
      <Form />
    </div>
  );
}

export default App;

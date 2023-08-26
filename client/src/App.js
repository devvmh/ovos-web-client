import LogOutput from './LogOutput'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row-1">
        <LogOutput />
      </div>
      <div className="row-2">
        <div className="history">
          history
        </div>
        <div className="legend">
          legend
        </div>
        <div className="mic-level">
          mic level
        </div>
      </div>
      <div className="row-3">
        <div className="input">
          input
        </div>
      </div>
    </div>
  );
}

export default App;

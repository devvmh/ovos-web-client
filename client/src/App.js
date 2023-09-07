import {useState} from 'react';

import History from './History';
import Legend from './Legend';
import LogOutput from './LogOutput';
import MicLevel from './MicLevel';

import './Theming.css';
import './App.css';

export const ALL_LOG_FILES = [
  'audio', 'ovos', 'phal', 'skills', 'voice'
];

function App() {
  const [logFiles, setLogFiles] = useState(ALL_LOG_FILES);

  const toggleLogFile = logFile => event => {
    if (logFiles.includes(logFile)) {
      setLogFiles(orig => orig.filter(elt => elt !== logFile));
    } else {
      setLogFiles(orig => [...orig, logFile]);
    }
  }
  
  return (
    <div className="App">
      <div className="row-1">
        <LogOutput logFiles={logFiles} />
      </div>
      <div className="row-2">
        <History />
        <Legend logFiles={logFiles} toggleLogFile={toggleLogFile} />
        <MicLevel />
      </div>
      <div className="row-3">
        <div className="input">
          <h2>input</h2>
        </div>
      </div>
    </div>
  );
}

export default App;

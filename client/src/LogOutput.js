import React, {useCallback, useState} from 'react';
import { useStream } from 'react-fetch-streams';
import './LogOutput.css';

function LogOutput() {
  const [data, setData] = useState([]);
  const onNext = useCallback(logFile => async response => {
    const chunk = await response.text();
    const logLines = chunk.split("\n")
      .filter(text => !!text) // filter out blank strings
      .map(text => ({ logFile, text }))
      .reverse();
    setData(orig => [...logLines, ...orig]);
  }, [setData]);
  useStream('http://192.168.1.18:5000/streams/logs/audio', { onNext: onNext('audio') });
  useStream('http://192.168.1.18:5000/streams/logs/ovos', { onNext: onNext('ovos') });
  useStream('http://192.168.1.18:5000/streams/logs/phal', { onNext: onNext('phal') });
  useStream('http://192.168.1.18:5000/streams/logs/skills', { onNext: onNext('skills') });
  useStream('http://192.168.1.18:5000/streams/logs/voice', { onNext: onNext('voice') });

  return (
    <div className='log-output'>
      {data.map((line, index) => {
        return <div key={index} className={`log-line log-line-${line.logFile}`}>
          {`${line.logFile}: ${line.text}`}
        </div>
      })}
    </div>
  );
}

export default LogOutput;

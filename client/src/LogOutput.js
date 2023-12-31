import { useCallback, useState } from 'react';
import { useStream } from 'react-fetch-streams';

import './LogOutput.css';
import './LogLineColours.css';

function LogOutput(props) {
  const [data, setData] = useState([]);
  const onNext = useCallback(logFile => async response => {
    const chunk = await response.text();
    const logLines = chunk.split("\n")
      .filter(text => !!text) // filter out blank strings
      .toReversed()
      .map(text => ({ logFile, text }));
    setData(orig => [...logLines, ...orig]);
  }, [setData]);

  useStream('/streams/logs/audio', { onNext: onNext('audio') });
  useStream('/streams/logs/ovos', { onNext: onNext('ovos') });
  useStream('/streams/logs/phal', { onNext: onNext('phal') });
  useStream('/streams/logs/skills', { onNext: onNext('skills') });
  useStream('/streams/logs/voice', { onNext: onNext('voice') });

  return (
    <div className='log-output'>
      {data.filter(line => props.logFiles.includes(line.logFile)).map((line, index) => {
        return <div key={index} className={`log-line log-line-${line.logFile}`}>
          {line.text}
        </div>
      })}
      <h2 className="visually-hidden">Logs</h2>
    </div>
  );
}

export default LogOutput;

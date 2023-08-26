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
      .map(text => ({ logFile, text }));
    setData(orig => [...orig, ...logLines]);
  }, [props, setData]);

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
    </div>
  );
}

export default LogOutput;

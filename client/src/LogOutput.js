import React, {useCallback, useState} from 'react';
import { useStream } from 'react-fetch-streams';
import './LogOutput.css';

function LogOutput() {
  const [data, setData] = useState([]);
  const onNext = useCallback(async res => {
    const text = await res.text();
    console.log("got text: ", text);
    setData(orig => [...orig, text]);
  }, [setData]);
  useStream('/streams/logs', { onNext });
  return (
    <div className="log-output">
      {data.join("")}
    </div>
  );
}

export default LogOutput;

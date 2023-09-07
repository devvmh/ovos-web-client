import { useCallback, useState } from 'react';
import { useStream } from 'react-fetch-streams';

import './History.css';

function History() {
  const [data, setData] = useState([]);
  const onNext = useCallback(async response => {
    const lines = (await response.text())
      .split("\n")
      .toReversed();
    setData(orig => [...lines, ...orig]);
  }, [setData]);

  useStream('/streams/history', { onNext });
  return (
    <div className="history">
      {data.map((line, index) => {
        return <div key={index} className='history-line'>{line}</div>;
      })}
      <h2>History</h2>
    </div>
  );
}

export default History;

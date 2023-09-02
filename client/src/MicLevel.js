import { useCallback, useState } from 'react';
import { useStream } from 'react-fetch-streams';

import './MicLevel.css';

function MicLevel() {
  const [data, setData] = useState(0);
  const onNext = useCallback(async response => {
    const chunk = await response.text();
    setData(chunk);
  }, [setData]);

  useStream('/streams/miclevel', { onNext });
  const percentage = data / 2000 * 100;
  const offset = -100 + percentage;
  return (
    <div className="mic-level">
      <h2>Microphone level:</h2> {data}
      <div className="meter" style={{ backgroundPositionY: `${offset}%` }} />
    </div>
  );
}

export default MicLevel;

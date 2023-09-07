import { useState } from 'react';

import './Input.css';

function Input() {
  const [data, setData] = useState('');

  function submit() {
    console.log("starting submit...")
    fetch(`/submit/input?input=${data}`)
      .then(response => {
        if (!response.ok) {
          throw response;
        } else {
          setData('');
        }
      })
      .then(() => console.log("sent data to server:", data))
      .catch(console.error);
  }

  return (
    <div className='input'>
      <h2>Input</h2>
      <input type="text" className="text-input-field" onChange={e => setData(e.target.value)} value={data} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Input;

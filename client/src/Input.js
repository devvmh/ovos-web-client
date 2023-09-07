import { useState } from 'react';

import './Input.css';

function Input() {
  const [data, setData] = useState('');

  function submit(event) {
    event.preventDefault();
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
      <form onSubmit={submit}>
        <input type='text' className='text-input-field' onChange={e => setData(e.target.value)} value={data} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Input;

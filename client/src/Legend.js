import './Legend.css';
import './LogLineColours.css';

function Legend(props) {
  function getClassName(logFile) {
    const selected = props.logFiles.includes(logFile) ? 'selected' : '';
    return `legend-item log-line-${logFile} ${selected}`;
  }

  return (
    <ul className='legend'>
      <li onClick={props.toggleLogFile('audio')} className={getClassName('audio')}>audio</li>
      <li onClick={props.toggleLogFile('ovos')} className={getClassName('ovos')}>ovos</li>
      <li onClick={props.toggleLogFile('phal')} className={getClassName('phal')}>phal</li>
      <li onClick={props.toggleLogFile('skills')} className={getClassName('skills')}>skills</li>
      <li onClick={props.toggleLogFile('voice')} className={getClassName('voice')}>voice</li>
    </ul>
  );
}

export default Legend;

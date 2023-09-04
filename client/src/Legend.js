import './Legend.css';
import './LogLineColours.css';

function Legend(props) {
  function isSelected(logFile) {
    return props.logFiles.includes(logFile);
  }

  function getClassName(logFile) {
    const selected = isSelected(logFile) ? 'selected' : '';
    return `legend-item log-line-${logFile} ${selected}`;
  }

  function renderLine(logFile) {
    return (
      <li className={getClassName(logFile)} onClick={props.toggleLogFile(logFile)}>
        <input type="checkbox" name={logFile} checked={isSelected(logFile)} onChange={props.toggleLogFile(logFile)} />
        <label htmlFor={logFile}>{logFile}</label>
      </li>
    );
  }

  return (
    <div className='legend'>
      <h2>Legend</h2>
      <ul>
        {renderLine('audio')}
        {renderLine('ovos')}
        {renderLine('phal')}
        {renderLine('skills')}
        {renderLine('voice')}
      </ul>
    </div>
  );
}

export default Legend;

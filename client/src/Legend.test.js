import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Legend from './Legend';

test('renders a heading', () => {
  const { container } = render(<Legend logFiles={[]} toggleLogFile={() => {}} />);
  const heading = container.querySelector('h2');
  expect(heading).not.toBe(null);
  expect(heading.textContent).toEqual('Legend');
});

test('log file types can be marked as selected', () => {
  const { container } = render(<Legend logFiles={['audio']} toggleLogFile={() => {}} />);

  const listItem = container.querySelector('.log-line-audio');
  expect(Object.values(listItem.classList)).toContain('selected');

  const checkbox = listItem.querySelector('input[type=checkbox]');
  expect(checkbox.checked).toBe(true);
});

test('log file types can be marked as deselected', () => {
  const { container } = render(<Legend logFiles={[]} toggleLogFile={() => {}} />);

  const listItem = container.querySelector('.log-line-audio');
  expect(Object.values(listItem.classList)).not.toContain('selected');

  const checkbox = listItem.querySelector('input[type=checkbox]');
  expect(checkbox.checked).toBe(false);
});

test('clicking the checkbox changes the state', () => {
  const toggleLogFile = jest.fn();
  const { container } = render(<Legend logFiles={['audio']} toggleLogFile={toggleLogFile} />);
  container.querySelector('.log-line-audio input[type=checkbox]').click();
  expect(toggleLogFile).toHaveBeenCalledWith('audio');
});

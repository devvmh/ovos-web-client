import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LogOutput from './LogOutput';

test('renders a only-visible-to-screen-reader heading', () => {
  const { container } = render(<LogOutput logFiles={[]} />);
  const heading = container.querySelector('h2');
  expect(heading).not.toBe(null);
  expect(heading.textContent).toEqual('Logs');
  expect(Object.values(heading.classList)).toContain('visually-hidden');
});

test.skip('renders log lines if they are in the selected set of logFiles', () => {
  // TODO
});

test.skip('does not render log lines if they are not in the selected set of logFiles', () => {
  // TODO
});

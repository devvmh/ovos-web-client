import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Input from './Input';

test('renders a heading', () => {
  const { container } = render(<Input />);
  const heading = container.querySelector('h2');
  expect(heading).not.toBe(null);
  expect(heading.textContent).toEqual('Input');
});

test.skip('text input is saved', () => {
  // TODO
});

test.skip('submit button sends data to server', () => {
  // TODO
});

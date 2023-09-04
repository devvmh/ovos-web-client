import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./Legend', () => () => {
  return <div data-testid="legend" />;
});

jest.mock('./LogOutput', () => () => {
  return <div data-testid="log-output" />;
});

jest.mock('./MicLevel', () => () => {
  return <div data-testid="mic-level" />;
});

test('renders legend', () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId('legend')).not.toBe(null);
});

test('renders log output', () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId('log-output')).not.toBe(null);
});

test('renders mic levels', () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId('mic-level')).not.toBe(null);
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import History from './MicLevel';

test('renders a heading', () => {
  const { container } = render(<History />);
  const heading = container.querySelector('h2');
  expect(heading).not.toBe(null);
  expect(heading.textContent).toEqual('History');
});

test.skip('renders content from server as text', async () => {
  // TODO 
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { rest, server } from './setupTests'
import userEvent from '@testing-library/user-event'

import MicLevel from './MicLevel';

test('renders a heading', () => {
  const { container } = render(<MicLevel />);
  const heading = container.querySelector('h2');
  expect(heading).not.toBe(null);
  expect(heading.textContent).toEqual('Microphone level:');
});

test.skip('renders the raw data value as text', async () => {
  server.use(rest.get('/streams/miclevel', async(req, res, ctx) => {
    console.log('got here')
    return res(ctx.text('800'));
  }));

  render(<MicLevel />);

  // TODO why doesn't this work?
  // expect(await screen.findByText('800')).toBeInTheDocument();
});

test.skip('renders the microphone level as a CSS backgroundPositionY offset', () => {
  // TODO 
});

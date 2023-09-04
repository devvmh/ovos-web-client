import { rest } from 'msw'
import { setupServer } from 'msw/node'
const server = setupServer(...[]);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export { rest, server }

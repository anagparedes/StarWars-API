import { render, screen } from '@testing-library/react';
import App from './App';

describe('Star Wars App', () => {
  it('Should know a list of characters including Luke Skywalker', () => {
    render(<App/>);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });
})

import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe("Star Wars App", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("Should know a list of characters including Luke Skywalker", () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("Should show a list of characters from JSON File.", () => {
    render(<App />);
    data.results.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  it("Should show a list of characters from API.", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/");

    data.results.forEach(async (character) => {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    });
    
  });
});

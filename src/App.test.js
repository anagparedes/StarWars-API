import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe("Star Wars App", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

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

import React from 'react';
import { render, cleanup } from '@testing-library/react'
import Movie from '../Movie';

test('It will render the proper title for the movie', () => {
  // Arrange & Act
  const container = render(<Movie
    title={"Test Movie"}
    overview={"A great movie!"}
    releaseDate={"12-12-19"}
    imageUrl={"Beautiful image"}
    selectMovieCallback={() => { }}
    addMovieCallback={() => { }}
  />);

  // Assert
  expect(container.getByText(/Test Movie/)).toBeDefined();
});

test('The "selectMovieCallback" function is called when the `select` button is clicked on', () => {

  // Arrange
  const selectMovie = jest.fn();

  const container = render(<Movie
    title={"Test Movie"}
    overview={"A great movie!"}
    releaseDate={"12-12-19"}
    imageUrl={"Beautiful image"}
    selectMovieCallback={selectMovie}
    addMovieCallback={() => { }}
  />);

  // Act
  const selectButton = container.getByText(/Select/);
  selectButton.click();

  // Assert
  expect(selectMovie).toHaveBeenCalled();
});
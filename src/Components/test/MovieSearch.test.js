import React from 'react';
import { render, cleanup } from '@testing-library/react'
import MovieSearch from '../MovieSearch';

describe('MovieSearch', () => {
  test('that it matches the existing snapshot', () => {
    // Arrange-Act
    const { asFragment } = render(
      <MovieSearch
        makeSearchMovieCollection={() => { }}
      />
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
    cleanup();
  });
});
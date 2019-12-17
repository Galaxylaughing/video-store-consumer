import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';

class MovieList extends Component {
  constructor() {
    super();
  }

  makeMoviesCollection () {
    const moviesCollection = this.props.movies.map((movie, i) => {
      return <Movie 
        selectMovieCallback={this.selectMovie}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        key={i}
      />;
    }
    );
    return moviesCollection
  }

  render() {
    return (
      <div>
        <ul>
          {this.makeMoviesCollection()}
        </ul>
      </div>
    )
  }
}

export default MovieList;
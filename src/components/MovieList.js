import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';
import './MovieList.css';

class MovieList extends Component {
  constructor() {
    super();
  }

  makeMoviesCollection () {
    const moviesCollection = this.props.movies.map((movie, i) => {
      return <Movie 
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        selectMovieCallback={this.props.selectMovieCallback}
        key={i}
      />;
    }
    );
    return moviesCollection
  }

  render() {
    return (
      <div>
        <ul class="movie-list">
          {this.makeMoviesCollection()}
        </ul>
      </div>
    )
  }
}

export default MovieList;
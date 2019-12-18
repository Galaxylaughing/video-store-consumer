import React, { Component } from 'react';
import Movie from './Movie';

class MovieSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  onInputChange = (event) => {
    const updatedState = {};

    const title = event.target.title;
    const value = event.target.value;

    updatedState[title] = value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.title) {
      this.props.findMovieCallback({
        title: this.state.title,
      });

      this.setState({
        title: '',
      });
    }
  }

  makeSearchMovieCollection () {
    if (this.props.foundMovie.length > 1) {
      const moviesCollection = this.props.foundMovie.map((movie, i) => {
        return <Movie 
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
          imageUrl={movie.image_url}
          externalId={movie.external_id}
          selectMovieCallback={this.props.selectMovieCallback}
          addMovieCallback={this.props.addMovieCallback}
          key={i}
        />;
      }
      );
      return moviesCollection
    }else {
      return <Movie 
          id={this.props.foundMovie.id}
          title={this.props.foundMovie.title}
          overview={this.props.foundMovie.overview}
          releaseDate={this.props.foundMovie.release_date}
          imageUrl={this.props.foundMovie.image_url}
          externalId={this.props.foundMovie.external_id}
          selectMovieCallback={this.props.selectMovieCallback}selectMovieCallback={this.props.selectMovieCallback}
          key={this.props.foundMovie.id}
        />;
    }
  }

  render () {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <h3>Search for a movie</h3>
        <div>
          <label>Title: </label>
          <input
            title="title"
            onChange={this.onInputChange}
            value={this.state.name}
          />
          <button onClick={this.onSubmit}>Search</button>
        </div>
      </form>
      {this.props.foundMovie !== undefined ?
      <ul>
        {this.makeSearchMovieCollection() }
      </ul>: null
      }
      </div>

    );
  }
}

MovieSearch.propTypes = {

};

export default MovieSearch;
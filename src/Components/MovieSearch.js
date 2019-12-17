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
        <Movie 
        id={this.props.foundMovie.id}
        title={this.props.foundMovie.title}
        overview={this.props.foundMovie.overview}
        releaseDate={this.props.foundMovie.release_date}
        imageUrl={this.props.foundMovie.image_url}
        /> : null
      }
      </div>

    );
  }
}

MovieSearch.propTypes = {

};

export default MovieSearch;
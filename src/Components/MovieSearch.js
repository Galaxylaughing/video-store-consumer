import React, { Component } from 'react';

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

  render () {
    return (
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
    );
  }
}

MovieSearch.propTypes = {

};

export default MovieSearch;
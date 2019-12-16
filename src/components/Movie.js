import React, { Component } from 'react';

class Movie extends Component {

  render() {
    const { id, title, overview, releaseDate, imageUrl } = this.props;
    return (
      <ul>
      <p>{title} </p>
      <p>{overview}</p>
      <p>{releaseDate}</p>
      <img src={imageUrl} alt={`Movie`} />
      
      <button onClick={() => { selectMovieCallback(id) }}>Select</button >
      </ul>
    )
  }
}

Movie.propTypes = {

};

export default Movie;

import React, { Component } from 'react';

class Movie extends Component {

  render() {
    const { id, title, overview, releaseDate, imageUrl, selectMovieCallback } = this.props;
    return (
      <ul>
      <p>{title} </p>
      <p>{overview}</p>
      <p>{releaseDate}</p>
      {imageUrl !== undefined ?
      <img src={imageUrl} alt={`Movie`} />: null
      }
      {selectMovieCallback !== undefined ? 
      <button onClick={() => { selectMovieCallback(id) }}>Select</button >: null
      }
      </ul>
    )
  }
}

Movie.propTypes = {

};

export default Movie;

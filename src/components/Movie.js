import React, { Component } from 'react';

class Movie extends Component {

  render() {
    const { id, title, overview, releaseDate, imageUrl, selectMovieCallback, addMovieCallback } = this.props;
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
      {addMovieCallback !== undefined ? 
      <button onClick={() => { addMovieCallback({title: title, overview: overview, release_date: releaseDate, image_url: imageUrl}) }}>Add</button >: null
      }
      </ul>
      
    )
  }
}

Movie.propTypes = {

};

export default Movie;

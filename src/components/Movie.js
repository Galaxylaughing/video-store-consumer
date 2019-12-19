import React, { Component } from 'react';
import '../App.css';
import './Movie.css';

class Movie extends Component {

  render() {
    const { id, title, overview, releaseDate, imageUrl, selectMovieCallback, addMovieCallback } = this.props;
    return (
      <li className="movie">
        <p className="title">{title} </p>
        <p>{overview}</p>
        {releaseDate != undefined ?
        <p>Release date: {releaseDate}</p>: null }
        {imageUrl !== undefined ?
        <div>
        <img className="img"src={imageUrl} alt={`Movie`} /></div>: null
        }
        {selectMovieCallback !== undefined ? 
        <button className="button" onClick={() => { selectMovieCallback(id) }}>Select</button >: null
        }
        {addMovieCallback !== undefined ? 
        <button className="button" onClick={() => { addMovieCallback({title: title, overview: overview, release_date: releaseDate, image_url: imageUrl}) }}>Add</button >: null
        }
      </li>
      
    )
  }
}

Movie.propTypes = {

};

export default Movie;

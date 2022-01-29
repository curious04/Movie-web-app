import React from 'react';
import {data} from '../data';
import { addMovies, setShowFavourites } from '../actions';
 import Navbar from './Navbar';
 import MovieCard from './MovieCard';

 

class App extends React.Component {

  componentDidMount () {
    this.props.store.subscribe(() => this.forceUpdate());
    this.props.store.dispatch(addMovies(data));
    
  }

  isMovieFavourite = (movie) => {
    const{ movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){  
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val))
  };

  render () {
  const { movies,search } = this.props.store.getState(); // { movies: {}, search: {}}
  
  const {list, favourites=[], showFavourites=[]} = movies;
  console.log('STATE',this.props.store.getState());

  const displayMovies = showFavourites ? favourites : list;

  return (
    <div className="App">
        <Navbar dispatch={this.props.store.dispatch}  search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard movie={movie} 
              key={movie.imdbID} 
              dispatch={this.props.store.dispatch}
              isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
    </div>
  );
}
}

export default App;

import React from "react";
import { data as moviesList } from "./data";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { addMovies, setShowFavourite } from "./actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;
    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate();
    // });

    //make api call
    //after getting movies dispatch action
    // store.dispatch(addMovies(data));
    // console.log("STATE", this.props.store.getState());
    //all data in our store

    this.props.dispatch(addMovies(moviesList));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      // we found the movie in favourite array
      return true;
    }
    return false;
  };

  ChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  };

  render() {
    const { movies, search } = this.props;
    // state = {
    //   movies: { list: [], favourites: [], showFavourites: false },
    //   search: {},
    // };
    const { list, showFavourites = [], favourites = [] } = movies;

    const displayMovies = showFavourites ? favourites : list;

    // console.log("RENDER", this.props.store.getState());

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.ChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.ChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
                //getting movie from map function
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movie">No Favourite Movies To Display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  // called so cause we are mapping state to store
  return {
    movies: state.movies,
    search: state.movies,
  };

  //basically telling we want this much data (in return) as props in App component
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;

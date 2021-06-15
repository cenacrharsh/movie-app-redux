import React, { Component } from "react";
import { addMovieToList, handleMovieSearch } from "../actions";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { showSearchResults, result: movie } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleSearchChange} />
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <div className="left">
                  <img src={movie.Poster} alt="search-pic" />
                </div>

                <div className="right">
                  <div className="movie-info">
                    <span className="title">
                      {movie.Title} {movie.Year}
                    </span>
                    <div className="plot">{movie.Plot}</div>
                  </div>
                </div>

                <div className="footer">
                  <div className="rating" style={{ marginLeft: 90 }}>
                    {movie.imdbRating}
                  </div>
                  <button
                    className="favourite-btn"
                    style={{ backgroundColor: "#00e2e2" }}
                    onClick={() => this.handleAddToMovies(movie)}
                  >
                    Add To Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search} />
//         )}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);

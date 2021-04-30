import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Paging from './Paging';
import PokemonList from '../pokemon/PokemonList';
import PokemonSearch from '../pokemon/PokemonSearch';
import request from 'superagent';
import './App.css';

const POKEMON_API_URL = `https://pokedex-alchemy.herokuapp.com/api/pokedex`;

class App extends Component {

  state = {
    pokemon: [],
    nameSearch: '',
    // hp: '',
    sortDirection: '',
    page: 1
  }

  async componentDidMount() {
    this.fetchPokemon();
  }

  async fetchPokemon() {
    const { nameSearch, sortDirection } = this.state;
    // console.log to see post state
    // console.log(this.state);

    const response = await request
      .get(POKEMON_API_URL)
      .query({ pokemon: nameSearch })
      .query({ sort: 'pokemon' })
      .query({ direction: sortDirection });

    // const hpOptions = [...new Set(response.body.results.map(pokemon => pokemon.hp))];
    // console.log for initial state
    // console.log(response.body.results);
    this.setState({
      pokemon: response.body.results,
      // hp: hpOptions
    });
  }

  handleSearch = ({ nameSearch, sortDirection
    //  attackFilter, defenseFilter, 
  }) => {
    console.log(nameSearch, sortDirection);
    this.setState(
      {
        nameSearch: nameSearch,
        sortDirection: sortDirection
      },
      () => this.fetchPokemon());
  }

  handlePrevPage = () => {
    this.setState(state => {
      return { page: state.page - 1 };
    });
  }

  handleNextPage = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  }

  render() {

    const { pokemon, page } = this.state;
    // const { hpOptions,
    //   // attacksOptions,
    //   // defensesOptions
    // } = this.props;

    return (
      <div className="App">

        <Header />

        <section className="search-options">
          <PokemonSearch
            onSearch={this.handleSearch} />
          {/* hps={hpOptions}  */}
          {/*attacks={attacksOptions}
          defenses={defensesOptions} />*/}
          <Paging
            page={page}
            onPrev={this.handlePrevPage}
            onNext={this.handleNextPage}
          />
        </section>

        <main>

          <PokemonList pokemon={pokemon} />

        </main>

        <Footer />

      </div>
    );
  }

}

export default App;

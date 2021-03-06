import React, { Component } from 'react';
import './PokemonItem.css';

class PokemonItem extends Component {
  render() {

    const pokemon = this.props.pokemon;
    const className1 = pokemon.type_1;
    const className2 = pokemon.type_2;

    return (
      <a href={pokemon.pokedex}>
        <li className="PokemonItem">

          <h2>{pokemon.pokemon}</h2>

          <div className="types">
            <h3 className={className1}>{pokemon.type_1}</h3>
            <h3 className={className2}>{pokemon.type_2}</h3>
          </div>

          <img
            src={pokemon.url_image}
            alt={pokemon.pokemon}
          />
          <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
        </li >
      </a>
    );
  }
}

export default PokemonItem;
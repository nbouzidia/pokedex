import "./PokemonCard.css";
import type { Pokemon } from "../types/pokemon";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="card">
      <div className="pokemon-id">#{pokemon.pokedexId.toString().padStart(3, '0')}</div>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span key={type.id} className="type">
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

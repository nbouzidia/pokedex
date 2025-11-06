import { useEffect, useState } from "react";
import { fetchPokemonById } from "../services/api";
import type { Pokemon } from "../types/pokemon";
import "./PokemonDetail.css";

interface PokemonDetailProps {
  pokedexId: number;
  onClose: () => void;
}

export default function PokemonDetail({ pokedexId, onClose }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonById(pokedexId)
      .then((data) => setPokemon(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [pokedexId]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content loading">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content">
          <p>Pokémon introuvable</p>
          <button onClick={onClose} className="close-btn">Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">
          ← Retour
        </button>

        <div className="detail-header">
          <h1 className="detail-name">{pokemon.name}</h1>
          <span className="detail-id">#{pokemon.pokedexId.toString().padStart(3, '0')}</span>
        </div>

        <img src={pokemon.image} alt={pokemon.name} className="detail-image" />

        <div className="detail-types">
          {pokemon.types.map((type) => (
            <span key={type.id} className="detail-type">
              {type.name}
            </span>
          ))}
        </div>

        <div className="stats-section">
          <h2>Statistiques</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-name">HP</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.HP / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.HP}</span>
            </div>

            <div className="stat-item">
              <span className="stat-name">Attaque</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.attack}</span>
            </div>

            <div className="stat-item">
              <span className="stat-name">Défense</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.defense}</span>
            </div>

            <div className="stat-item">
              <span className="stat-name">Att. Spé</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.specialAttack / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.specialAttack}</span>
            </div>

            <div className="stat-item">
              <span className="stat-name">Déf. Spé</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.specialDefense / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.specialDefense}</span>
            </div>

            <div className="stat-item">
              <span className="stat-name">Vitesse</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${(pokemon.stats.speed / 255) * 100}%` }}></div>
              </div>
              <span className="stat-value">{pokemon.stats.speed}</span>
            </div>
          </div>
        </div>

        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <div className="evolutions-section">
            <h2>Évolutions</h2>
            <div className="evolutions-grid">
              {pokemon.evolutions.map((evo) => (
                <div key={evo.pokedexId} className="evolution-card">
                  <p className="evolution-name">{evo.name}</p>
                  <p className="evolution-id">#{evo.pokedexId}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

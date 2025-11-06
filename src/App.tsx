import { useRef, useEffect, useState } from "react";
import { usePokemons } from "./hooks/usePokemons";
import PokemonCard from "./components/PokemonCard";
import PokemonDetail from "./components/PokemonDetail";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState<number[]>([]);
  const [limit, setLimit] = useState(50);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  
  const { pokemons, loadPokemons, hasMore, loading } = usePokemons(limit, name, types);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        console.log("Chargement de plus de pokémons...");
        loadPokemons(false);
      }
    });
    
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="container">
      <h1>Pokédex</h1>
      
      <Filters 
        onFilterChange={(n, t) => { 
          console.log("Filtres changés:", n, t);
          setName(n); 
          setTypes(t); 
        }}
        onLimitChange={(l) => setLimit(l)}
      />

      <div className="grid">
        {pokemons.map((p) => (
          <div key={p.pokedexId} onClick={() => setSelectedPokemonId(p.pokedexId)}>
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>

      {pokemons.length === 0 && !loading && (
        <div className="loader">Aucun pokémon trouvé</div>
      )}

      <div ref={loaderRef} className="loader">
        {loading ? "Chargement..." : hasMore ? "↓ Scroll pour plus" : "Fin de la liste"}
      </div>

      {selectedPokemonId && (
        <PokemonDetail 
          pokedexId={selectedPokemonId} 
          onClose={() => setSelectedPokemonId(null)} 
        />
      )}
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/api";
import type { Pokemon } from "../types/pokemon";

export function usePokemons(limit = 50, name?: string, types?: number[]) {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadPokemons(reset = false) {
    if (loading) return;
    
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const data = await fetchPokemons({
        limit,
        page: currentPage,
        name,
        types,
      });
      const newPokemons = Array.isArray(data) ? data : [];
      if (reset) {
        setPokemons(newPokemons);
        setPage(2);
      } else {
        setPokemons(prev => [...prev, ...newPokemons]);
        setPage(p => p + 1);
      }

      setHasMore(newPokemons.length === limit);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPokemons([]);
    setPage(1);
    loadPokemons(true);
  }, [limit, name, JSON.stringify(types)]);

  return { pokemons, loadPokemons, hasMore, loading };
}

const BASE_URL = "https://nestjs-pokedex-api.vercel.app";

export async function fetchPokemons(params?: {
  page?: number;
  limit?: number;
  name?: string;
  types?: number[];
}) {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.name) queryParams.append("name", params.name);
  if (params?.types && params.types.length > 0) {
    params.types.forEach((type) => queryParams.append("types[]", type.toString()));
  }

  const res = await fetch(`${BASE_URL}/pokemons?${queryParams.toString()}`);
  if (!res.ok) throw new Error("Erreur API: " + res.status);
  return res.json();
}

export async function fetchPokemonById(pokedexId: number) {
  const res = await fetch(`${BASE_URL}/pokemons/${pokedexId}`);
  if (!res.ok) throw new Error("Erreur API: " + res.status);
  return res.json();
}

export async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/types`);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}
export interface Type {
  id: number;
  name: string;
  image: string;
}

export interface Evolution {
  name: string;
  pokedexId: number;
}

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: {
    HP: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
    special_attack: number;
    special_defense: number;
  };
  generation: number;
  evolutions: Evolution[];
  types: Type[];
}

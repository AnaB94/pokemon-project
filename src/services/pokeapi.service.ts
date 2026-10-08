//Este archivo es el servicio encargado de realizar la comunicación 
// con la PokéAPI. Su función
// es consultar los datos de un Pokémon y devolverlos estructurados.
import axios from 'axios';
import type{ Pokemon } from '../interfaces/pokemon.interface.js';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeApiService {
  async getPokemon(pokemonNameOrId: string | number): Promise<Pokemon> {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${pokemonNameOrId}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo encontrar al Pokémon: ${pokemonNameOrId}`);
    }
  }
}
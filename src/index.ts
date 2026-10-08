import { PokeApiService } from './services/pokeapi.service.js';

const pokeService = new PokeApiService();

async function run() {
  try {
    const pokemonName = 'pikachu';
    console.log(`Buscando a ${pokemonName}...\n`);

    const pokemon = await pokeService.getPokemon(pokemonName);

    console.log('=== DATOS DEL POKÉMON ===');
    console.log(`ID: ${pokemon.id}`);
    console.log(`Nombre: ${pokemon.name.toUpperCase()}`);
    console.log(`Altura: ${pokemon.height / 10} m`);
    console.log(`Peso: ${pokemon.weight / 10} kg`);
    console.log(`Tipos: ${pokemon.types.map(t => t.type.name).join(', ')}`);
    console.log(`Sprite: ${pokemon.sprites.front_default}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
  }
}

run();
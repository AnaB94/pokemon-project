import { PokeApiService } from './services/pokeapi.service.js';
import { loadOracle } from './oracle.js';
import type { Pokemon } from './interfaces/pokemon.interface.js';

const service = new PokeApiService();

// EXTRACT: trae los Pokémon del 1 al 151
async function extract(): Promise<Pokemon[]> {
  const result: Pokemon[] = [];
  for (let id = 1; id <= 151; id++) {
    result.push(await service.getPokemon(id));
  }
  return result;
}

// TRANSFORM: aplana cada Pokémon en una fila
function transform(data: Pokemon[]) {
  return data.map(p => ({
    id: p.id,
    name: p.name,
    height: p.height,
    weight: p.weight,
    type1: p.types[0]?.type.name ?? '',
    type2: p.types[1]?.type.name ?? '',
    sprite: p.sprites.front_default,
  }));
}

// LOAD: carga a Oracle
export async function runEtl() {
  const raw = await extract();
  const rows = transform(raw);
  await loadOracle(rows);
  console.log(`Listo: ${rows.length} filas cargadas en Oracle`);
}
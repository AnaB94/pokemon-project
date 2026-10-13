import { writeFileSync } from 'fs';
import { PokeApiService } from './services/pokeapi.service.js';
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

// LOAD: guarda el CSV
function load(rows: ReturnType<typeof transform>, file: string) {
  const header = Object.keys(rows[0]!).join(',');
  const lines = rows.map(r => Object.values(r).map(v => `"${v}"`).join(','));
  writeFileSync(file, [header, ...lines].join('\n'), 'utf-8');
}

export async function runEtl() {
  const raw = await extract();
  const rows = transform(raw);
  load(rows, 'pokemon.csv');
  console.log(`Listo: ${rows.length} filas en pokemon.csv`);
}
//Esta interfaz de TypeScript define un moldes o plantilla de datos 
// (contrato) para asegurarnos de que la respuesta de la PokéAPI 
// coincida exactamente con la estructura que tu código espera recibir.
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}
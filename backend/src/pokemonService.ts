import { readFile } from 'fs';
import { Pokemon } from './models/pokemon';

interface PokemonData {
    pokemon: Pokemon[];
}

const getAllPokemons = (): Promise<PokemonData> => {
    return new Promise((resolve, reject) => {
        readFile('pokemons.json', 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    });
}

const getLevelOnePokemons = async () => {
    const allPokemons = await getAllPokemons()
    return allPokemons.pokemon.filter(pokemon => !pokemon.prev_evolution)
}

export const pokemonService = {
    getLevelOnePokemons
}
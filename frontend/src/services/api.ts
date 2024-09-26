import { Pokemon } from "../models/pokemon";

const getLevelOnePokemons = async (): Promise<Pokemon[] | undefined> => {
    try {
        const response = await fetch('http://localhost:5678/getLevelOnePokemons');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Pokemon[] = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

interface BattleResponse {
    outcome: string;
}

const battlePokemons = async (firstPokemon: Pokemon, secondPokemon: Pokemon): Promise<string | undefined> => {
    try {
        const response = await fetch('http://localhost:5678/battle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstPokemon: firstPokemon,
                secondPokemon: secondPokemon
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: BattleResponse = await response.json();
        return data.outcome;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export const api = {
    getLevelOnePokemons,
    battlePokemons
}
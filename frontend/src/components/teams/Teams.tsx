import { useEffect, useState } from "react";
import { Pokemon as PokemonType } from "../../models/pokemon";
import { api } from "../../services/api";
import "./teams.css";
import Team from "../team/Team";

interface TeamsProps {
    setTeams: (teams: PokemonType[]) => void;
}

const Teams = ({ setTeams }: TeamsProps) => {
    const [firePokemons, setFirePokemons] = useState<PokemonType[]>([]);
    const [waterPokemons, setWaterPokemons] = useState<PokemonType[]>([]);
    const [electricPokemons, setElectricPokemons] = useState<PokemonType[]>([]);
    const [icePokemons, setIcePokemons] = useState<PokemonType[]>([]);
    const [groundPokemons, setGroundPokemons] = useState<PokemonType[]>([]);
    const [rockPokemons, setRockPokemons] = useState<PokemonType[]>([]);
    const [grassPokemons, setGrassPokemons] = useState<PokemonType[]>([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            const data = await api.getLevelOnePokemons();
            if (!data) {
                return;
            }

            const fire = data.filter((pokemon) => pokemon.type.includes("Fire"));
            const water = data.filter((pokemon) => pokemon.type.includes("Water"));
            const electricity = data.filter((pokemon) =>
                pokemon.type.includes("Electricity")
            );
            const ice = data.filter((pokemon) => pokemon.type.includes("Ice"));
            const ground = data.filter((pokemon) => pokemon.type.includes("Ground"));
            const rock = data.filter((pokemon) => pokemon.type.includes("Rock"));
            const grass = data.filter((pokemon) => pokemon.type.includes("Grass"));

            setFirePokemons(fire);
            setWaterPokemons(water);
            setElectricPokemons(electricity);
            setIcePokemons(ice);
            setGroundPokemons(ground);
            setRockPokemons(rock);
            setGrassPokemons(grass);
        };

        fetchPokemons();
    }, []);

    const handleSetTeam = (title: string) => {
        switch (title) {
            case "Fire!":
                setTeams(firePokemons);
                break;
            case "Water!":
                setTeams(waterPokemons);
                break;
            case "Electricity!":
                setTeams(electricPokemons);
                break;
            case "Ice!":
                setTeams(icePokemons);
                break;
            case "Ground!":
                setTeams(groundPokemons);
                break;
            case "Rock!":
                setTeams(rockPokemons);
                break;
            case "Grass":
            default:
                setTeams(grassPokemons);
        }
    };

    return (
        <section>
            {firePokemons &&
                waterPokemons &&
                electricPokemons &&
                icePokemons &&
                groundPokemons &&
                rockPokemons ? (
                <div className="teamsSection">
                    <h1>Select your teams!</h1>
                    <div className="teams">
                        <Team
                            setTeam={handleSetTeam}
                            title="Fire!"
                            data={firePokemons[0]}
                        />
                        <Team
                            setTeam={handleSetTeam}
                            title="Water!"
                            data={waterPokemons[0]}
                        />
                        <Team
                            setTeam={handleSetTeam}
                            title="Electricity!"
                            data={electricPokemons[0]}
                        />
                        <Team setTeam={handleSetTeam} title="Ice!" data={icePokemons[0]} />
                        <Team
                            setTeam={handleSetTeam}
                            title="Ground!"
                            data={groundPokemons[0]}
                        />
                        <Team
                            setTeam={handleSetTeam}
                            title="Rock!"
                            data={rockPokemons[0]}
                        />
                        <Team
                            setTeam={handleSetTeam}
                            title="Grass!"
                            data={grassPokemons[0]}
                        />
                    </div>
                </div>
            ) : (
                <h1>Waiting for pokemons</h1>
            )}
        </section>
    );
};

export default Teams;

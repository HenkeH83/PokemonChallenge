import { useEffect, useState } from 'react';
import { Pokemon } from '../../models/pokemon';
import { api } from '../../services/api';
import './combat.css';

interface CombatProps {
    teamOne: Pokemon[],
    teamTwo: Pokemon[]
}

const Combat = ({ teamOne, teamTwo }: CombatProps) => {
    const [battleOutcome, setBattleOutcome] = useState<string[]>([])

    const executeBattle = () => {
        const leastAmountOfPlayers = Math.min(teamOne.length, teamTwo.length);

        for (let round = 0; round < leastAmountOfPlayers; round++) {
            setInterval(async () => {
                const result = await api.battlePokemons(teamOne[round], teamTwo[round]);
                if (result) {
                    setBattleOutcome(prevOutcome => [result, ...prevOutcome]);
                }
            }, 1000)
        }
    }

    return (
        <>
            {battleOutcome.length ? (
                <div className='textWrapper'>
                    <ul>
                        {battleOutcome.map((result, index) =>
                            <li key={index}>
                                <p>{result}</p>
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                <div className='btnWrapper'>
                    <button className="fightBtn" onClick={executeBattle}>
                        Fight!
                    </button>
                </div>
            )}
        </>
    )
}

export default Combat;
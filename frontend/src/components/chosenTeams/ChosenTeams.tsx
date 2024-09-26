import { Pokemon } from "../../models/pokemon"
import './chosenTeams.css';

interface ChosenTeamsProps {
    teamOne: Pokemon[];
    teamTwo: Pokemon[];
}

const ChosenTeams = ({ teamOne, teamTwo }: ChosenTeamsProps) => {

    return (
        <>
            <div className="selectedTeams">
                {teamOne.length > 0 &&
                    <div>
                        <img className="selectedTeamImg" src={teamOne[0].img} alt={teamOne[0].name} />
                    </div>
                }
                <h2>Vs.</h2>
                {teamTwo.length > 0 &&
                    <div>
                        <img className="selectedTeamImg" src={teamTwo[0].img} alt={teamTwo[0].name} />
                    </div>
                }
            </div>
        </>
    );
};

export default ChosenTeams;
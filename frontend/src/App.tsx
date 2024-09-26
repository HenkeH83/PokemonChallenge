import { useState } from 'react';
import './App.css';
import Teams from './components/teams/Teams';
import { Pokemon } from './models/pokemon';
import Combat from './components/combat/Combat';
import ChosenTeams from './components/chosenTeams/ChosenTeams';

const App = () => {
  const [teamOne, setTeamOne] = useState<Pokemon[]>([]);
  const [teamTwo, setTeamTwo] = useState<Pokemon[]>([]);

  const setTeams = (team: Pokemon[]) => {
    if (teamOne.length <= 0) {
      setTeamOne(team);
    } else {
      setTeamTwo(team);
    }
  }

  return (
    <div className="App">
      <Teams setTeams={setTeams} />
      <ChosenTeams teamOne={teamOne} teamTwo={teamTwo} />
      <Combat teamOne={teamOne} teamTwo={teamTwo} />
    </div>
  );
}

export default App;

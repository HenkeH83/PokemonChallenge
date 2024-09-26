import { Pokemon as PokemonType } from "../../models/pokemon";
import "./pokemon.css";

interface PokemonProps {
  data: PokemonType;
}
const Pokemon = ({ data }: PokemonProps) => {
  const { name, type, weaknesses, img } = data;

  return (
    <article>
      <div className="cardSection">
        <h2>{name}</h2>
        <img src={img} alt={name} />
      </div>
      <div className="cardSection">
        <div className="leftSide">
          <h3>Type:</h3>
          <ul>
            {type.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
        <div className="rightSide">
          <h3>Weaknesses:</h3>
          <ul>
            {weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Pokemon;

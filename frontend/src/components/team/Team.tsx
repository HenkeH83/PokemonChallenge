import { Pokemon } from "../../models/pokemon";

interface TeamProps {
    data: Pokemon;
    title: string;
    setTeam: (title: string) => void;
}

const Team = ({ data, title, setTeam }: TeamProps) => {

    return (
        <div onClick={() => setTeam(title)}>
            {data &&
                <div className="team">
                    <h2>{title}</h2>
                    <img src={data.img} alt={data.name} />
                </div>
            }
        </div>
    );
};

export default Team;
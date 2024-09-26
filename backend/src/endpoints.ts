import express from 'express';
import cors from 'cors';
import { battle } from './battle';
import { pokemonService } from './pokemonService';

const app = express();
const PORT = process.env.PORT || 5678;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

app.get('/getLevelOnePokemons', (req, res) => {
    pokemonService.getLevelOnePokemons()
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ error: 'Failed to fetch data' });
        });
})

app.post('/battle', (req, res) => {
    const { firstPokemon, secondPokemon } = req.body;
    const outcome = battle.fight(firstPokemon, secondPokemon);
    res.json({ outcome });
});
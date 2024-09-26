import { Pokemon } from "./models/pokemon";

type Score = {
    playerOne: number;
    playerTwo: number;
}

type Outcome = {
    winner: Pokemon;
    loser: Pokemon;
    winnerScore: number;
    loserScore: number;
}

const extractNumber = (value: string): number => {
    const matches = value.match(/[\d\.]+/);
    if (matches) {
        return parseFloat(matches[0]);
    }
    return 0;
}

const getNumberOfHitWeaknessesComparedToOpponent = (weaknesses: string[], types: string[]): string[] => {
    const weaknessSet = new Set(weaknesses);
    const overlappingElements = types.filter(item => weaknessSet.has(item));
    return overlappingElements;
}

const compareWeaknesses = (playerOne: Pokemon, playerTwo: Pokemon, score: Score): Score => {
    const playerOneAmountOfHitWeaknesses = getNumberOfHitWeaknessesComparedToOpponent(playerOne.weaknesses, playerTwo.type);
    const playerTwoAmountOfHitWeaknesses = getNumberOfHitWeaknessesComparedToOpponent(playerTwo.weaknesses, playerOne.type);

    if (playerOneAmountOfHitWeaknesses.length < playerTwoAmountOfHitWeaknesses.length) {
        score.playerOne++;
    } else if (playerOneAmountOfHitWeaknesses.length > playerTwoAmountOfHitWeaknesses.length) {
        score.playerTwo++;
    } else {
        score.playerOne++;
        score.playerTwo++;
    }
    return score;
}

const compareSize = (playerOne: Pokemon, playerTwo: Pokemon, score: Score): Score => {
    const playerOneHeight = extractNumber(playerOne.height)
    const playerOneWeight = extractNumber(playerOne.weight)
    const playerTwoHeight = extractNumber(playerTwo.height)
    const playerTwoWeight = extractNumber(playerTwo.weight)

    if (playerOneHeight > playerTwoHeight) {
        score.playerOne++
    } else if (playerOneHeight < playerTwoHeight) {
        score.playerTwo++
    } else {
        score.playerOne++;
        score.playerTwo++;
    }

    if (playerOneWeight > playerTwoWeight) {
        score.playerOne++
    } else if (playerOneWeight < playerTwoWeight) {
        score.playerTwo++
    } else {
        score.playerOne++;
        score.playerTwo++;
    }

    return score;
}

const addMultipliers = (playerOne: Pokemon, playerTwo: Pokemon, score: Score): Score => {
    const playerOneNewScore = !playerOne.multipliers ? score.playerOne : playerOne.multipliers.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
    }, score.playerOne);
    const playerTwoNewScore = !playerTwo.multipliers ? score.playerTwo : playerTwo.multipliers.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
    }, score.playerTwo);
    return {
        playerOne: playerOneNewScore,
        playerTwo: playerTwoNewScore
    }
}

const calculateScore = (playerOne: Pokemon, playerTwo: Pokemon, score: Score): Outcome => {
    const winner = score.playerOne > score.playerTwo ? playerOne : playerTwo;
    const loser = score.playerOne < score.playerTwo ? playerOne : playerTwo;
    const winnerScore = winner.id === playerOne.id ? score.playerOne : score.playerTwo;
    const loserScore = loser.id === playerOne.id ? score.playerOne : score.playerTwo;

    return {
        winner: winner,
        loser: loser,
        winnerScore: winnerScore,
        loserScore: loserScore
    }
}

const fight = (playerOne: Pokemon, playerTwo: Pokemon): string => {
    let score: Score = { playerOne: 0, playerTwo: 0 }
    score = compareWeaknesses(playerOne, playerTwo, score);
    score = compareSize(playerOne, playerTwo, score);
    score = addMultipliers(playerOne, playerTwo, score)
    const outcome = calculateScore(playerOne, playerTwo, score);
    return `${outcome.winner.name} beat ${outcome.loser.name} with a total score of: ${outcome.winnerScore} over ${outcome.loserScore}`
}

export const battle = {
    fight
}
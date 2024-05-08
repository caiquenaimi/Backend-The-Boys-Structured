const pool = require("../config/dbConfig")
const UpdateWinsCounter = require("../models/updateWinsCounter.js")

async function CalcWinner(hero1, hero2) {
    const hero1Power = hero1.power * hero1.health;
    const hero2Power = hero2.power * hero2.health;

    let winner, loser;

    if (hero1Power > hero2Power) {
        winner = hero1;
        loser = hero2;
    } else {
        winner = hero2;
        loser = hero1;
    }

    try {
        await UpdateWinsCounter(winner.id);
        winner.level++;
        await pool.query("UPDATE heroes SET level = $1 WHERE id = $2", [
            winner.level,
            winner.id,
        ]);
        await pool.query("UPDATE heroes SET level = $1 WHERE id = $2", [
            loser.level,
            loser.id,
        ]);
        return winner;
    } catch (error) {
        console.error("Erro ao atualizar vencedor", error);
        throw error;
    }
}

module.exports = CalcWinner;
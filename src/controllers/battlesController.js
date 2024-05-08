const pool = require("../config/dbConfig")
const CalcWinner = require("../models/calcWinner.js")
async function createBattle(req, res) {
    try {
        const { hero1Id, hero2Id } = req.body;

        const hero1 = await pool.query("SELECT * FROM heroes WHERE id = $1", [
            hero1Id,
        ]);
        const hero2 = await pool.query("SELECT * FROM heroes WHERE id = $1", [
            hero2Id,
        ]);

        if (hero1.rowCount == 0 || hero2.rowCount == 0) {
            res.status(500).send({
                status: "error",
                message: "Herói não encontrado",
            });
            return;
        }

        const winner = await CalcWinner(hero1.rows[0], hero2.rows[0]);

        await pool.query(
            "INSERT INTO battles (hero1_id, hero2_id, winner_id, loser_id) VALUES ($1, $2, $3, $4)",
            [hero1Id, hero2Id, winner.id, hero1Id == winner.id ? hero2Id : hero1Id]
        );

        res.json({
            status: "success",
            message: "Batalha realizada com sucesso",
            "winner 🏆": winner,
        });
    } catch (error) {
        console.error("Erro ao realizar batalha", error);
        res.status(500).send({
            status: "error",
            message: "Erro ao realizar batalha",
        });
    }
};

async function getAllBattles(req, res) {
    try {
        const result = await pool.query(`
            SELECT battles.id, 
                   battles.winner_id, 
                   battles.loser_id, 
                   winner.name AS winner_name, 
                   winner.skill AS winner_skill,
                   winner.power AS winner_power,
                   winner.level AS winner_level,
                   winner.health AS winner_health,
                   winner.winscounter AS winner_winscounter,
                   loser.name AS loser_name, 
                   loser.skill AS loser_skill,
                   loser.power AS loser_power,
                   loser.level AS loser_level,
                   loser.health AS loser_health,
                   loser.winscounter AS loser_winscounter
            FROM battles
            INNER JOIN heroes AS winner ON battles.winner_id = winner.id
            INNER JOIN heroes AS loser ON battles.loser_id = loser.id
        `);
        res.json({
            status: "success",
            message: "Lista de batalhas",
            quantity: result.rowCount,
            battles: result.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar batalhas", error);
        res.status(500).send({
            status: "error",
            message: "Erro ao buscar batalhas",
        });
    }
}

async function getBattlesByHero(req, res) {
    try {
        const { name } = req.params;
        const result = await pool.query(`
            SELECT battles.id, 
                   battles.winner_id, 
                   battles.loser_id, 
                   winner.name AS winner_name, 
                   winner.skill AS winner_skill,
                   winner.power AS winner_power,
                   winner.level AS winner_level,
                   winner.health AS winner_health,
                   winner.winscounter AS winner_winscounter,
                   loser.name AS loser_name, 
                   loser.skill AS loser_skill,
                   loser.power AS loser_power,
                   loser.level AS loser_level,
                   loser.health AS loser_health,
                   loser.winscounter AS loser_winscounter
            FROM battles
            INNER JOIN heroes AS winner ON battles.winner_id = winner.id
            INNER JOIN heroes AS loser ON battles.loser_id = loser.id
            WHERE LOWER(winner.name) LIKE $1 OR LOWER(loser.name) LIKE $1
        `, [`%${name.toLowerCase()}%`]);

        if (result.rowCount === 0) {
            res.json({
                status: "error",
                message: `Heroi com nome ${name} não encontrado`,
            });
        }

        res.json({
            status: "success",
            message: "Herois encontrados",
            heroes: result.rows,
        });
    } catch (error) {
        console.error("Erro ao buscar heroi", error);
        res.status(500).send({
            status: "error",
            message: "Erro ao buscar heroi",
        });
    }
}



module.exports = { createBattle, getAllBattles, getBattlesByHero };
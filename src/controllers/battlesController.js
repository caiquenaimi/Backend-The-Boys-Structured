async function updateWinsCounter(heroId) {
    try {
        const result = await pool.query(
            "UPDATE heroes SET winscounter = COALESCE(winscounter, 0) + 1 WHERE id = $1 RETURNING winscounter",
            [heroId]
        );
        return result.rows[0].winscounter;
    } catch (error) {
        console.error("Erro ao atualizar winscounter", error);
        throw error;
    }
}

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
        await updateWinsCounter(winner.id);
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
};

module.exports = { createBattle, getAllBattles };
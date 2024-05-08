async function UpdateWinsCounter(heroId) {
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

module.exports = UpdateWinsCounter;
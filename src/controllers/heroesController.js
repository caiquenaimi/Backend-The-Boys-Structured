const pool = require("../config/dbConfig");

async function getAllheroes(req, res) {
  try {
    const result = await pool.query(`
          SELECT *, COALESCE(winscounter, 0) AS winscounter
          FROM heroes
        `);
    res.json({
      status: "success",
      message: "Lista de herois",
      quantity: result.rowCount,
      herois: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar herois", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao buscar herois",
    });
  }
}

async function getHeroById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM heroes WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Heroi com id ${id} não encontrado`,
      });
    }
    res.json({
      status: "success",
      message: "Heroi encontrado",
      heroi: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar heroi", error);
  }
}

async function getHeroByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query(
      "SELECT * FROM heroes WHERE LOWER(name) LIKE $1",
      [`%${name.toLowerCase()}%`]
    );
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Heroi com nome ${name} não encontrado`,
      });
    }
    res.json({
      status: "success",
      message: "Heroi encontrado",
      heroi: result.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar heroi", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao buscar heroi",
    });
  }
}

async function createHero(req, res) {
  const { name, image, skill, power, level, health } = req.body;
  try {
    if (name.length < 3) {
      res.json({
        status: "error",
        message: "Nome do heroi deve ter no mínimo 3 caracteres",
      });
      return;
    }
    await pool.query(
      "INSERT INTO heroes (name,image, skill, power, level, health) VALUES ($1, $2, $3, $4, $5,$6)",
      [name, image, skill, power, level, health]
    );
    res.json({
      status: "success",
      message: "Heroi criado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar heroi", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao criar heroi",
    });
  }
}

async function updateHero(req, res) {
  try {
    const { name, image, skill, power, level, health } = req.body;
    const { id } = req.params;
    if (name.length < 3) {
      res.json({
        status: "error",
        message: "Nome do heroi deve ter no mínimo 3 caracteres",
      });
      return;
    }
    await pool.query(
        "UPDATE heroes SET name = $1, image = $2, skill = $3, power = $4, level = $5, health = $6 WHERE id = $7",
      [name, image, skill, power, level, health, id]
    );
    res.json({
      status: "success",
      message: "Heroi atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar heroi", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao atualizar heroi",
    });
  }
}

async function deleteHero(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM heroes WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.json({
        status: "error",
        message: `Heroi com id ${id} não encontrado`,
      });
    }
    res.json({
      status: "success",
      message: "Heroi deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar heroi", error);
    res.status(500).send({
      status: "error",
      message: "Erro ao deletar heroi",
    });
  }
}

module.exports = {
  getAllheroes,
  getHeroById,
  getHeroByName,
  createHero,
  updateHero,
  deleteHero,
};

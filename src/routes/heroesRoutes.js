const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroesController');

router.get('/heroes', heroesController.getAllHeroes);
router.get('/heroes/:id', heroesController.getHeroById);
router.get('/heroes/name/:name', heroesController.getHeroByName);
router.post('/heroes', heroesController.createHero);
router.put('/heroes/:id', heroesController.updateHero);
router.delete('/heroes/:id', heroesController.deleteHero);

module.exports = router;
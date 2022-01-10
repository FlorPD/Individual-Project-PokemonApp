const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const {
    showAllPokemons,
    showPokemonsById,
    showPokemonType,
    postPokemon,
  } = require("../Controller/Controller.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", showAllPokemons);
router.get("/pokemons/:id", showPokemonsById);
router.get("/types", showPokemonType);
router.post("/pokemons", postPokemon)

module.exports = router;

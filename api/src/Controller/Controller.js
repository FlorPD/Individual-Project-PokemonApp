const axios = require("axios").default;
const { Pokemon, Types } = require("../db");

const getApiInfo = async () => {
  
    const apiUrl1 = await axios.get("https://pokeapi.co/api/v2/pokemon"); // primeros 20 Pokemones
    const apiUrl2 = await axios.get(apiUrl1.data.next); // del 20-40 P
    const apiResults = apiUrl1.data.results.concat(apiUrl2.data.results); 
  
    try {
      const subConsult = apiResults.map((e) => axios.get(e.url));
      let resultSubConsult = Promise.all(subConsult) //axios.all
        .then((e) => {
          let resPokemon = e.map((e) => e.data);
          let pokemons = [];
          resPokemon.map((e) => {
            pokemons.push({
              id: e.id,
              name: e.name,
              hp: e.stats[0].base_stat,
              attack: e.stats[1].base_stat,
              defense: e.stats[2].base_stat,
              speed: e.stats[5].base_stat,
              height: e.height,
              weight: e.weight,
              sprite: e.sprites.other.home.front_default,
              types: e.types.map((element) => {
                return element.type.name.toUpperCase() + " ";
              }),
            });
          });
          return pokemons;
        });
      return resultSubConsult;
    } catch (e) {
      console.log(e);
    }
  };
  
  const getDBInfo = async () => {
    return await Pokemon.findAll({
      include: {
        model: Types,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };
  
  const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const DBInfo = await getDBInfo();
  
    return apiInfo.concat(DBInfo);
  };
  
  async function showAllPokemons(req, res) {
    const name = req.query.name;                    // pokemons/?name=pikachu
    const info = await getAllPokemons();
    try {
      if (name) {
        let pokemonName = info.filter(
          (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
        );
        if (pokemonName.length > 0){
          res.status(200).send(pokemonName);
        }else{
          res.status(400).json({ message: `${name} not found. Enter a valid name` })
        }
      } else{
        res.status(200).json(info);
      } 
    }catch (e) {
      console.log(e);
    }
  }
  
  async function showPokemonsById(req, res) {
    const id = req.params.id.trim();   // quita el espacio 
    const info = await getAllPokemons();
    try {
      if (id) {
        let pokemonId = info.filter((p) => p.id.toString() == id.toString());
        if (pokemonId.length > 0) res.status(200).json(pokemonId);
        else res.status(400).json({ message: "No pokemons with that ID." });
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  async function showPokemonType(req, res) {
    const info = await axios.get("https://pokeapi.co/api/v2/type");
    const types = info.data.results;

    const pokemonsTypes = types.map((e) => e.name);
    pokemonsTypes.forEach((element) => {
      if (element) {
        Types.findOrCreate({                   // GUARDO TODOS LOS TYPES EN MI BASE DE DATOS
         
          where: { name: element },
        });
      }
    });
    const pokemons = await Types.findAll(); 
    res.status(200).json(pokemons);
  }
  
  async function postPokemon(req, res) {
    let { id, name, hp, attack, defense, speed, height, weight, sprite, types } = req.body;
  
    try {
      const newPokemon = await Pokemon.create({
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        sprite, 
      });
  
      let typeDB = await Types.findAll({
        where: { name: types },
      });
      newPokemon.addTypes(typeDB);
      res.send("Pokemon created");
    } catch (e) {
      console.log(e);
    }
  }
  
  module.exports = {
    showAllPokemons,
    showPokemonsById,
    showPokemonType,
    postPokemon,
  };
  
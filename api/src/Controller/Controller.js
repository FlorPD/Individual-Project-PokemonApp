const axios = require("axios").default;
const { Pokemon, Types } = require("../db");

async function getApiInfo() {

    try {
      const apiUrl1 = await axios.get("https://pokeapi.co/api/v2/pokemon"); // primeros 20 Pokemones
      const apiUrl2 = await axios.get(apiUrl1.data.next);                   // del 20-40 P
      const apiResults = apiUrl1.data.results.concat(apiUrl2.data.results); 

      const subConsult = apiResults.map((e) => axios.get(e.url));
      let resultSubConsult = await Promise.all(subConsult) 
      let pokemons = resultSubConsult.map((e) => {
            return{
              id: e.data.id,
              name: e.data.name,
              hp: e.data.stats[0].base_stat,
              attack: e.data.stats[1].base_stat,
              defense: e.data.stats[2].base_stat,
              speed: e.data.stats[5].base_stat,
              height: e.data.height,
              weight: e.data.weight,
              sprite: e.data.sprites.other.home.front_default,
              types: e.data.types.map((element) => {
                return element.type.name.toUpperCase() + " ";
              }),
            }
         });
          return pokemons;
    }catch(e) {
      console.log(e);
    }
  };
  async function getDBInfo() {
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
  
  async function getAllPokemons(){
    try{
    const apiInfo = await getApiInfo();
    const DBInfo = await getDBInfo();

    return apiInfo.concat(DBInfo);

    }catch(e){
      console.log(e)
    }
    
  };
  
  async function showAllPokemons(req, res) {
    const name = req.query.name;
    const info = await getAllPokemons();
    try {
      if (name) {
        let pokemonName = info.filter((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
        );
        if (pokemonName.length > 0){
          res.status(200).json(pokemonName);
        }else{
          // res.status(200).json(pokemonName=[])
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
    const id = req.params.id;   
    const info = await getAllPokemons();

    try {
      if (id) {
        let pokemonId = info.filter((p) => p.id.toString() === id.toString());        
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
        Types.findOrCreate({
          where: { name: element },
        });
      }
    });
    const pokemons = await Types.findAll();
    if(pokemons.length > 0){
      res.status(200).json(pokemons);
    }else{
      res.status(400).send("No types avaliable")
    } 
  }
  
  async function postPokemon(req, res) {
    let { id, name, hp, attack, defense, speed, height, weight, sprite, types } = req.body;
  
    try {
      if(!name || !types.length){
        res.status(404).send("Name and type are required to create pokemon")
      }else{
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
    }
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
  
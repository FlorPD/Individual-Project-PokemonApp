import axios from "axios";

export function getAllPokemons() {
  return async function (dispatch) {
    try{
      var json = await axios.get("http://localhost:3001/pokemons", {});
      return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
    }catch(e){
      console.log(e)
      alert("Something went wrong, please try again")
    }
    
  };
}
export function getPokemonType() {
  return async function (dispatch) {
    try{
        var json = await axios.get("http://localhost:3001/types", {});
        return dispatch({
        type: "GET_POKEMONS_TYPE",
        payload: json.data,
      });
    }catch(e){
      console.log(e)
    }
    
  };
}

export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function clearDetailsState() {
  return {
    type: "CLEAR_DETAILS_STATE"
  };
}

export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: json.data, // lo que devuelve la ruta una vez que le asigno un name
      });
    } catch (e) {
      // console.log(e)
      if (e.response) {
        alert(e.response.data.message);
      }
    }
  };
}
export function postPokemon(payload) {
  // payload es la data que viene en el form
  return async function (dispatch) {
    try {
      const newPokemon = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return dispatch({
        type: "POST_POKEMON",
        payload: newPokemon
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterByType(payload) {
  // payload es el type seleccionado
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED_POKEMONS",
    payload,
  };
}
export function orderByName(payload) {
  // el payload que me puede llegar es A-Z O Z-A
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

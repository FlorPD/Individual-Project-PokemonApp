import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl = "https://pokemon-appp.herokuapp.com"

// const baseUrl = "http://localhost:3001"

export function getAllPokemons() {
  return async function (dispatch) {
    dispatch({
      type: "LOADING",
    });
    try{
      var json = await axios.get(`${baseUrl}/pokemons`, {});
      return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
    }catch(e){
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Something went wrong, please try again"
        }) 
    }
    
  };
}
export function getPokemonType() {
  return async function (dispatch) {
    try{
        var json = await axios.get(`${baseUrl}/types`, {});
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
    dispatch({
      type: "LOADING",
    });
    try {
      let json = await axios.get(`${baseUrl}/pokemons/${id}`);
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong, please try again"
      }) 
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
      let json = await axios.get(`${baseUrl}/pokemons?name=${name}`);
      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: json.data,
      });
    } catch (e) {
      if (e.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message,
        })
      }
    }
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const newPokemon = await axios.post(`${baseUrl}/pokemons`,
        payload
      );
      return dispatch({
        type: "POST_POKEMON",
        payload: newPokemon,
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong, please try again"
      }) 
    }
  };
}

export function filterByType(payload) {
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

const initialState = {
  pokemons: [],
  allPokemons: [],
  detail: [],
  types: [],
  loading: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loading: false
      };
    case "GET_POKEMONS_TYPE":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_POKEMON_DETAIL":
      return {
        ...state,
        detail: action.payload,
        loading: false
      };
      case "CLEAR_DETAILS_STATE":
        return{
          ...state,
          detail: []
        }
    case "GET_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
      
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const dbFilterTypes = allPokemons.filter((el) => el.createdInDB && el.types.some((t) => t.name === action.payload)
      );
      const apiFilterTypes = allPokemons.filter((el) => !el.createdInDB && el.types.some((t) => t === action.payload.toUpperCase() + " ")
      );

      const allFilterTypes = dbFilterTypes.concat(apiFilterTypes);

      const typeFiltered = action.payload === "All" ? allPokemons : allFilterTypes;
      // console.log(allFilterTypes)

      return {
        ...state,
        pokemons: typeFiltered,
      };

    case "FILTER_CREATED_POKEMONS":
      const created = state.allPokemons.filter((el) => el.createdInDB)
      const fromApi = state.allPokemons.filter((el) => !el.createdInDB)
      // console.log(created)
      return{
        ...state,
        pokemons: action.payload === "all"? state.allPokemons : action.payload === "api"? fromApi : created
      }
  
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "A-Z"? [...state.pokemons].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
               : [...state.pokemons].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr
      };
    case "ORDER_BY_ATTACK":
      let sortedArray =
        action.payload === "weakest" ?
             [...state.pokemons].sort(function (a, b) {
              if (a.attack > b.attack) return 1; 
              if (a.attack < b.attack) return -1;
              return 0;
            })
           : [...state.pokemons].sort(function (a, b) {
              if (a.attack > b.attack) return -1;
              if (a.attack < b.attack) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArray
      };

    default:
      return { ...state };
  }
}

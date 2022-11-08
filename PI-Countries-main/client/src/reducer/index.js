import { GET_COUNTRIES, FILTER_BY_CONTINENT, ORDER_BY, SEARCH_COUNTRY, GET_ACTIVITIES, POST_ACTIVITY, FILTER_BY_ACTIVITY, VACIAR_DETAIL, COUNTRY_DETAIL } from "../actions";
const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail:[]
}

function rootReducer (state=initialState, action) {
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.sort((a,b)=> a.name>b.name?1:-1),
                allCountries: action.payload.sort((a,b)=> a.name>b.name?1:-1)
            }
        case GET_ACTIVITIES:
            const activities = [];
            for (let i = 0; i < action.payload.length; i++) {
                if (!activities.some(a=>a.name===action.payload[i].name)) activities.push(action.payload[i]);
            }
            return {
                ...state,
                activities: activities.sort((a,b)=> a.name>b.name?1:-1),
                }
        case ORDER_BY:
            const allCountries = state.allCountries;
            const orderBy = () => {
                if(action.payload === "PMm") return allCountries.sort((a,b) => a.population>b.population?-1:1);
                if(action.payload === "PmM") return allCountries.sort((a,b) => a.population>b.population?1:-1);
                if(action.payload === "ZA") return allCountries.sort((a,b)=> a.name>b.name?-1:1);
            }      
            return {
                ...state,
                countries: orderBy()
            }
        case FILTER_BY_CONTINENT:
            const allCountries2 = state.allCountries;
            const continentFilter = action.payload === "all"? allCountries2: allCountries2.filter( a => a.continent === action.payload)
            return {
                ...state,
                countries: continentFilter
            }
        case FILTER_BY_ACTIVITY:
            const allCountries3 = state.allCountries.filter( a => a.activities.some( b => b.name === action.payload))
            return {
                ...state,
                countries: allCountries3
            }
        case SEARCH_COUNTRY:
            const allCountries4 = state.allCountries;
            return {
                ...state,
                countries: allCountries4.filter( a => a.population >= action.payload)
            }
        case COUNTRY_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case VACIAR_DETAIL:
            return {
                ...state,
                detail:[]
            }
        case POST_ACTIVITY:
            return {
                ...state,
            }
        default:
            return state;
        
    }
}

export default rootReducer;
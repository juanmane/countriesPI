import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const COUNTRY_DETAIL = "COUNTRY_DETAIL";
export const VACIAR_DETAIL = "VACIAR_DETAIL";
export const POST_ACTIVITY = "POST_ACTIVITY";

export function getCountries() {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function getActivities() {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
}

export function orderBy(payload) {
    return {
        type: ORDER_BY,     
        payload  
    }
}

export function filterByContinent(payload) {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByActivity(payload) {
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function searchCountry(name) {
    return {
        type: SEARCH_COUNTRY,
        payload: name 
    }
    // return async function (dispatch) {
    //     try {
    //         let json = await axios.get(`http://localhost:3001/countries?name=${name}`);
    //         return dispatch({
    //             type: SEARCH_COUNTRY,
    //             payload: json.data
    //         })
    //     } catch (error) {
    //         alert("No se encontró el país");
    //     }
    // }
}

export function countryDetail(name) {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: COUNTRY_DETAIL,
                payload: json.data
            })
    }
}

export function vaciarDetail() {
    return {
        type: VACIAR_DETAIL,
    }
}

export function postActivity(payload) {
    return async function(dispatch) {
        try {
            let json = await axios.post("http://localhost:3001/activities", payload);
            alert("Se creo la actividad")
            return json;    
        } catch (error) {
            alert("Error en el servidor: no se pudo crear la actividad")
        }
    }
}
import React from "react";
import { countryDetail, vaciarDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Detail.css";
import { Link } from "react-router-dom";

function separarEnMiles(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}

export default function Detail(props) {
    const dispatch = useDispatch();
    const country = useSelector(state => state.detail);
    useEffect(() => {
        dispatch(countryDetail(props.match.params.name));
    },[props.match.params.name, dispatch]);

    return (
        <div className="detail">
            {country.length?
            <div>
                <h1>{country[0].id}</h1>
                <img src={country[0].flag} alt="flag not found" />
                <h2>{country[0].name}</h2>
                <h3>Continente: {country[0].continent}</h3>
                <h3>Capital: {country[0].capital}</h3>
                <h4>Subregión: {country[0].subregion}</h4>
                <h4>Area: {separarEnMiles(country[0].area)} km²</h4>
                <h4>Población: {separarEnMiles(country[0].population)}</h4>
                {country[0].activities.length?
                <ul className="actividades">
                <h4>Actividades: {country[0].activities.sort((a,b) => a.difficulty>b.difficulty?-1:1).map( a => (
                    <li>{a.name} ({`dificultad: ${a.difficulty}, duración: ${a.duration}hs, temporada: ${a.season}`})</li>
                    ))}</h4></ul>: <h4>Sin actividades aún</h4>                
                }
            </div> : <p>No se encontró el país</p>
            }
            <Link to="/activity"><button>Crear actividad!</button></Link>
            <Link to="/home" onClick={() => dispatch(vaciarDetail())}><button>Volver</button></Link>
        </div>
    )

        
}
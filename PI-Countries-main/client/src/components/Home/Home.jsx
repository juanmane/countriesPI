import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCountries, filterByContinent, orderBy, getActivities, filterByActivity } from "../../actions";
import Country from "../Country/Country";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import { Link } from "react-router-dom";

function separarEnMiles(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}


export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries);
    const allActivities = useSelector(state => state.activities)
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch]);
 
    const [render, setRender] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    //const [countriesPerPage, setCountriesPerPage] = useState(9);
    const countriesPerPage = 10;
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = pageNum => {
        setCurrentPage(pageNum);
        //if(!currentPage !== 1) setCountriesPerPage(10);
        //if(currentPage === 1) setCountriesPerPage(9);
    }

    function handleFilterCont(e) {
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }
    function handleFilterActi(e) {
        if(e.target.value === "--") dispatch(getCountries());
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    }

    function handleOrderBy(e) {
        e.preventDefault();
        if (e.target.value === "AZ") dispatch(getCountries());
        else dispatch(orderBy(e.target.value));
        setCurrentPage(1);
        setRender(`Ordenado de forma: ${e.target.value}`);
        console.log(render);
    }

    return(
        <div className="home">
            <div className="inputs">
            <div> 
               <SearchBar/>
            </div>
            <div>
            <label>Ordenar por: </label>
            <select name="orden" onChange={e => handleOrderBy(e)}>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
                <option value="PMm">Población (mayor a menor)</option>
                <option value="PmM">Población (menor a mayor)</option>
            </select>
            </div>
            <div>
            <label>Filtrar: </label>
            <select name="continente" onChange={e => handleFilterCont(e)}>
                <option value="all">Continente</option>
                <option value="Africa">Africa</option>
                <option value="North America">America del Norte</option>
                <option value="South America">America del Sur</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceanía</option>
            </select>
            <select name="actividad" onChange={e => handleFilterActi(e)}>
                <option value="--">Actividad turística</option>
                {allActivities.map( a => (
                    <option value={a.name}>{a.name}</option>
                    ))}
            </select>
            </div>
            <div>
                <Link to="/activity">
                    <button>Crea una actividad turística!</button>
                </Link> 
            </div>
            </div>
            <div>
            <Paginado 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            />
            </div>
            <div className="countries">
                {currentCountries?.map( p =>
                    <Country
                    key = {p.id}
                    flag = {p.flag}
                    name = {p.name}
                    continent = {p.continent}
                    population = {separarEnMiles(p.population)+" habitantes"}
                    />
                    )}
            </div>
            <button onClick={() => dispatch(getCountries())}>Ver todos</button>
        </div>
    )
}
//{allCountries[0].name==="China"||allCountries[0].name==="Heard Island and McDonald Islands" || allCountries[0].name ==="Bouvet Island"?`${separarEnMiles(p.population)} habitantes`:undefined}
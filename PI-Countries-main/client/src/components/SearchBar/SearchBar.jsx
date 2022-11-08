import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [pais, setPais] = useState("");


    function handleInput(e) {
        e.preventDefault();
        setPais(e.target.value)
    }
    function handleSubmit(e)  {
        e.preventDefault();
        dispatch(searchCountry(pais)); 
        setPais("");
    }

    return (
        <div>
            <input type="text" placeholder="Buscar país..." value={pais} onChange={e => handleInput(e)}/>
            <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
}
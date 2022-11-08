import React from "react";
import "./Paginado.css";

export default function  Paginado ({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = [];

    for (let i = 0; i <Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers?.map( n =>
                    <li className="number" key={n} onClick={() => paginado(n)}>
                        {n}
                    </li> 
                )}
            </ul>
        </nav>
    )
}
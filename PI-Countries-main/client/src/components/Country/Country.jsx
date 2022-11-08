import React from "react";
import "./Country.css";
import { Link } from "react-router-dom";


export default function Country({flag, name, continent,population}) {
    return [
        <div className="Country">
            
            <img src={flag} alt="img not found"/>
            <div>
            <Link to={`/country/${name}`}>
            <span className="name">{name}</span>
            </Link>
            </div>
            <div>
            <span className="continent">{continent}</span>
            </div>
            <div>
            <span>{population}</span>
            </div>
        </div>
    ]
}
import React from "react";
import {Link} from "react-router-dom";
import "./Landing.css"

export default function Landing() {
    return(
        <div className="landing">
            <h1>Guía completa de países</h1>
            <Link to ="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
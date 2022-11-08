import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../actions";
import "./ActivityCreate.css";

function validate(input) {
    let errors = {};
    if(input.difficulty > 5 || input.difficulty<1) errors.difficulty="Solo ingresar valores enteros entre 1 y 5";
    if(input.duration > 72 || input.duration < 0) errors.duration="La duración no puede ser mayor a 72 horas";
    return errors;
}

export default function ActivityCreate() {
    const dispatch = useDispatch();
    const history = useHistory()
    const countries = useSelector(state => state.countries);
    
    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration: "",
        season:"",
        country:[]
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCountries());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    function handleChange2(e) {
        setInput({
            ...input,
            [e.target.name]: parseInt(e.target.value)
        })
        setErrors(validate({
            input,
            [e.target.name]: parseInt(e.target.value)
        }))
    }

    function handleSelect(e) {
        if (e.target.value !== "--") {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleSelect2(e) {
        if(!input.country.includes(e.target.value) && e.target.value!== "--"){
            setInput({
                ...input, 
                country:[...input.country,e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]: e.target.value
        // }));
        if(!input.name || errors.name || errors.difficulty || errors.duration || !input.season || !input.country.length) {
            alert("Quedan campos por completar")
        } else {
            dispatch(postActivity(input));
            // alert("Actividad creada con éxito!");
            setInput({
                name:"",
                difficulty:"",
                duration: "",
                season:"",
                country:[]
            })
            history.push("/home")
        }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            country: input.country.filter(i => i!== e)
        })
    }

    return(
        <div className="activity">
            <Link to="/home"><button>Volver</button></Link>
            <h1>Creá una actividad turística!</h1>
            <form onSubmit={e=> handleSubmit(e)}>
                <div>
                    <label>Nombre de la actividad: </label>
                    <input type="text" value={input.name} name="name" onChange={e=> handleChange(e)}/>
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Dificultad (1 a 5): </label>
                    <input type="number" value={input.difficulty} name="difficulty" onChange={e=> handleChange2(e)}/>
                    {errors.difficulty && (<p className="error">{errors.difficulty}</p>)}
                </div>
                <div>
                    <label>Duracion (en horas): </label>
                    <input type="number" value={input.duration} name="duration" onChange={e=>handleChange2(e)}/>
                    {errors.duration && (<p className="error">{errors.duration}</p>)}
                </div>
                <div>
                    <label>Estación: </label>
                    <select onChange={handleSelect}>
                    <option value="--">--</option>
                    <option value="Summer">Verano</option>
                    <option value="Autumn">Otoño</option>
                    <option value="Winter">Invierno</option>
                    <option value="Spring">Primavera</option>
                    </select>
                </div>
                <div>
                <label>Pais: </label>
                <select onChange={e => handleSelect2(e)}>
                    <option value="--">--</option>
                    {countries.map( c => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                </select>
                </div>
                {input.country.map(i => (
                    <div>
                        <span>{i} </span>
                        <button onClick={() => handleDelete(i)}>X</button>
                    </div>
                ))}
                <button type="submit" >Crear actividad</button>
            </form>
        </div>
    )
}
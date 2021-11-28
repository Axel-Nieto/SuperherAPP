import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {superurl} from '../services/superheroapi';
import notfound from '../img/not-found.png';

function ResultCard({name,id,biography,url,image}){
    const alineamiento = biography.alignment === 'good'? 'hero' : 'villain';
    const [personajeActual,setPersonajeActual] = useState('');
    const [agregado,setAgregado] = useState(false);

    async function getPersonaje(identificador){
        const personaje = await axios.get(`${superurl}${identificador}`).catch(err=>err);
        if(personaje.data.response==='success'){
            return personaje.data;
        }
    }

    function confirmarPersonaje(equipo){
        let heroe = 0;
        let villano = 0;
        let existe = false;
        if(equipo.length < 6){
            equipo.forEach((o)=>{
                o.biography.alignment==='good'? heroe++ : villano++;
                if (o.id ===String(personajeActual.id)){
                    existe = true;
                }
            });
                if(!existe){
                    if(personajeActual.biography.alignment==='good' && heroe > 2){
                        alert("Max: three heroes per team");
                        return false;
                    }else if(personajeActual.biography.alignment==='bad' && villano > 2){
                        alert("Max: three villains per team");
                        return false;
                    }
                    return true;
                }else{
                    alert("You have this character on your team");
                }
        }else{
            alert("You can only have 6 characters per team");
            return false;
        }
    }

    function agregarPersonaje(){
        const equipo = localStorage.getItem('team')?
            JSON.parse(localStorage.getItem('team')) : [];
        if(confirmarPersonaje(equipo)){
            equipo.push(personajeActual);
            localStorage.setItem('team',JSON.stringify(equipo));
            setAgregado(true);
        }
    }

    useEffect(()=>{
        async function obtenerDatos(){
            const personaje = await getPersonaje(id);
            setPersonajeActual(personaje);
            const equipo = localStorage.getItem('team')? 
                JSON.parse(localStorage.getItem('team')): [];
            equipo.forEach(o =>{
                if(o.id === personaje.id){
                    setAgregado(true);
                }
            });
        }

        obtenerDatos();
    },[agregado])

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title fw-bold">{name}&nbsp;
                    
                </h4>
                <p className={`${alineamiento==='hero'? 'text-success':'text-danger'}`}>
                    <span className='text-uppercase fw-bold'>
                        {alineamiento}
                    </span>
                </p>
                <img src={image} alt="img-personaje" onError={(e)=>(e.target.src=notfound)}/>               
                <div className ="card-footer">
                    <button 
                        onClick={agregarPersonaje}
                        className = {
                            !agregado?
                                'btn btn-dark text-uppercase':
                                'btn btn-dark text-uppercase text-success'
                        } 
                    >
                        {!agregado? 'ADD':'ADDED'}
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ResultCard;
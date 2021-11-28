import React,{useEffect, useState} from "react";
import Card from './Card';
import {superurl} from '../services/superheroapi';
import TeamStats from "./TeamStats";


function Home(superurl){
    const [equipo,setEquipo] = useState([]);
    const [mostrarEquipo,setMostrarEquipo] = useState(false);

    useEffect(()=>{
        function obtenerEquipo(){
            const equipo = JSON.parse(localStorage.getItem('team')) || [];
            setEquipo(equipo);
            if(equipo.length>0){
                setMostrarEquipo(true);
            }else setMostrarEquipo(false);
        }
        obtenerEquipo();
    },[mostrarEquipo])

    return(
        <>
            <div className="screen-container">
                <small className="title text-white mt-0">
                    YOUR TEAM
                </small>
                <div className="stats">
                    <TeamStats equipo={equipo}/>
                </div>       
                        {mostrarEquipo? 
                            (
                                <div className="cards">
                                    {equipo.map((personaje,i) => {
                                        return(
                                            <div key={i}>
                                                <Card personaje={personaje} setMostrarEquipo={setMostrarEquipo}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            ):
                            <h3 className="text-white">
                                You don't have a team yet
                            </h3>
                        }
            </div>
        </>
    )
}

export default Home;
import React,{useState} from "react";
import notfound from "../img/not-found.png";

function Card({personaje,setMostrarEquipo}){

    const [mostrar,setMostrar] = useState(true);
    const bases = personaje.work.base.split(', ');
    const alineamiento = personaje.biography.alignment === 'good'? 'hero' : 'villain';
    const stats = personaje.powerstats

    function eliminarPersonaje(){
        const equipo = JSON.parse(localStorage.getItem('team'));
        const auxEquipo = equipo.filter((e) => e.id !== personaje.id);
        setMostrarEquipo(auxEquipo);
        localStorage.setItem('team',JSON.stringify(auxEquipo));
    }

    function ocultar(){
        setMostrar(!mostrar);
    }

    return(
        <div> 
            {
                mostrar ?
                    (<div className="home-card">
                        <div className="card-body">
                                <h4 className="card-title fw-bold">{personaje.name}&nbsp;</h4>
                                <p className={`${alineamiento==='hero'? 'text-success':'text-danger'}`}>
                                    <span className='text-uppercase fw-bold'>
                                        {alineamiento}
                                    </span>
                                </p>
                                <img src={personaje.image.url} alt="img-personaje" onError={(e)=>(e.target.src=notfound)}/>
                                <div className="card-stats text-uppercase my-3">
                                    <div className="card-stat">
                                        <small>Inteligence</small>
                                        <small>{personaje.powerstats.intelligence}</small>                   
                                    </div>
                                    <div className="card-stat">
                                        <small>Power</small>
                                        <small>{personaje.powerstats.power}</small>                   
                                    </div>
                                    <div className="card-stat">
                                        <small>Combat</small>
                                        <small>{personaje.powerstats.combat}</small>                   
                                    </div>
                                    <div className="card-stat">
                                        <small>Speed</small>
                                        <small>{personaje.powerstats.speed}</small>                   
                                    </div> 
                                    <div className="card-stat">
                                        <small>Strength</small>
                                        <small>{personaje.powerstats.strength}</small>                   
                                    </div> 
                                    <div className="card-stat">
                                        <small>Durability</small> 
                                        <small>{personaje.powerstats.durability}</small>                  
                                    </div>                            
                                </div>
                                <div className="botones">
                                    <button className="btn btn-dark" onClick={ocultar}>
                                        INFO
                                    </button>
                                    <button className="btn btn-dark" onClick={eliminarPersonaje}>
                                        DELETE
                                    </button>
                                </div>
                        </div>
                    </div>)
                    : (<div className="card search-card">
                        <div className="card-body">
                                <h4 className="card-title">{personaje.name}&nbsp;</h4>
                                <p className={`${alineamiento==='hero'? 'text-success':'text-danger'}`}>
                                    <span className='text-uppercase fw-bold'>
                                        {alineamiento}
                                    </span>
                                </p>
                                <div className="card-stats text-uppercase my-3">
                                    <div className="card-stat">
                                        <small>Full Name</small>   
                                        <small>{personaje.biography['full-name']}</small>                
                                    </div>
                                    <div className="card-stat">
                                        <small>Alias</small>
                                        <small>{personaje.biography.aliases[0]}</small>                   
                                    </div>
                                    <div className="card-stat">
                                        <small>Base</small>
                                        <small>{bases[0]}</small>                   
                                    </div>
                                    <div className="card-stat">
                                        <small>Height</small>
                                        <small>{personaje.appearance.height[1]}</small>                   
                                    </div> 
                                    <div className="card-stat">
                                        <small>Weight</small>
                                        <small>{personaje.appearance.weight[1]}</small>                   
                                    </div> 
                                    <div className="card-stat">
                                        <small>Eyes</small> 
                                        <small>{personaje.appearance['eye-color']}</small>                  
                                    </div>  
                                    <div className="card-stat">
                                        <small>Hair</small> 
                                        <small>{personaje.appearance['hair-color']}</small>                  
                                    </div>                            
                                </div>
                                <div className="botones">
                                    <button className="btn btn-dark" onClick={ocultar}>
                                        INFO
                                    </button>
                                    <button className="btn btn-dark" onClick={eliminarPersonaje}>
                                        DELETE
                                    </button>
                                </div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Card;
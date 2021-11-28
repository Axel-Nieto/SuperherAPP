import React, {useEffect,useState} from "react";

function TeamStats({equipo}){
    const [promedios,setPromedios] = useState({});
    const [stats,setStats] = useState({});
    const [categoria,setCategoria] = useState('');


    function definirCategoria(){
        let mayor=0;
        let mayorCat='';

        for(const [key,value] of Object.entries(stats)){
            if(stats[key]>mayor){
                mayorCat = key;
                mayor = value;
            }
        };

        setCategoria(mayorCat);
    }

    function calcularPromedios(){
        const sums = equipo.reduce((acumulador,personaje) => {
            for(const key in personaje.appearance){
                if(key==='weight' || key==='height'){

                    acumulador[key] = (acumulador[key] || 0) + ((Number.parseInt(personaje.appearance[key][1].split(' ',1))) || 0);
                }
            }
            return acumulador;
        },{});

        setPromedios(sums);
    }

    function sumatoriasStats(){
    
        const sumStats = equipo.reduce((acumulador,personaje) =>{
            for(const key in personaje.powerstats){
                acumulador[key] = (acumulador[key] || 0) + ((Number.parseInt(personaje.powerstats[key])) || 0);
            }
            return acumulador;
        },{})

        setStats(sumStats);
    }

    useEffect(()=>{
        sumatoriasStats();
        definirCategoria();
        calcularPromedios();
    },[equipo]);


    return(
        <>
            {(equipo.length)>0?(
                <div className='summary-container'>
                    <div className="summary-stats mb-2">
                        <small>Best Stat: <span className="text-uppercase fw-bold">{categoria}</span></small>
                        <small className="text-uppercase">
                            weight(avg) <span className="fw-bold">{(promedios['weight'] / equipo.length).toFixed()}</span>
                        </small>
                        <small className="text-uppercase">
                            height(avg) <span className="fw-bold">{(promedios['height'] / equipo.length).toFixed()}</span>
                        </small>
                    </div>
                    <div className='summary-stats'>
                        {stats !=={}?
                            Object.keys(stats).map((key,i)=>{
                                return(
                                    <div className="summary-stat" key={i}>
                                        <small className="text-uppercase">          
                                            {`${key} `}
                                        </small>
                                        <small className="fw-bold">{stats[key]}</small>
                                    </div>
                                )
                            }
                            )
                            :null
                        }
                    </div>
                </div>
            )
            :(null)}
        </>
    )
}

export default TeamStats;
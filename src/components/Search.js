import React,{useState} from "react";
import {Formik} from 'formik';
import {superurl} from '../services/superheroapi';
import { Col, Row } from "react-bootstrap";
import axios from 'axios';
import ResultCard from "./ResultCard";

function Search(){

    const [mostrar,setMostrar] = useState(null);
    const [resultados,setResultados] = useState([]);

    async function buscarPersonaje(nombre){
        const resp = await axios.get(`${superurl}search/${nombre}`).catch(error=>error);
        if(resp.data.response==='success'){
            return resp;
        }else setResultados([]);
    }

    async function buscar(nombre) {
        setMostrar(false);
        const res = await buscarPersonaje(nombre);
        if (typeof res.data !== 'undefined'){
            setResultados(res);
            setMostrar(true);
        }
      }

    return(
        <div className="screen-container">
            <Formik
                initialValues={{
                    name:''
                }}

                validate = {(fields) => {
                    let errores = {}

                    if(!fields.name){
                        errores.name="Please enter a name";
                    }
                }}

                onSubmit = {(fields)=>{
                    let nombre = fields.name;
                    buscar(nombre);
                }}
            >
                {({values,errors,handleSubmit,handleBlur,handleChange,touched,fields})=>(
                    <form className="searchform my-3" onSubmit={handleSubmit}>
                        <Row className="d-flex flex-column flex-sm-row align-items-center gx-0 gy-3 w-100">
                            <Col className="col-9 col-sm-9">
                                <div id="chartext" className="form-group">
                                    <input
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder='Find a character'
                                        className="form-control"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name && <div className="error">{errors.name}</div>}
                                </div>
                            </Col>
                            <Col className="col-4 col-sm-3">
                                <button type="submit" className="btn btn-dark">
                                    Search
                                </button>
                                {touched.name && errors.name && <div className="error">{errors.name}</div>}
                            </Col>

                        </Row>
                    </form>
                )}
            </Formik>
            {mostrar? (
              resultados.data.response ==='success'? 
                (<div className="cards">
                    {
                        resultados.data.results.map((personaje,i)=>{
                            return(
                                <div key={i}>
                                    <ResultCard
                                        name={personaje.name}
                                        image={personaje.image.url}
                                        id={personaje.id}
                                        biography={personaje.biography}
                                        url={superurl}
                                    />
                                </div>
                            );
                        })
                    }
                </div>)
                :(null)  
            )
            :null
            }
        </div>
    )
}

export default Search;
import React from 'react';
import '../css/Login.css';
import {apiurl} from '../services/apirest';
import axios from 'axios';
import {Formik} from 'formik';

function Login({setAut}) {

    async function manejadorBoton(url,form){
 
        const resp = await axios.post(url,form).catch((e)=>e);
        if(typeof resp.data !== 'undefined'){
            localStorage.setItem('token',resp.data.token);
            setAut(true);
        }else{
            alert("Error: incorrect email/password");
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    email:'',
                    pass:''
                }}

                validate={(fields)=>{
                    let errores = {}

                    if(!fields.email){
                        errores.email = "Please enter your e-mail"
                    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(fields.email)){
                        errores.email = "Please enter a valid e-mail"
                    }

                    if(!fields.pass){
                        errores.pass = "Please enter your password"
                    }

                    return errores;
                }}

                onSubmit={(fields,{resetForm})=>{
                    const form = {
                        'email':fields.email,
                        'password': fields.pass
                    }

                    resetForm();
                    manejadorBoton(apiurl,form);
                }}
            >
                {({values,errors,touched,handleSubmit,handleChange,handleBlur})=>(
                    <form className='login p-5' onSubmit={handleSubmit}>

                        <h3 className='title'>SuperherAPP</h3>
        
                        <div className='form-group mb-3'>
                            <label className='form-label'></label>
                            <input 
                                id='email' 
                                name='email' 
                                type='email' 
                                className='form-control' 
                                placeholder='Enter E-mail' 
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && <div className="error">{errors.email}</div>}
                        </div>
        
                        <div className='form-group mb-3'>
                            <label className='form-label'></label>
                            <input 
                                id='pass' 
                                name='pass' 
                                type='password' 
                                className='form-control' 
                                placeholder='Enter password' 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.pass && errors.pass && <div className="error">{errors.pass}</div>}
                        </div>
        
                        <button type='submit' className='btn btn-dark mt-3'>Login</button>
    
                    </form>
                )}
            </Formik>
        </>
    )
}



export default Login;
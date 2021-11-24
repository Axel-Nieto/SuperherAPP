import React from "react";
import {Route,useLocation} from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Search from "./Search";
import Footer from "./Footer";

function Main({setAut}){
    const location = useLocation();
    return(
        <div>
            <Header setAut={setAut}/>
            <h2 className="title text-white my-5">
                {location.pathname==="/"? "TEAM":""}
            </h2>
            <Route exact path = '/search'>
                <Search/>
            </Route>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Footer/>
        </div>
    )
}

export default Main;
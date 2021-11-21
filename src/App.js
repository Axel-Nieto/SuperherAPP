import React, {useState,useEffect} from 'react';
import Login from './components/Login';
import Main from './components/Main';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


function App() {

  const [aut,setAut] = useState(false);

  useEffect(()=>{

    if(localStorage.getItem('token')){
      setAut(true);
    }else{
      setAut(false);
    }
  },[]);

  return (
    <React.Fragment>
      <div className='principal'>
        <Router>
          <Switch>
            {
              !aut ? (
                <Route path='/'>
                  <Login setAut={setAut}/>
                </Route>
              )
                : (<Main setAut={setAut}/>)
            }
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  )
}

export default App;

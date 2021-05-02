import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Consultation from "./pages/consultation"
import NotFound from "./pages/notfound"



function App() {

   //const token = localStorage.getItem('token')
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route key="dashboard" path='/dashboard' component={Dashboard}/>
          <Route key="Plasma" path='/Plasma' component={Consultation}/>
          <Route key="Oxygen" path='/Oxygen' component={Consultation}/>
          <Route key="Food" path='/Food' component={Consultation}/>
          <Route key="Medicine" path='/Medicine' component={Consultation}/>
          <Route key="CT" path='/CT' component={Consultation}/>
          <Route key="Doctor" path='/Doctor' component={Consultation}/>
          <Route key="Bed" path='/Bed' component={Consultation}/>
          <Route key="Plasma" path='*' component={NotFound}/>
        </Switch>
      </Router>
    );
}

export default App;

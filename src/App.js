import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/dashboard";


function App() {

   //const token = localStorage.getItem('token')
    return ( <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
        </Switch>
      </Router>
    </div>);
}

export default App;

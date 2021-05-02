import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./Auth";

const PrivateRoute = ({
  component: RouteComponent,
  ...rest
}) => {
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return (<Route {...rest} render={routeProps => !!currentUser
        ? (<RouteComponent {...routeProps}/>)
        : (<Redirect to={"/login"}/>)}/>);
  } else {
    return (<Redirect to={"/login"}/>)
  }
};

export default PrivateRoute

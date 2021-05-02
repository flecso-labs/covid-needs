import React, {useEffect, useState} from "react";
import Firebase from '../firebase/Firebase.js'

export const AuthContext = React.createContext();

let app = Firebase;
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      let userSessionTimeout = null;
      if (user) {
        user.getIdTokenResult(true).then(function(idTokenResult) { // <------ Check this line
//          console.log(idTokenResult); // It shows the Firebase token now
          if (idTokenResult.claims.role === 'EMPLOYER_ADMIN' || idTokenResult.claims.role === 'EMPLOYER_READ' || idTokenResult.claims.role === 'EMPLOYER_WRITE') {
            //  console.log(idTokenResult.token);
            localStorage.setItem('token', idTokenResult.token)
            setToken(idTokenResult.token);
            setCurrentUser(user);
            const authTime = idTokenResult.claims.auth_time * 1000;
            const sessionDurationInMilliseconds = 1 * 60 * 1000; // 60 min
            const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
            // userSessionTimeout = setTimeout(() => app.auth().signOut(), expirationInMilliseconds);
          } else {
            console.log("Not Allowed");
            setCurrentUser(null);
            setToken(null);
            localStorage.setItem('token', null)
          }
          return idTokenResult;
        });
      } else {
        console.log("Logout");
        setCurrentUser(null);
        setToken(null);
        localStorage.setItem('token', null)
      }
      setPending(false)
    });
  }, []);

  if (pending) {
    return <><div> < h1 style = {{
        font: '600 4.43vw Roboto',
        width: '44.52vw',
        textAlign: 'center',
        margin: '5% auto 0 auto'}} > Loading ...</h1>
</div>
</>
  }

  return (<AuthContext.Provider value={{
      currentUser
    }}>
    {children}
  </AuthContext.Provider>);
};
